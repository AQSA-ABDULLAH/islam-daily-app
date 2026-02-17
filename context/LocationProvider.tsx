// context/LocationProvider.tsx

import { getVisitor } from "@/lib/helper";
import * as Location from "expo-location";
import { encode } from "open-location-code";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Platform } from "react-native";
import { v4 as uuidv4 } from "uuid";

export const LocationContext = createContext<any>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [coords, setCoords] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const [plusCode, setPlusCode] = useState<string | null>(null);
  const [ip, setIp] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // 1️⃣ Generate Visitor ID
        const id = uuidv4();
        setVisitorId(id);

        // 2️⃣ Ask Location Permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Location permission denied");
        }

        let latitude: number | null = null;
        let longitude: number | null = null;
        let generatedPlusCode: string | null = null;

        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({});

          latitude = loc.coords.latitude;
          longitude = loc.coords.longitude;

          setCoords({ latitude, longitude });

          // 3️⃣ Generate Plus Code
          generatedPlusCode = encode(latitude, longitude);

          setPlusCode(generatedPlusCode);

          // 4️⃣ Reverse Geocode
          const rev = await Location.reverseGeocodeAsync(loc.coords);
          if (rev.length > 0) {
            setCity(rev[0].city ?? null);
            setRegion(rev[0].region ?? null);
            setCountry(rev[0].country ?? null);
          }
        }

        // 5️⃣ Fetch Public IP
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip: userIp } = await ipRes.json();
        setIp(userIp);

        // 6️⃣ Timezone
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(tz);

        // 7️⃣ Send Data to Backend
        await getVisitor({
          visitor_id: id,
          ip_address: userIp,
          lat: latitude,
          lng: longitude,
          plus_code: generatedPlusCode,
          platform: Platform.OS,
          timezone: tz,
          city,
          region,
          country,
          access_platform: "app",
        });

        console.log("Visitor saved successfully");
      } catch (error) {
        console.log("Visitor init error:", error);
      }
    };

    init();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        visitorId,
        coords,
        plusCode,
        ip,
        timezone,
        city,
        region,
        country,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
