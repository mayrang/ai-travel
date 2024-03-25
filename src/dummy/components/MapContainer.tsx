"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import styles from "./MapContainer.module.css";

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
  const [lineCoordinates, setLineCoordinates] = useState<google.maps.LatLng[] | null>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    try {
      const directionsService = new google.maps.DirectionsService();

      const origin = { lat: 33.5897319, lng: 130.4181525 };
      const destination = { lat: 34.7024898, lng: 135.4933757 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,

          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          console.log(response, "response");
          if (status === "OK" && response) {
            setDirections(response);
            const overViewCoords = response.routes[0].overview_path;
            setLineCoordinates(overViewCoords);
            // var step = Math.floor(response.routes[0].legs[0].steps.length / 2);
            // var infowindow2 = new google.maps.InfoWindow();
            // infowindow2.setContent(
            //   response.routes[0].legs[0].steps[step].distance?.text +
            //     "<br>" +
            //     response.routes[0].legs[0].steps[step].duration?.text +
            //     " "
            // );
            // infowindow2.setPosition(response.routes[0].legs[0].steps[step].end_location);
            // infowindow2.open(map);
            console.log("ok");
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const center = { lat: 37.7749, lng: -122.4194 };
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
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directions && (
          <DirectionsRenderer
            options={{ map: map, suppressInfoWindows: true }}
            directions={directions}
            panel={document.getElementById("panel") || undefined}
          />
        )}
        {/* {lineCoordinates && (
          <Polyline
            path={lineCoordinates}
            options={{
              strokeColor: "#38B44F",
              strokeOpacity: 1,
              strokeWeight: 7,
            }}
          />
        )} */}
        <div
          id="panel"
          style={{ flex: "1", padding: "20px", height: "400px", overflowY: "auto", zIndex: 1100, position: "fixed" }}
        ></div>
      </GoogleMap>
    </>
  ) : (
    <div>로드 안됨</div>
  );
};

export default MapContainer;
