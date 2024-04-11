"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styles from "./MapContainer.module.css";
import { useNewTravelStore } from "@/store/newTravel";
import { useEventStore } from "@/store/event";
import Markers from "./Markers";
// const markerOptions = {
//   // 사용자 정의 마커 이미지를 지정합니다.
//   icon: {
//     url: "https://maps.google.com/mapfiles/ms/micons/blue.png",
//     scaledSize: new window.google.maps.Size(30, 30), // 마커 크기 설정
//   },
// };

const MapContainer: React.FC = () => {
  const { currentCity } = useEventStore();
  const { isLoaded } = useJsApiLoader({
    id: "travel_map",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "",
    language: "ko",
  });
  const [lineCoordinates, setLineCoordinates] = useState<
    google.maps.LatLng[] | null
  >(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(11);
  // const [directions, setDirections] =
  //   useState<google.maps.DirectionsResult | null>(null);

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: currentCity.lat,
    lng: currentCity.lng,
  });
  console.log("currentCity", currentCity, center);
  useEffect(() => {
    setCenter({ lat: currentCity.lat, lng: currentCity.lng });
  }, [currentCity]);
  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      if (center.lat && center.lng) {
        const bounds = new window.google.maps.LatLngBounds(center);

        map.fitBounds(bounds);
      }
      map.setZoom(11);
      console.log("map", map);
      setMap(map);
    },
    [center]
  );
  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName={styles.container}
        center={center}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        //onLoad={onLoad}
        zoom={zoom}
        onUnmount={onUnmount}
      >
        <Markers />
      </GoogleMap>
    </>
  ) : (
    <div>로드 안됨</div>
  );
};

export default MapContainer;
