import React from "react";
import { Text, View } from "react-native";

const prayers = [
  { name: "Fajr", time: "5:40 AM" },
  { name: "Dhuhr", time: "12:24 PM" },
  { name: "Asr", time: "4:02 PM", isActive: true },
  { name: "Maghrib", time: "5:40 PM" },
  { name: "Isha", time: "7:05 PM" },
];

const PrayerTimeline = () => {
  return (
    <View className="bg-white py-4 border-b border-gray-100">
      <View className="flex-row justify-between px-2">
        {prayers.map((item, index) => (
          <View key={index} className="items-center flex-1">
            {/* Dot Indicator */}
            <View
              className={`h-2.5 w-2.5 rounded-full mb-2 ${
                item.isActive ? "bg-[#006684]" : "bg-gray-300"
              }`}
            />

            {/* Prayer Name */}
            <Text
              className={`text-[12px] mb-0.5 ${
                item.isActive
                  ? "font-bold text-black"
                  : "text-gray-500 font-medium"
              }`}
            >
              {item.name}
            </Text>

            {/* Prayer Time */}
            <Text
              className={`text-[10px] ${
                item.isActive ? "font-bold text-black" : "text-gray-400"
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
