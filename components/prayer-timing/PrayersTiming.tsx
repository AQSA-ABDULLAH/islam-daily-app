import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function PrayersTiming() {
  return (
    <View className="flex-1 bg-white text-black pt-12">
      {/* --- Prayer List --- */}
      <ScrollView className="px-4">
        <PrayerRow
          name="Fajr"
          time="5:22 AM - 6:52 AM"
          icon="cloudy-night-outline"
        />
        <PrayerRow
          name="Sunrise"
          time="6:53 AM"
          icon="sunny-outline"
          highlight
        />
        <PrayerRow name="Dhuhr" time="12:24 PM - 3:29 PM" icon="sunny" />
        <PrayerRow
          name="Asr (Shafi)"
          time="3:30 PM - 5:39 PM"
          icon="cloud-outline"
        />
        <PrayerRow
          name="Maghrib"
          time="5:40 PM - 5:54 PM"
          icon="sunny-outline"
        />
        <PrayerRow name="sunset" time="5:54 PM" icon="sunny-outline" />
        <PrayerRow name="Isha" time="5:55 PM - 6:20 PM" icon="moon-outline" />
      </ScrollView>
    </View>
  );
}

// Reusable Row Component
const PrayerRow = ({ name, time, icon, highlight }: any) => (
  <View
    className={`flex-row justify-between items-center py-4 border-b border-[#222] ${
      highlight ? "bg-[#1A2344]  rounded-lg px-3" : ""
    }`}
  >
    <View className="flex-row items-center">
      <Ionicons name={icon} size={22} color={highlight ? "#fff" : "#aaa"} />
      <Text
        className={`ml-4 text-[15px] ${
          highlight ? "text-white" : "text-black"
        }`}
      >
        {name}
      </Text>
    </View>

    <Text className={`text-sm ${highlight ? "text-black" : "text-[#ccc]"}`}>
      {time}
    </Text>
  </View>
);
