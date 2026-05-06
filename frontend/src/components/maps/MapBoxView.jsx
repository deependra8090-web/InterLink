import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker issue
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* =========================
   MAP CLICK HANDLER COMPONENT
========================= */
const MapClickHandler = ({ mode, onSelect, setPosition }) => {
  useMapEvents({
    click: async (e) => {
      if (mode !== "edit") return;

      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        onSelect?.({
          lat,
          lng,
          address: data.display_name || "",
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  return null;
};

const MapBoxView = ({
  lat,
  lng,
  address,
  mode = "view",
  onSelect,
}) => {
  const [position, setPosition] = useState(
    lat && lng ? [lat, lng] : [28.6139, 77.209]
  );

  /* =========================
     UPDATE POSITION
  ========================= */
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);
      
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Map tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Click handler */}
        <MapClickHandler 
          mode={mode}
          onSelect={onSelect}
          setPosition={setPosition}
        />

        {/* Marker */}
        <Marker position={position}>
          <Popup>
            <strong>{address || "Trip Destination"}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapBoxView;