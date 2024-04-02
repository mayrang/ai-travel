export type SearchCity = City & {
  result: City[];
};

export interface City {
  city: string;
  country: string;
  lat: number;
  lng: number;
}
