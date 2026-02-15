import * as Location from "expo-location";
import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);

    let reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);

    if (reverseGeocode.length > 0) {
      setCity(reverseGeocode[0].city);
    }
  };

  return (
    <LocationContext.Provider value={{ location, city }}>
      {children}
    </LocationContext.Provider>
  );
};
