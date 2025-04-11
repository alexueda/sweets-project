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
const dessertLocations = [
  {
    name: "BYU Creamery",
    position: [40.2471, -111.6493],
    description: "Classic ice cream shop on BYU campus."
  },
  {
    name: "Rockwell Ice Cream",
    position: [40.2334, -111.6588],
    description: "Artisan ice cream with unique flavors."
  },
  {
    name: "Ike’s Creamery (Provo Beach)",
    position: [40.2820, -111.6545],
    description: "Family-friendly creamery inside Provo Beach."
  },
  {
    name: "Brooker’s Founding Flavors Ice Cream",
    position: [40.3060, -111.7550],
    description: "Patriotic-themed ice cream parlor with rich flavors."
  },
  {
    name: "Chip Cookies",
    position: [40.2336, -111.6660],
    description: "Fresh-baked gourmet cookies delivered warm."
  },
  {
    name: "Cravings – Alicia’s Cupcakes",
    position: [40.3622, -111.7380],
    description: "Award-winning cupcakes with lots of flavor options."
  },
  {
    name: "Provo Bakery",
    position: [40.2346, -111.6550],
    description: "Historic bakery offering classic pastries and donuts."
  },
  {
    name: "Shirley’s Bakery & Café",
    position: [40.2530, -111.6620],
    description: "Locally loved spot for cinnamon rolls and sandwiches."
  },
  {
    name: "Delicatto Gourmet Bakery",
    position: [40.2780, -111.7000],
    description: "Hidden gem bakery with cakes, pastries, and more."
  },
  {
    name: "The Chocolate Dessert Café",
    position: [40.2940, -111.6940],
    description: "Cozy café famous for their chocolate cake and treats."
  },
  {
    name: "Swig",
    position: [40.3150, -111.7000],
    description: "Popular for dirty sodas and cookies."
  },
  {
    name: "The Yard Milkshake Bar",
    position: [40.2760, -111.6780],
    description: "Over-the-top milkshakes with all the fixings."
  },
  {
    name: "Hokulia Shave Ice",
    position: [40.3140, -111.7000],
    description: "Hawaiian-style shave ice with bold flavors."
  },
  {
    name: "Penguin Brothers",
    position: [40.2452, -111.6610],
    description: "Known for their cookie ice cream sandwiches and unique flavors."
  },
  {
    name: "Sub Zero Nitrogen Ice Cream",
    position: [40.2336, -111.6605],
    description: "Customizable ice cream made instantly using liquid nitrogen."
  },
  {
    name: "Bruster's Real Ice Cream",
    position: [40.2448, -111.6782],
    description: "Freshly made ice cream with a variety of flavors."
  },
  {
    name: "Bianca's La Petite French Bakery",
    position: [40.2336, -111.6608],
    description: "French-inspired pastries including croissants and macarons."
  },
  {
    name: "Eliane French Bakery",
    position: [40.3112, -111.7125],
    description: "Authentic French bakery with a selection of pastries and desserts."
  },
  {
    name: "Tam's Cream Puffs",
    position: [40.2735, -111.6932],
    description: "Specializes in cream puffs and delightful pastries."
  },
  {
    name: "The Penguin Brothers",
    position: [40.2448, -111.6543],
    description: "Gourmet cookies and ice cream sandwiches."
  },
  {
    name: "Crispy Cones",
    position: [40.2465, -111.6497],
    description: "Chimney cones filled with soft-serve ice cream and toppings."
  }
];

const MapClickHandler = ({ onMapClick }) => {
  useMapEvent("click", onMapClick);
  return null;
};

const OSMMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const markersRef = useRef([]);

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
      if (marker) marker.setIcon(blueIcon);
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

      <MapClickHandler onMapClick={handleMapClick} />

      {dessertLocations.map((loc, index) => (
        <Marker
          key={index}
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
      ))}
    </MapContainer>
  );
};

export default OSMMap;