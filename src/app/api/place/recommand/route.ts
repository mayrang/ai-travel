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

export async function POST(req: Request, res: Response) {
  const { headcount, city, days, themes } = await req.json();
  try {
    console.log(
      "api check",
      `${headcount} people will travel ${city} for {days} days under the theme of ${themes}. Please recommend about 10 places that fit the above and translate the printouts into Korean.`
    );

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
               You are the one who recommends places to tour based on [event] entered by the user. And it should be a tourist destination with some recognition. If there's a tourist destination that doesn't actually exist, I'll give you a penalty point. And proceed in the following order.


                1. [place]: Please recommend 10 places to tour based on the [event] entered by the user. Those places should have results when searching on Google Maps. The result must be in the form of a word.
                2, [time]: Estimate the average time it takes to look at [place] and give it as an integer in minutes.
                    
             Must be made in strict JSON format. If you don't follow the format below, I'll give you a penalty:
                {
                    "place": [
                     place: [place],
                      time: [time],
                    ]
                   
                    
                   
                   
                }



                `,
          },
          {
            role: "user",
            content: `
                    """
                 
1. the number of people : ${headcount}
2. the number of days of travel: ${days}
3. a travel theme: ${themes}
4. city: ${city}

                    """
                  `,
          },
        ],
        temperature: 0.5,

        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    console.log("data", data.choices[0].message.content);

    if (data.error) {
      throw new Error(data.error.message || "gpt error");
    }
    const parsedData = JSON.parse(data.choices[0].message.content);
    return NextResponse.json({ data: parsedData });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
