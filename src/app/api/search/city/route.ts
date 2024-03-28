import { NextResponse } from "next/server";

/** 
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'
*/

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url, process.env.BASE_URL);
  const query = searchParams.get("query");

  try {
    console.log("api check");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
                You're a travel city recommendation. Translate the output into Korean. And proceed in the following order.

                1. [city]: Find a city with the same name as [event] entered by the user.
                2. [country]: Find the country to which [city] belongs.
                2. [city]: Please recommend 3 more cities where you can search for the same city as the one you searched and see the same kind of sightseeing that feels similar to that city. And those cities should be known to some extent.
                3. [country]: Give [city] their corresponding countries in the same order as [city].

                    
                Translate into Korean and Use the output in the following JSON format:
                {
                    city:  [city],
                    country:  [country]
                    result: [
                        city:  [city]
                        country:  [country]
                    ]
                }



                [event]:`,
          },
          {
            role: "user",
            content: `
                    """
                    ${query}
                    """
                  `,
          },
        ],
        temperature: 0.55,
        max_tokens: 1000,
      }),
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "gpt error");
    }
    return NextResponse.json({ data: data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
