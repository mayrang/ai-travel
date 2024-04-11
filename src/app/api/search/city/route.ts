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


                1. [city]: Find a city with the same name as [event] entered by the user. And translate the printout into Korean.
                2. [country]: Find the country to which [city] belongs. And translate the printout into Korean.
                3. [cities]: Please search based on [city] and recommend 3 more cities that are within 1 hour by car. And please translate the printouts into Korean.
                4. [countries]: Give [city] their corresponding countries in the same order as [city]. And translate the printout into Korean.
                5. [lats]: Give the city's mid-latitudes from Google maps for [cities].
                6. [longs]: Give the city's mid-longitude from Google maps for [cities].
                7. [lat]: Give the city's mid-latitudes from Google maps for [city].
                8. [lng]: Give the city's mid-longitude from Google maps for [city].

                    
                Make sure to translate the output into Korean and use the following JSON format:
                {
                    city:  [city],
                    country:  [country],
                    lat: [lat],
                    lng: [lng],
                    result: [
                        city:  [cities],
                        country:  [countries],
                        lat: [lats],
                        lng: [lngs]
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
    console.log(
      "data",
      data.choices[0].message.content,
      typeof data.choices[0].message.content
    );
    const parsedData = JSON.parse(data.choices[0].message.content);
    if (data.error) {
      throw new Error(data.error.message || "gpt error");
    }
    console.log("parsedData", parsedData);
    return NextResponse.json({ data: parsedData });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
