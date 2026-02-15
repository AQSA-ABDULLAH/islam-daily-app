import { LocationContext } from "@/context/LocationContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Magnetometer } from "expo-sensors";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

const QiblaScreen = () => {
  const { location, city } = useContext(LocationContext);

  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  // 🔄 Convert magnetometer values to heading (0 - 360)
  const calculateHeading = (data: any) => {
    let angle = Math.atan2(data.y, data.x);
    angle = angle * (180 / Math.PI);
    angle = angle >= 0 ? angle : angle + 360;
    return angle;
  };

  // 🕋 Calculate Qibla direction
  const getQiblaDirection = (lat: number, lng: number) => {
    const kaabaLat = 21.4225 * (Math.PI / 180);
    const kaabaLng = 39.8262 * (Math.PI / 180);

    const userLat = lat * (Math.PI / 180);
    const userLng = lng * (Math.PI / 180);

    const dLng = kaabaLng - userLng;

    const y = Math.sin(dLng);
    const x =
      Math.cos(userLat) * Math.tan(kaabaLat) -
      Math.sin(userLat) * Math.cos(dLng);

    let direction = Math.atan2(y, x) * (180 / Math.PI);
    return (direction + 360) % 360;
  };

  // 📡 Listen to Magnetometer
  useEffect(() => {
    Magnetometer.setUpdateInterval(100);

    const subscription = Magnetometer.addListener((data) => {
      const angle = calculateHeading(data);
      setHeading(angle);
    });

    return () => subscription.remove();
  }, []);

  // 📍 Calculate Qibla once location available
  useEffect(() => {
    if (location) {
      const direction = getQiblaDirection(
        location.latitude,
        location.longitude,
      );
      setQiblaDirection(direction);
    }
  }, [location]);

  // 🎯 Final rotation (IMPORTANT FIX)
  const rotation = (qiblaDirection - heading + 360) % 360;

  return (
    <View className="flex-1 bg-[#0F172A] items-center pt-12">
      {/* Location */}
      <View className="bg-[#1E293B] px-6 py-3 rounded-2xl mb-16 shadow-lg">
        <Text className="text-gray-300 text-[12px] font-medium tracking-wide">
          {city || "Detecting location..."}
        </Text>
      </View>

      {/* Compass */}
      <View className="relative items-center justify-center w-80 h-80">
        {/* Compass Dial (ROTATES WITH PHONE) */}
        <View
          className="absolute w-full h-full border border-slate-700/40 rounded-full items-center justify-center"
          style={{ transform: [{ rotate: `${-heading}deg` }] }}
        >
          <Text className="absolute top-3 text-white font-bold text-lg">N</Text>
          <Text className="absolute bottom-3 text-white font-bold text-lg">
            S
          </Text>
          <Text className="absolute left-3 text-white font-bold text-lg">
            W
          </Text>
          <Text className="absolute right-3 text-white font-bold text-lg">
            E
          </Text>

          {[...Array(12)].map((_, i) => (
            <View
              key={i}
              className="absolute w-1 h-4 bg-slate-500/40 rounded-full"
              style={{
                transform: [{ rotate: `${i * 30}deg` }, { translateY: -140 }],
              }}
            />
          ))}
        </View>

        {/* Qibla Arrow (POINTS TO KAABA) */}
        <View
          className="items-center justify-center"
          style={{ transform: [{ rotate: `${rotation}deg` }] }}
        >
          <View className="w-1.5 h-32 bg-white rounded-full opacity-80" />

          <View className="absolute bg-[#93C5FD] p-4 rounded-full shadow-2xl">
            <MaterialCommunityIcons name="kaaba" size={40} color="#0F172A" />
          </View>
        </View>
      </View>

      {/* Info */}
      <View className="mt-16 items-center">
        <Text className="text-slate-400 text-xs uppercase tracking-widest">
          Rotate your phone to find Qibla
        </Text>
      </View>
    </View>
  );
};

export default QiblaScreen;
