// import React, { useEffect, useRef, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import * as L from "leaflet";
// import { Icon } from "leaflet";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine";
// import Header1 from "../../../components/Header1";

// const Navigate = () => {
//   const legalIcon = new Icon({
//     iconUrl:
//       "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-legal-business-and-finance-icongeek26-linear-colour-icongeek26.png",
//     iconSize: [35, 35], // size of the icon
//     iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
//   });
//   const locationIcon = new Icon({
//     iconUrl: "https://img.icons8.com/ios/50/marker--v1.png",
//     iconSize: [35, 35],
//     iconAnchor: [15, 50],
//     popupAnchor: [-3, -76],
//   });
//   const foodIcon = new Icon({
//     iconUrl: "https://img.icons8.com/doodle/48/apple.png",
//     iconSize: [35, 35], // size of the icon
//     iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
//   });
//   const healthIcon = new Icon({
//     iconUrl: "https://img.icons8.com/doodle/48/heart-with-pulse.png",
//     iconSize: [35, 35], // size of the icon
//     iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
//   });

//   const housingIcon = new Icon({
//     iconUrl: "https://img.icons8.com/plasticine/100/exterior.png",
//     iconSize: [38, 45], // size of the icon
//     iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//     popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
//   });

//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mapReady, setMapReady] = useState(false);
//   const [mapReady1, setMapReady1] = useState({ latlng: { lat: "", lng: "" } });
//   const [markers, setMarkers] = useState([]);

//   const [endMarker, setEndMarker] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const getUserLocation = () => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // setMapReady1({
//           //   ...mapReady1,
//           //   latlng: {
//           //     lat: position.coords.latitude,
//           //     lng: position.coords.longitude,
//           //   },
//           // });

//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           setMapReady(true);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     };

//     getUserLocation();
//   }, []);

//   const HandleMapClick = () => {
//     const map = useMap();
//     const mapEvents = useMapEvents({
//       click: (e) => {
//         console.log(e.latlng);
//         if (markers.length === 0) {
//           setMarkers([...markers, e.latlng]);
//           console.log("Start location:", e.latlng.lat, e.latlng.lng);
//         } else if (markers.length === 1) {
//           setMarkers([...markers, e.latlng]);
//           console.log("End location:", e.latlng.lat, e.latlng.lng);
//           addRoutingMachine(map);
//         } else {
//           setMarkers([e.latlng]);
//           addRoutingMachine(map);
//         }
//       },
//     });

//     return null;
//   };

//   const addRoutingMachine = (map) => {
//     if (markers.length === 2) {
//       L.Routing.control({
//         waypoints: [
//           L.latLng(markers[0].lat, markers[0].lng),
//           L.latLng(markers[1].lat, markers[1].lng),
//         ],
//         lineOptions: {
//           styles: [{ color: "blue", weight: 4 }],
//         },
//         routeWhileDragging: true,
//         show: true,
//         addWaypoints: true,
//         draggableWaypoints: true,
//         fitSelectedRoutes: true,
//         showAlternatives: true,
//         router: L.Routing.osrmv1({
//           profile: "foot",
//         }),
//       }).addTo(map);
//     }
//   };

//   return (
//     <>
//     <Header1/>
//       {mapReady && (
//         <MapContainer
//           center={[latitude, longitude]}
//           zoom={16}
//           ref={mapRef}
//           style={{
//             position: "absolute",
//             height: "100vh",
//             width: "100vh",
//             marginLeft: 50,
//           }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {markers.map((marker, index) => (
//             <Marker key={index} position={marker} icon={locationIcon}>
//               <Popup>Marker {index + 1}</Popup>
//             </Marker>
//           ))}

//           <HandleMapClick />
//         </MapContainer>
//       )}
//     </>
//   );
// };

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import Header1 from "../../../components/Header1";
import { useLocation } from "react-router-dom";
import React,{ useEffect, useState } from "react";
function Navigate() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    getLocation();
  }, []);
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (postition) => {
        setLatitude(postition.coords.latitude);
        setLongitude(postition.coords.longitude);
        setShowMap(true);
      },
      (error) => {}
    );
  }
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const queryparams = useQuery();

  const addRoutingMachine = (map) => {
    L.Routing.control({
      waypoints: [
        L.latLng(latitude, longitude),
        L.latLng(
          parseFloat(queryparams.get("lattitude")),
          parseFloat(queryparams.get("longitude"))
        ),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      routeWhileDragging: true,
      show: true,
      addWaypoints: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: true,
      router: L.Routing.osrmv1({
        profile: "foot",
      }),
    }).addTo(map);
  };

  const AddMarkerOnClick = () => {
    const map = useMap();
    useMapEvents({
      click: (e) => addRoutingMachine(map),
    });

    return null;
  };

  return (
    <div>
      <Header1 />
      Navigate
      <div>
        {showMap && (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: 600 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[latitude, longitude]} >
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
            <AddMarkerOnClick />
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default Navigate;
