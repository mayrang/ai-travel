export type SearchCity = City & {
  result: City[];
};

interface City {
  city: string;
  country: string;
}
