import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Blue icons - THREE sizes now
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],  // Normal size
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIconMedium = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 48],  // Hover size
  iconAnchor: [15, 48],
  popupAnchor: [1, -34],
  shadowSize: [48, 48],
});

const blueIconLarge = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [35, 55],  // Clicked size
  iconAnchor: [17, 55],
  popupAnchor: [1, -34],
  shadowSize: [55, 55],
});


const MapClickHandler = ({ onMapClick }) => {
  useMapEvent("click", (e) => {
    // Only trigger if clicking directly on the map (not on a marker)
    if (e.originalEvent.target.classList.contains("leaflet-container")) {
      onMapClick();
    }
  });
  return null;
};

const OSMMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [dessertLocations, setDessertLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef([]);

  useEffect(() => {
    const fetchDessertLocations = async () => {
      setIsLoading(true);
      try {
        // Expanded query to find all types of dessert places in wider area
        const overpassQuery = `
          [out:json][timeout:30];
          (
            // Search in 30km radius around Provo
            node["amenity"~"cafe|ice_cream|restaurant"]["cuisine"~"ice_cream|dessert|coffee_shop"](around:30000,40.2338,-111.6585);
            node["shop"~"bakery|confectionery|pastry|chocolate|coffee"](around:30000,40.2338,-111.6585);
            node["cuisine"~"dessert|ice_cream|pancake|crepe|waffle"](around:30000,40.2338,-111.6585);
            way["amenity"~"cafe|ice_cream"]["cuisine"~"dessert"](around:30000,40.2338,-111.6585);
          );
          out center;
        `;

        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        const data = await response.json();

        const processLocation = (item) => {
          // Handle both nodes and ways (which use center point)
          const lat = item.lat || item.center?.lat;
          const lon = item.lon || item.center?.lon;
          if (!lat || !lon) return null;

          return {
            name: item.tags?.name || 'Dessert Spot',
            position: [lat, lon],
            description: [
              item.tags?.cuisine,
              item.tags?.shop,
              item.tags?.amenity
            ].filter(Boolean).join(' • ') || 'Sweet treats available here'
          };
        };

        const locations = data.elements
          .map(processLocation)
          .filter(Boolean); // Remove any null entries

        setDessertLocations(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setDessertLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDessertLocations();
  }, []);

  // Enhanced animation function
  const animateMarker = (marker, targetIcon) => {
    if (!marker) return;
    
    const iconElement = marker.getElement();
    if (iconElement) {
      // Apply transition style
      iconElement.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
      
      // Small delay to ensure transition applies
      setTimeout(() => {
        marker.setIcon(targetIcon);
      }, 50);
    }
  };

  const handleMarkerHover = (index, isHovering) => {
    setHoveredMarker(isHovering ? index : null);
    const marker = markersRef.current[index];
    
    if (marker) {
      // Only animate if not the currently selected marker
      if (selectedMarker !== index) {
        animateMarker(
          marker,
          isHovering ? blueIconMedium : blueIcon
        );
      }
    }
  };

  const handleMarkerClick = (index) => {
    const marker = markersRef.current[index];
    if (marker) {
      animateMarker(
        marker,
        index === selectedMarker ? blueIcon : blueIconLarge
      );
    }
    setSelectedMarker(index === selectedMarker ? null : index);
  };

  const handleMapClick = () => {
    if (selectedMarker !== null) {
      const marker = markersRef.current[selectedMarker];
      if (marker) {
        animateMarker(marker, blueIcon); // Animate back to normal size
      }
      setSelectedMarker(null);
    }
  };

  return (
    <MapContainer 
      center={[40.2338, -111.6585]} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add MapClickHandler inside MapContainer */}
      <MapClickHandler onMapClick={handleMapClick} />

      {isLoading ? (
        <div className="map-loading">Loading dessert places...</div>
      ) : (
        dessertLocations.map((loc, index) => (
          <Marker
            key={`${loc.position[0]}-${loc.position[1]}`}
            position={loc.position}
            ref={(el) => (markersRef.current[index] = el)}
            icon={
              selectedMarker === index ? blueIconLarge :
              hoveredMarker === index ? blueIconMedium : 
              blueIcon
            }
            eventHandlers={{
              click: () => handleMarkerClick(index),
              mouseover: () => handleMarkerHover(index, true),
              mouseout: () => handleMarkerHover(index, false)
            }}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              {loc.description}
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default OSMMap;