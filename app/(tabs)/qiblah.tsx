import { LocationContext } from "@/context/LocationContext";
import { Magnetometer } from "expo-sensors";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";

const QiblaScreen = () => {
  const { location, city } = useContext(LocationContext);

  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  const animatedHeading = useRef(new Animated.Value(0)).current;
  const animatedQibla = useRef(new Animated.Value(0)).current;

  // Convert magnetometer data to heading
  const calculateHeading = (data: any) => {
    let angle = Math.atan2(data.y, data.x);
    angle = angle * (180 / Math.PI);
    return angle >= 0 ? angle : angle + 360;
  };

  // Calculate Qibla Direction
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

  // Smooth animate heading
  const animateTo = (animatedValue: Animated.Value, toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // Magnetometer listener
  useEffect(() => {
    Magnetometer.setUpdateInterval(100);

    const subscription = Magnetometer.addListener((data) => {
      const angle = calculateHeading(data);
      setHeading(angle);
      animateTo(animatedHeading, angle);
    });

    return () => subscription.remove();
  }, []);

  // Qibla calculation
  useEffect(() => {
    if (location) {
      const direction = getQiblaDirection(
        location.latitude,
        location.longitude,
      );
      setQiblaDirection(direction);
      animateTo(animatedQibla, direction);
    }
  }, [location]);

  const dialRotation = animatedHeading.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const needleRotation = Animated.subtract(
    animatedQibla,
    animatedHeading,
  ).interpolate({
    inputRange: [-360, 360],
    outputRange: ["-360deg", "360deg"],
  });

  return (
    <View className="flex-1 items-center pt-12">
      {/* Location */}
      <View className="bg-[#1E293B] text-white px-6 py-3 rounded-2xl mb-16 shadow-lg">
        <Text className="text-[12px] font-medium tracking-wide">
          {city || "Detecting location..."}
        </Text>
      </View>

      {/* Compass */}
      <View className="relative items-center justify-center w-80 h-80">
        {/* Rotating Dial */}
        <Animated.View
          className="absolute w-full h-full border border-slate-700/40 rounded-full items-center justify-center"
          style={{ transform: [{ rotate: dialRotation }] }}
        >
          <Text className="absolute top-3 font-bold text-lg">N</Text>
          <Text className="absolute bottom-3 font-bold text-lg">S</Text>
          <Text className="absolute left-3 font-bold text-lg">W</Text>
          <Text className="absolute right-3 font-bold text-lg">E</Text>

          {[...Array(12)].map((_, i) => (
            <View
              key={i}
              className="absolute w-1 h-4 bg-slate-500/40 rounded-full"
              style={{
                transform: [{ rotate: `${i * 30}deg` }, { translateY: -140 }],
              }}
            />
          ))}
        </Animated.View>

        {/* Animated Qibla Needle */}
        <Animated.View
          className="items-center justify-center"
          style={{ transform: [{ rotate: needleRotation }] }}
        >
          <View className="w-1.5 h-32 bg-black rounded-full opacity-80" />

          <View className="absolute p-2 rounded-full shadow-2xl bg-[#93C5FD]">
            <Image
              source={require("../../assets/qiblah/qiblah-icon.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      </View>

      {/* Info */}
      <View className="mt-16 items-center">
        <Text className="text-slate-400 text-xs uppercase tracking-widest">
          Rotate your phone smoothly to align with Qibla
        </Text>
      </View>
    </View>
  );
};

export default QiblaScreen;
