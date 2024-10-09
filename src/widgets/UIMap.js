"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const defaults = {
  zoom: 19,
};

const Map = (Map) => {
  const { zoom = defaults.zoom, posix, popover } = Map;

  return (
    <MapContainer center={posix} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%", borderRadius: "1rem" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={posix} draggable={false}>
        <Popup>{popover}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
