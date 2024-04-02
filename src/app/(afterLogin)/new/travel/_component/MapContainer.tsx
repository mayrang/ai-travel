"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styles from "./MapContainer.module.css";
import { useNewTravelStore } from "@/store/newTravel";
// const markerOptions = {
//   // 사용자 정의 마커 이미지를 지정합니다.
//   icon: {
//     url: "https://maps.google.com/mapfiles/ms/micons/blue.png",
//     scaledSize: new window.google.maps.Size(30, 30), // 마커 크기 설정
//   },
// };

const MapContainer: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "travel_map",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "",
  });
  const [lineCoordinates, setLineCoordinates] = useState<
    google.maps.LatLng[] | null
  >(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const { cities } = useNewTravelStore();
  const center = { lat: cities[0]?.lat || 0, lng: cities[0]?.lng };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  console.log(directions);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName={styles.container}
        center={center}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <div
          id="panel"
          style={{
            flex: "1",
            padding: "20px",
            height: "400px",
            overflowY: "auto",
            zIndex: 1100,
            position: "fixed",
          }}
        ></div>
      </GoogleMap>
    </>
  ) : (
    <div>로드 안됨</div>
  );
};

export default MapContainer;
