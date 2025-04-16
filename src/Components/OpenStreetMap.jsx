import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState, useRef, useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/Map.css";
import dessertData from "../contextsGlobal/dessertData";

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

const OSMMap = ({ 
  selectedFlavor, 
  selectedType,
  selectedDietary,
  selectedRating,
  searchQuery
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(13);
  const markersRef = useRef([]);

  // Fetch all locations just once on component mount
  useEffect(() => {
    const fetchDessertLocations = async () => {
      setIsLoading(true);
      try {
        const overpassQuery = `[out:json][timeout:25];
          (
            nwr["shop"="bakery"](around:10000,40.2338,-111.6585);
            nwr["shop"="confectionery"](around:10000,40.2338,-111.6585);
            nwr["shop"="chocolate"](around:10000,40.2338,-111.6585);
            nwr["shop"="pastry"](around:10000,40.2338,-111.6585);
            nwr["amenity"="ice_cream"](around:10000,40.2338,-111.6585);
            nwr["amenity"="cafe"]["cuisine"="dessert"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="dessert"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="ice_cream"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="cake"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="cupcake"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="pudding"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="custard"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="frozen_yogurt"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="froyo"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="cookie"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="donut"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="doughnut"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="waffle"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="crepe"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="pastry"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="churro"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="croissant"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="brownie"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="tart"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="macaron"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="mille_feuille"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="eclair"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="gelato"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="mochi"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="popsicle"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="sorbet"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="parfait"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="banana_split"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="milkshake"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="smoothie"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="sweet"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="boba"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="bubble_tea"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="dirty_soda"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="soda"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="cobbler"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="panna_cotta"](around:10000,40.2338,-111.6585);
            nwr["cuisine"="baklava"](around:10000,40.2338,-111.6585);
            nwr["name"="Crumbl Cookies"](around:15000,40.2338,-111.6585);
            nwr["name"="Baked by Melissa"](around:15000,40.2338,-111.6585);
            nwr["name"="Freddy's"](around:15000,40.2338,-111.6585);
            nwr["name"="Culver's"](around:15000,40.2338,-111.6585);
            nwr["name"="Marble Slab Creamery"](around:15000,40.2338,-111.6585);
            nwr["name"="Gigi's Cupcakes"](around:15000,40.2338,-111.6585);
            nwr["name"="Cold Stone Creamery"](around:15000,40.2338,-111.6585);
            nwr["name"="Cinnabon"](around:15000,40.2338,-111.6585);
            nwr["name"="Krispy Kreme"](around:15000,40.2338,-111.6585);
            nwr["name"="Dairy Queen"](around:15000,40.2338,-111.6585);
            nwr["name"="Jeni's Splendid Ice Creams"](around:15000,40.2338,-111.6585);
            nwr["name"="Beard Papa's"](around:15000,40.2338,-111.6585);
            nwr["name"="Milk Bar"](around:15000,40.2338,-111.6585);
            nwr["name"="Andy's Frozen Custard"](around:15000,40.2338,-111.6585);
            nwr["name"="Freddy's Frozen Custard & Steakburgers"](around:15000,40.2338,-111.6585);
            nwr["name"="Swig"](around:15000,40.2338,-111.6585);
            nwr["name"="Sodalicious"](around:15000,40.2338,-111.6585);
            nwr["name"="Fizz"](around:15000,40.2338,-111.6585);
            nwr["name"="Thirst"](around:15000,40.2338,-111.6585);
            nwr["name"="Quench It!"](around:15000,40.2338,-111.6585);
          );
          out center;`;

        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        const data = await response.json();

        const cleanDescription = (tags) => {
          if (!tags) return 'Dessert shop';
          
          const typeMap = {
            'bakery': 'Bakery',
            'cafe': 'Café',
            'ice_cream': 'Ice Cream Shop',
            'confectionery': 'Candy Store',
            'pastry': 'Pastry Shop',
            'chocolate': 'Chocolate Shop',
            'restaurant': 'Restaurant',
            'fast_food': 'Fast Food',
            'dessert': 'Dessert',
            'gelato': 'Gelato',
            'frozen_yogurt': 'Frozen Yogurt',
            'froyo': 'Froyo',
            'popsicle': 'Popsicle Stand',
            'sorbet': 'Sorbet',
            'custard': 'Frozen Custard',
            'pudding': 'Pudding',
            'cake': 'Cake Shop',
            'cupcake': 'Cupcake Bakery',
            'cookie': 'Cookie Shop',
            'brownie': 'Brownie Bar',
            'tart': 'Tart Shop',
            'macaron': 'Macaron Boutique',
            'eclair': 'Éclair Stand',
            'mille_feuille': 'Mille-Feuille Pastry',
            'mochi': 'Mochi Dessert',
            'crepe': 'Crêperie',
            'waffle': 'Waffle House',
            'churro': 'Churro Spot',
            'croissant': 'Croissant Café',
            'parfait': 'Parfait Bar',
            'banana_split': 'Banana Split',
            'milkshake': 'Milkshake Bar',
            'smoothie': 'Smoothie Bar',
            'sweet': 'Sweet Treats',
            'boba': 'Boba Tea',
            'bubble_tea': 'Bubble Tea',
            'tea': 'Tea House',
            'dirty_soda': 'Dirty Soda Bar',
            'swig': 'Swig (Dirty Soda)',
            'sodalicious': 'Sodalicious (Dirty Soda)',
            'freddys': 'Freddy\'s Frozen Custard',
            'sonic': 'Sonic Drive-In',
            'dq': 'Dairy Queen',
            'culvers': 'Culver\'s Frozen Custard',
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
              description: cleanDescription(item.tags),
              originalName: item.tags?.name || ''
            } : null;
          })
          .filter(Boolean);

        setAllLocations(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setAllLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDessertLocations();
  }, []);

  // Memoized filtered locations - updates only when filters or data changes
  const filteredLocations = useMemo(() => {
    // If no filters are active, return all locations
    if (selectedFlavor.length === 0 && 
        selectedType.length === 0 && 
        selectedDietary.length === 0 && 
        selectedRating.length === 0 && 
        !searchQuery) {
      return allLocations;
    }

    return allLocations.filter(loc => {
      return dessertData.some(dessert => {
        // Check if dessert belongs to this location
        const restaurantMatch = 
          dessert.restaurant.toLowerCase().includes(loc.name.toLowerCase()) ||
          dessert.restaurant.toLowerCase().includes(loc.originalName.toLowerCase());

        if (!restaurantMatch) return false;

        // Check against all active filters
        if (selectedFlavor.length > 0 && 
            !selectedFlavor.some(f => 
              dessert.flavor.some(df => 
                df.toLowerCase().includes(f.toLowerCase())
              )
            )) {
          return false;
        }

        if (selectedType.length > 0 && 
            !selectedType.some(t => 
              dessert["dessert type"].toLowerCase().includes(t.toLowerCase())
            )) {
          return false;
        }

        if (selectedDietary.length > 0 && 
            !selectedDietary.some(d => 
              dessert["dietary friendly"]?.some(df => 
                df.toLowerCase().includes(d.toLowerCase())
              )
            )) {
          return false;
        }

        if (selectedRating.length > 0 && 
            !selectedRating.includes(Math.floor(dessert.stars))) {
          return false;
        }

        if (searchQuery && 
            !dessert["dessert title"].toLowerCase().includes(searchQuery.toLowerCase()) &&
            !dessert.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !dessert["flavor"].some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !dessert["dessert type"].toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        return true;
      });
    });
  }, [allLocations, selectedFlavor, selectedType, selectedDietary, selectedRating, searchQuery]);

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
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="pastel-map"
      whenCreated={(map) => {
        setCurrentZoom(map.getZoom());
        map.on('zoomend', () => setCurrentZoom(map.getZoom()));
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        minNativeZoom={1}
        maxNativeZoom={20}
      />

      <MapEventHandlers onMapClick={resetSelectedMarker} />

      {isLoading ? (
        <div className="map-loading">Loading dessert places...</div>
      ) : (
        filteredLocations.map((loc, index) => (
          (currentZoom >= 12 || selectedMarker === index || hoveredMarker === index) && (
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
                  <div className="matching-desserts">
                    <h4>Available Desserts:</h4>
                    <ul>
                      {dessertData
                        .filter(dessert => 
                          dessert.restaurant.toLowerCase().includes(loc.name.toLowerCase()) ||
                          dessert.restaurant.toLowerCase().includes(loc.originalName.toLowerCase())
                        )
                        .filter(dessert => {
                          // Only apply filters if any are active
                          if (selectedFlavor.length > 0 || 
                              selectedType.length > 0 || 
                              selectedDietary.length > 0 || 
                              selectedRating.length > 0 || 
                              searchQuery) {
                            if (selectedFlavor.length > 0 && 
                                !selectedFlavor.some(f => 
                                  dessert.flavor.some(df => 
                                    df.toLowerCase().includes(f.toLowerCase())
                                  )
                                )) {
                              return false;
                            }
                            if (selectedType.length > 0 && 
                                !selectedType.some(t => 
                                  dessert["dessert type"].toLowerCase().includes(t.toLowerCase())
                                )) {
                              return false;
                            }
                            if (selectedDietary.length > 0 && 
                                !selectedDietary.some(d => 
                                  dessert["dietary friendly"]?.some(df => 
                                    df.toLowerCase().includes(d.toLowerCase())
                                  )
                                )) {
                              return false;
                            }
                            if (selectedRating.length > 0 && 
                                !selectedRating.includes(Math.floor(dessert.stars))) {
                              return false;
                            }
                            if (searchQuery && 
                                !dessert["dessert title"].toLowerCase().includes(searchQuery.toLowerCase()) &&
                                !dessert.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                !dessert["flavor"].some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                !dessert["dessert type"].toLowerCase().includes(searchQuery.toLowerCase())) {
                              return false;
                            }
                          }
                          return true;
                        })
                        .map((dessert, i) => (
                          <li key={i}>
                            {dessert["dessert title"]} ({dessert.stars}★) - {dessert["dessert type"]}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        ))
      )}
    </MapContainer>
  );
};

export default OSMMap;