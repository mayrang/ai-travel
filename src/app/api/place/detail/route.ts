import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url, process.env.BASE_URL);
  const query = searchParams.get("query");

  try {
    console.log("api check", query);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=formatted_address%2Cplace_id%2Cphotos%2Cname%2Crating%2Cgeometry&language=kr&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      throw new Error(data.error.message || "gpt error");
    }
    return NextResponse.json({ data: data });
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
