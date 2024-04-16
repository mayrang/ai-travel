export default async function getFindPlace(place: {
  place: string;
  time: number;
}) {
  try {
    const placeRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/place/detail?query=${place.place}`
    );
    const result = await placeRes.json();
    if (result?.data?.candidates) {
      const candidates = result.data.candidates[0];
      return { ...candidates, time: place.time };
    }
    return result.data;
  } catch (err) {
    console.log(err);
    throw new Error("fetch Failed Data!");
  }
}
