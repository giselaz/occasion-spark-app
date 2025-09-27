// import React, { useEffect, useRef, useState } from 'react';
// // import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Button } from './ui/button';
// import { MapPin } from 'lucide-react';

// interface MapLocationPickerProps {
//   onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
//   selectedLocation?: { lat: number; lng: number; address: string };
// }

const MapLocationPicker = () => {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<mapboxgl.Map | null>(null);
//   const marker = useRef<mapboxgl.Marker | null>(null);
//   const [apiKey, setApiKey] = useState('');
//   const [isMapReady, setIsMapReady] = useState(false);

//   const initializeMap = () => {
//     if (!mapContainer.current || !apiKey.trim()) return;

//     mapboxgl.accessToken = apiKey;
    
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/light-v11',
//       center: [0, 0],
//       zoom: 2
//     });

//     map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

//     // Get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           map.current?.setCenter([longitude, latitude]);
//           map.current?.setZoom(12);
          
//           if (!selectedLocation) {
//             reverseGeocode(longitude, latitude);
//           }
//         },
//         (error) => {
//           console.log('Geolocation error:', error);
//         }
//       );
//     }

//     // Handle map clicks
//     map.current.on('click', (e) => {
//       const { lng, lat } = e.lngLat;
//       addMarker(lng, lat);
//       reverseGeocode(lng, lat);
//     });

//     // Set existing location if provided
//     if (selectedLocation) {
//       map.current.on('load', () => {
//         addMarker(selectedLocation.lng, selectedLocation.lat);
//         map.current?.setCenter([selectedLocation.lng, selectedLocation.lat]);
//         map.current?.setZoom(12);
//       });
//     }

//     setIsMapReady(true);
//   };

//   const addMarker = (lng: number, lat: number) => {
//     if (marker.current) {
//       marker.current.remove();
//     }

//     marker.current = new mapboxgl.Marker({ color: 'hsl(var(--primary))' })
//       .setLngLat([lng, lat])
//       .addTo(map.current!);
//   };

//   const reverseGeocode = async (lng: number, lat: number) => {
//     try {
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`
//       );
//       const data = await response.json();
//       const address = data.features[0]?.place_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      
//       onLocationSelect({ lat, lng, address });
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       onLocationSelect({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
//     }
//   };

//   useEffect(() => {
//     if (apiKey) {
//       initializeMap();
//     }

//     return () => {
//       if (map.current) {
//         map.current.remove();
//       }
//     };
//   }, [apiKey]);

//   if (!apiKey) {
//     return (
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
//           <Input
//             id="mapbox-token"
//             type="text"
//             placeholder="Enter your Mapbox public token"
//             value={apiKey}
//             onChange={(e) => setApiKey(e.target.value)}
//             className="mt-1"
//           />
//           <p className="text-sm text-muted-foreground mt-1">
//             Get your token from{' '}
//             <a
//               href="https://mapbox.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-primary hover:underline"
//             >
//               mapbox.com
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="relative">
//         <div 
//           ref={mapContainer} 
//           className="w-full h-64 rounded-lg border border-input bg-background"
//         />
//         {!isMapReady && (
//           <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
//             <div className="flex items-center space-x-2 text-muted-foreground">
//               <MapPin className="h-5 w-5" />
//               <span>Loading map...</span>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {selectedLocation && (
//         <div className="p-3 bg-muted rounded-lg">
//           <p className="text-sm font-medium">Selected Location:</p>
//           <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
//           <p className="text-xs text-muted-foreground">
//             {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
//           </p>
//         </div>
//       )}
      
//       <p className="text-sm text-muted-foreground">
//         Click on the map to select a location for your event
//       </p>
//     </div>
//   );
};

export default MapLocationPicker;