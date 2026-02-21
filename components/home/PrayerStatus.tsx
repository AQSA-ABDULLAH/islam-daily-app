// components/prayer/PrayerStatus.tsx
import { timeToMinutes, to12HourFormat } from "@/lib/helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const PrayerStatus: React.FC = () => {
  const prayerData = useSelector((state: any) => state.prayer.data);

  const [currentPrayer, setCurrentPrayer] = useState<string>("--");
  const [currentPrayerTime, setCurrentPrayerTime] = useState<string>("--:--");
  const [nextPrayer, setNextPrayer] = useState<string>("--");
  const [nextPrayerTime, setNextPrayerTime] = useState<string>("--:--");
  const [countdown, setCountdown] = useState<string>("--:--:--");

  useEffect(() => {
    if (!prayerData?.timings) return;

    const updatePrayers = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      let foundCurrent = "Fajr";
      let foundNext = "Fajr";
      let nextTime: Date | null = null;
      let currentTimeStr = prayerData.timings["Fajr"];

      for (let i = 0; i < prayerOrder.length; i++) {
        const prayerName = prayerOrder[i];
        const timeStr = prayerData.timings[prayerName];
        const prayerMinutes = timeToMinutes(timeStr);

        if (nowMinutes < prayerMinutes) {
          foundCurrent =
            i === 0 ? prayerOrder[prayerOrder.length - 1] : prayerOrder[i - 1];
          foundNext = prayerName;
          currentTimeStr = prayerData.timings[foundCurrent];

          const [hours, minutes] = timeStr.split(":").map(Number);
          nextTime = new Date();
          nextTime.setHours(hours, minutes, 0, 0);
          break;
        }

        // After Isha → next is Fajr tomorrow
        if (i === prayerOrder.length - 1) {
          foundCurrent = "Isha";
          foundNext = "Fajr";
          currentTimeStr = prayerData.timings["Isha"];

          const [hours, minutes] = prayerData.timings["Fajr"]
            .split(":")
            .map(Number);
          nextTime = new Date();
          nextTime.setDate(nextTime.getDate() + 1);
          nextTime.setHours(hours, minutes, 0, 0);
        }
      }

      // Update current and next prayers
      setCurrentPrayer(foundCurrent);
      setCurrentPrayerTime(to12HourFormat(currentTimeStr));

      setNextPrayer(foundNext);
      if (nextTime) {
        const hours = nextTime.getHours().toString().padStart(2, "0");
        const minutes = nextTime.getMinutes().toString().padStart(2, "0");
        setNextPrayerTime(to12HourFormat(`${hours}:${minutes}`));

        // Countdown calculation
        const diff = nextTime.getTime() - now.getTime();
        if (diff > 0) {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff / (1000 * 60)) % 60);
          const s = Math.floor((diff / 1000) % 60);

          setCountdown(
            `${h.toString().padStart(2, "0")}:${m
              .toString()
              .padStart(2, "0")}:${s.toString().padStart(2, "0")}`,
          );
        } else {
          setCountdown("00:00:00");
        }
      }
    };

    updatePrayers();
    const interval = setInterval(updatePrayers, 1000);

    return () => clearInterval(interval);
  }, [prayerData]);

  return (
    <View className="p-5 mb-6">
      <View className="flex-row justify-between items-center">
        {/* Left Section */}
        <View className="flex-1">
          <View className="bg-slate-900 p-2 rounded-md self-start mb-4">
            <MaterialCommunityIcons
              name="bell-outline"
              size={18}
              color="white"
            />
          </View>

          <View className="flex-row items-center">
            {/* Current Prayer */}
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

            {/* Next Prayer */}
            <View>
              <Text className="text-gray-800 font-bold text-sm">
                {nextPrayerTime}
              </Text>
              <Text className="text-xl font-black text-black">
                {nextPrayer}
              </Text>
            </View>
          </View>
        </View>

        {/* Right Section */}
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
