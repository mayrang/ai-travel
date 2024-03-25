"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });
  const mapContainer = useRef(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    console.log("token", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
    });

    const directions = new MapboxDirections({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      unit: "metric",
      profile: "mapbox/walking", // You can change this to driving, cycling, etc.
      language: "ko",
      MapboxLanguage: "ko",
    });
    const language = new MapboxLanguage({ defaultLanguage: "ko" });
    map.addControl(language);
    map.addControl(directions, "top-left");

    map.on("load", () => {
      console.log("Map loaded");
    });

    return () => map.remove();
  }, []);

  const handleOnViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  return (
    <div style={{ height: "calc(100dvh - 48px)", marginTop: 48, width: "100dvw", maxWidth: 430 }} ref={mapContainer}>
      <ReactMapGL
        {...viewport}
        style={{ width: 200, height: 100 }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onViewportChange={handleOnViewportChange}
      >
        {/* Your markers go here */}
        {destination && (
          <Popup latitude={destination.latitude} longitude={destination.longitude} onClose={() => setDestination(null)}>
            <div>
              <h2>{destination.title}</h2>
              <p>{destination.description}</p>
            </div>
          </Popup>
        )}
        <div style={{ position: "absolute", right: 30, top: 30 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default Map;
