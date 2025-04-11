import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/Map.css"; // Import your CSS file

// Blue icons
const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIconMedium = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -34],
  shadowSize: [48, 48],
});

const blueIconLarge = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [35, 55],
  iconAnchor: [17, 55],
  popupAnchor: [1, -34],
  shadowSize: [55, 55],
});

const MapEventHandlers = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (e.originalEvent.target.classList.contains("leaflet-container")) {
        onMapClick();
      }
    },
    dragstart: () => {
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
        const overpassQuery = `
          [out:json][timeout:30];
          (
            node["amenity"~"cafe|ice_cream|restaurant"]["cuisine"~"ice_cream|dessert"](around:30000,40.2338,-111.6585);
            node["shop"~"bakery|confectionery|pastry|chocolate"](around:30000,40.2338,-111.6585);
            way["amenity"~"cafe|ice_cream"]["cuisine"~"dessert"](around:30000,40.2338,-111.6585);
          );
          out center;
        `;

        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        const data = await response.json();

        const cleanDescription = (tags) => {
          if (!tags) return 'Dessert shop';
          
          const typeMap = {
            'bakery': 'Bakery',
            'cafe': 'Café',
            'ice_cream': 'Ice Cream',
            'pastry': 'Pastry Shop',
            'confectionery': 'Candy Store',
            'chocolate': 'Chocolate Shop',
            'restaurant': 'Restaurant'
          };

          const features = [];
          if (tags.amenity) features.push(typeMap[tags.amenity] || tags.amenity);
          if (tags.shop) features.push(typeMap[tags.shop] || tags.shop);
          
          if (tags.cuisine) {
            tags.cuisine.split(';').forEach(c => {
              if (typeMap[c]) features.push(typeMap[c]);
            });
          }

          return [...new Set(features)].join(' • ') || 'Dessert shop';
        };

        const locations = data.elements
          .map(item => {
            const lat = item.lat || item.center?.lat;
            const lon = item.lon || item.center?.lon;
            return lat && lon ? {
              name: item.tags?.name || 'Dessert Spot',
              position: [lat, lon],
              description: cleanDescription(item.tags)
            } : null;
          })
          .filter(Boolean);

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

  const animateMarker = (marker, targetIcon) => {
    if (!marker) return;
    const iconElement = marker.getElement();
    if (iconElement) {
      iconElement.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
      setTimeout(() => {
        marker.setIcon(targetIcon);
      }, 50);
    }
  };

  const resetSelectedMarker = () => {
    if (selectedMarker !== null) {
      const marker = markersRef.current[selectedMarker];
      if (marker) animateMarker(marker, blueIcon);
      setSelectedMarker(null);
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

  const handleMarkerHover = (index, isHovering) => {
    setHoveredMarker(isHovering ? index : null);
    const marker = markersRef.current[index];
    if (marker && selectedMarker !== index) {
      animateMarker(marker, isHovering ? blueIconMedium : blueIcon);
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

      <MapEventHandlers onMapClick={resetSelectedMarker} />

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
            <Popup className="custom-popup">
              <div className="popup-content">
                <h3 className="popup-title">{loc.name}</h3>
                <div className="popup-description">
                  {loc.description.split(' • ').map((item, i) => (
                    <span key={i} className="popup-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default OSMMap;