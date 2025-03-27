import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OSMMap = () => {
  return (
    <MapContainer center={[40.2338, -111.6585]} zoom={13} style={{ height: "500px", width: "100%" }}>
      {/* TileLayer with OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Example Marker */}
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A sample marker in London.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default OSMMap;
