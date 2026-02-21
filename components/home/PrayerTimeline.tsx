import { timeToMinutes, to12HourFormat } from "@/lib/helper";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

interface Prayer {
  name: string;
  time: string;
  isActive?: boolean;
}

const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const PrayerTimeline: React.FC = () => {
  // Fetch all prayer times from Redux
  const prayerData = useSelector((state: any) => state.prayer.data?.timings);

  const prayers: Prayer[] = useMemo(() => {
    if (!prayerData) return [];

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Build array of prayers
    const todayPrayers: Prayer[] = prayerOrder.map((name) => ({
      name,
      time: prayerData[name] ?? "00:00",
    }));

    // Determine which prayer is active
    const nextPrayerIndex = todayPrayers.findIndex((pr) => {
      return timeToMinutes(pr.time) > currentMinutes;
    });

    return todayPrayers.map((p, i) => ({
      ...p,
      isActive:
        i ===
        (nextPrayerIndex === -1
          ? todayPrayers.length - 1
          : nextPrayerIndex - 1),
      time: to12HourFormat(p.time),
    }));
  }, [prayerData]);

  if (!prayers.length) {
    return (
      <View className="bg-white py-4 border-b border-gray-100 items-center">
        <Text className="text-gray-500">Loading prayer times...</Text>
      </View>
    );
  }

  return (
    <View className="bg-white py-4 border-b border-gray-100">
      <View className="flex-row justify-between px-2">
        {prayers.map((item, index) => (
          <View key={index} className="items-center flex-1">
            <View
              className={`h-2.5 w-2.5 rounded-full mb-2 ${
                item.isActive ? "bg-[#006684]" : "bg-gray-300"
              }`}
            />
            <Text
              className={`text-[12px] mb-0.5 ${
                item.isActive
                  ? "font-bold text-black"
                  : "text-gray-600 font-medium"
              }`}
            >
              {item.name}
            </Text>
            <Text
              className={`text-[10px] ${
                item.isActive ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              {item.time}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PrayerTimeline;
