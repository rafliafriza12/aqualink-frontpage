"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationMarkerProps {
  onMapClick: (coords: Coordinates) => void;
}

interface MapComponentProps {
  position: Coordinates | null;
  step: number;
  handleMapClick: (coords: Coordinates) => void;
  zoom?: number;
  scrollWheelZoom?: boolean;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  position,
  step,
  handleMapClick,
  zoom = 12,
  scrollWheelZoom = false,
}) => {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      className="w-full h-[250px] rounded-md shadow-md"
      center={[5.5530134, 95.317486]}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {step === 0 && <LocationMarker onMapClick={handleMapClick} />}
      {position && <Marker position={position} />}
    </MapContainer>
  );
};

export default MapComponent;
