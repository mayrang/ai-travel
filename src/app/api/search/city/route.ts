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
  const { searchParams } = new URL(req.url, "http://localhost:3000");
  const query = searchParams.get("query");

  try {
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
                You're the one who finds a city similar to the one that users search for. Proceed in the following order.

                1. [search]: Please return the [event] entered by the user.
                2. [city]: Give 5 cities with names similar to [event] in order of name relevance and similarity. However, if you judge that the similarity is too low, you only derive at least 1 result without having to print up to 5.  If there are additional cities with the same name, place them at the top.
                3. [country]: Give [city] their corresponding countries in the same order as [city].

                    
                Translate into Korean and Use the output in the following JSON format:
                {
                    search: [search],
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
    console.log("data", data.choices[0].message);
    if (data.error) {
      throw new Error(data.error.message || "gpt error");
    }
    return NextResponse.json({ data: data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
