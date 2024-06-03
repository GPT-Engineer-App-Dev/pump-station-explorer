import { useState, useEffect } from "react";
import { Container, Box, Text, VStack, IconButton } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const bikePumpStations = [
  { id: 1, name: "Pump Station 1", lat: 59.3293, lng: 18.0686 },
  { id: 2, name: "Pump Station 2", lat: 59.3326, lng: 18.0649 },
  { id: 3, name: "Pump Station 3", lat: 59.334, lng: 18.07 },
  // Add more stations as needed
];

const Index = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const mapOptions = {
        center: { lat: 59.3293, lng: 18.0686 },
        zoom: 13,
      };
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), mapOptions);
      setMap(mapInstance);
    }
  }, []);

  useEffect(() => {
    if (map) {
      bikePumpStations.forEach((station) => {
        new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map,
          title: station.name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });
      });
    }
  }, [map]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Bike Pump Stations in Stockholm</Text>
        <Box id="map" width="100%" height="500px" />
      </VStack>
    </Container>
  );
};

export default Index;
