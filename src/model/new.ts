export interface SimplePlace {
  place: string;
  time: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

interface GooglePlacePhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  witdh: number;
}

export interface DetailPlace {
  formatted_address: string;
  geometry: {
    location: LatLng;
    viewport: {
      northeast: LatLng;
      southwest: LatLng;
    };
  };
  name: string;
  photos?: GooglePlacePhoto[];
  place_id: string;
  rating: number;
  time: number;
}
