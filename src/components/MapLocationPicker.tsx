import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MapPin } from 'lucide-react';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapLocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string };
}

interface LocationMarkerProps {
  position: [number, number] | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  onLocationSelect,
  selectedLocation,
}) => {
  const [position, setPosition] = useState<[number, number] | null>(
    selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null
  );
  const [searchAddress, setSearchAddress] = useState(selectedLocation?.address || '');

  const handleLocationClick = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    
    // Simple reverse geocoding using OpenStreetMap Nominatim
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      
      setSearchAddress(address);
      onLocationSelect({ lat, lng, address });
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      const address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setSearchAddress(address);
      onLocationSelect({ lat, lng, address });
    }
  };

  const handleAddressSearch = async () => {
    if (!searchAddress.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        onLocationSelect({ lat: parseFloat(lat), lng: parseFloat(lon), address: searchAddress });
      }
    } catch (error) {
      console.error('Address search error:', error);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setPosition([selectedLocation.lat, selectedLocation.lng]);
      setSearchAddress(selectedLocation.address);
    }
  }, [selectedLocation]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address-search">Search Location</Label>
        <div className="flex gap-2">
          <Input
            id="address-search"
            type="text"
            placeholder="Enter an address or place name"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
            className="flex-1"
          />
          <button
            type="button"
            onClick={handleAddressSearch}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Search
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-64 rounded-lg border border-input overflow-hidden">
          <MapContainer
            center={position || [51.505, -0.09]}
            zoom={position ? 15 : 10}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} onLocationSelect={handleLocationClick} />
          </MapContainer>
        </div>
      </div>
      
      {selectedLocation && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">Selected Location:</p>
          <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
          <p className="text-xs text-muted-foreground">
            {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground">
        Click on the map to select a location for your event
      </p>
    </div>
  );
};

export default MapLocationPicker;