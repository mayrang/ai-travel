export default async function getFindPlace(place: string) {
  const placeRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/place/detail?query=${place}`
  );
  const result = await placeRes.json();

  return result.data;
}
