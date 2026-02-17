import { LocationContext } from "@/context/LocationProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const prayerOrder = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
type PrayerName = (typeof prayerOrder)[number];

const PrayerStatus: React.FC = () => {
  const { location } = useContext(LocationContext);
  const [currentPrayer, setCurrentPrayer] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  // Calculate prayer times whenever location changes
  useEffect(() => {
    if (location) {
      calculatePrayerTimes(location.latitude, location.longitude);
    }
  }, [location]);

  // Countdown timer
  useEffect(() => {
    let timer: number;
    if (nextPrayerTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = nextPrayerTime.getTime() - now.getTime();

        if (diff <= 0) {
          setCountdown("00:00:00");
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setCountdown(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0",
            )}:${String(seconds).padStart(2, "0")}`,
          );
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [nextPrayerTime]);

  const calculatePrayerTimes = (lat: number, lng: number) => {
    const coords = new Coordinates(lat, lng);
    const date = new Date();
    const params = CalculationMethod.MuslimWorldLeague();
    const times = new PrayerTimes(coords, date, params);

    const now = new Date();
    let current = "";
    let next = "";
    let nextTime: Date | null = null;

    for (let i = 0; i < prayerOrder.length; i++) {
      const prayerName: PrayerName = prayerOrder[i];
      const prayerTime = times[prayerName];

      if (now >= prayerTime && i < prayerOrder.length - 1) {
        current = prayerName.toUpperCase();
        next = prayerOrder[i + 1].toUpperCase();
        nextTime = times[prayerOrder[i + 1]];
      } else if (now < prayerTime) {
        current = i === 0 ? "MIDNIGHT" : prayerOrder[i - 1].toUpperCase();
        next = prayerName.toUpperCase();
        nextTime = prayerTime;
        break;
      }
    }

    setCurrentPrayer(current);
    setNextPrayer(next);
    setNextPrayerTime(nextTime);
  };

  return (
    <View className="p-5 mb-6">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <View className="bg-slate-900 p-2 rounded-md self-start mb-4">
            <MaterialCommunityIcons
              name="bell-outline"
              size={18}
              color="white"
            />
          </View>

          <View className="flex-row items-center">
            <View>
              <Text className="text-gray-400 text-[10px] uppercase font-bold">
                Now
              </Text>
              <Text className="text-xl font-black text-black">
                {currentPrayer}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-right"
              size={22}
              color="#1E293B"
              style={{ marginHorizontal: 16 }}
            />

            <View>
              <Text className="text-gray-800 font-bold text-sm">
                {nextPrayerTime?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text className="text-xl font-black text-black">
                {nextPrayer}
              </Text>
            </View>
          </View>
        </View>

        <View className="items-center justify-center">
          <TouchableOpacity className="bg-[#1E293B] px-4 py-1.5 rounded-lg mb-4">
            <Text className="text-white text-[10px] font-bold tracking-tight">
              TRACK PRAYER
            </Text>
          </TouchableOpacity>

          <View className="items-center justify-center relative">
            <View className="h-20 w-20 rounded-full border-2 border-gray-200 items-center justify-center">
              <View className="absolute top-0 h-2 w-2 bg-slate-800 rounded-full" />
              <Text className="text-[8px] text-gray-400 uppercase font-bold">
                Time
              </Text>
              <Text className="text-[12px] font-bold text-slate-800">
                {countdown}
              </Text>
              <Text className="text-[8px] text-gray-400 font-bold">Left</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PrayerStatus;
