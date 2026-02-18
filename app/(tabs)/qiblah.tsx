import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Platform, Text, View } from "react-native";
import { useSelector } from "react-redux";

const QiblahScreen = () => {
  const visitor = useSelector((state: any) => state.visitor?.data);

  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [city, setCity] = useState("Detecting location...");

  const animatedRotation = useRef(new Animated.Value(0)).current;

  // -----------------------------
  // Convert Magnetometer data → heading (0–360)
  // -----------------------------
  const calculateHeading = (data: any) => {
    let angle = Math.atan2(data.y, data.x);
    angle = angle * (180 / Math.PI);
    return angle >= 0 ? angle : angle + 360;
  };

  // -----------------------------
  // Calculate Qibla Direction
  // -----------------------------
  const calculateQibla = (lat: number, lng: number) => {
    const kaabaLat = (21.4225 * Math.PI) / 180;
    const kaabaLng = (39.8262 * Math.PI) / 180;

    const userLat = (lat * Math.PI) / 180;
    const userLng = (lng * Math.PI) / 180;

    const dLng = kaabaLng - userLng;

    const y = Math.sin(dLng);
    const x =
      Math.cos(userLat) * Math.tan(kaabaLat) -
      Math.sin(userLat) * Math.cos(dLng);

    let direction = Math.atan2(y, x) * (180 / Math.PI);
    return (direction + 360) % 360;
  };

  // -----------------------------
  // Animate compass smoothly
  // -----------------------------
  const animateCompass = (toValue: number) => {
    Animated.timing(animatedRotation, {
      toValue,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // -----------------------------
  // Load Location (Redux → fallback GPS)
  // -----------------------------
  useEffect(() => {
    const loadLocation = async () => {
      try {
        let latitude;
        let longitude;

        if (visitor?.latitude && visitor?.longitude) {
          latitude = visitor.latitude;
          longitude = visitor.longitude;
        } else {
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== "granted") {
            setCity("Location permission denied");
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
        }

        const qibla = calculateQibla(latitude, longitude);
        setQiblaDirection(qibla);

        const geo = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (geo.length > 0) {
          setCity(geo[0].city || geo[0].region || "Unknown location");
        }
      } catch (error) {
        console.log("Location error:", error);
      }
    };

    loadLocation();
  }, [visitor]);

  // -----------------------------
  // Start Magnetometer
  // -----------------------------
  useEffect(() => {
    if (Platform.OS === "web") {
      console.log("Magnetometer not supported on web");
      return;
    }

    let subscription: any;

    const startMagnetometer = async () => {
      const available = await Magnetometer.isAvailableAsync();
      if (!available) {
        console.log("Magnetometer not available");
        return;
      }

      Magnetometer.setUpdateInterval(200);

      subscription = Magnetometer.addListener((data) => {
        const angle = calculateHeading(data);
        setHeading(angle);

        // Difference between Qibla and heading
        const rotation = qiblaDirection - angle;

        animateCompass(rotation);
      });
    };

    startMagnetometer();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [qiblaDirection]);

  // -----------------------------
  // Animated Rotation
  // -----------------------------
  const rotateStyle = {
    transform: [
      {
        rotate: animatedRotation.interpolate({
          inputRange: [-360, 360],
          outputRange: ["-360deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View className="flex-1 bg-white items-center pt-16">
      {/* Location */}
      <View className="bg-[#1E293B] px-6 py-3 rounded-2xl mb-16 shadow-lg">
        <Text className="text-white text-xs tracking-wide">{city}</Text>
      </View>

      {/* Compass */}
      <View className="relative items-center justify-center w-80 h-80">
        {/* Dial Background */}
        <View className="absolute w-full h-full border border-slate-400 rounded-full items-center justify-center">
          <Text className="absolute top-4 font-bold text-lg">N</Text>
          <Text className="absolute bottom-4 font-bold text-lg">S</Text>
          <Text className="absolute left-4 font-bold text-lg">W</Text>
          <Text className="absolute right-4 font-bold text-lg">E</Text>
        </View>

        {/* Qibla Needle */}
        <Animated.View style={rotateStyle} className="items-center">
          <View className="w-1.5 h-32 bg-black rounded-full opacity-80" />

          <View className="absolute p-2 rounded-full bg-blue-400 shadow-xl">
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
        <Text className="text-slate-400 text-xs uppercase tracking-widest text-center px-6">
          Rotate your phone until the needle aligns with Qibla
        </Text>
      </View>
    </View>
  );
};

export default QiblahScreen;
