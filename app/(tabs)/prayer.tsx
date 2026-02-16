import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PrayerScreen() {
  return (
    <View className="flex-1 bg-white text-black pt-12">
      {/* --- Header Section --- */}

      <View className="p-5 items-center">
        <Text className=" text-[#666] text-[12px] mb-8">
          QPGQ+WJC, Wah, Punjab, Pakistan
        </Text>
        <View className="flex-row items-center justify-between w-full mb-4">
          {/* Sunrise */}
          <View className="items-center">
            <Text className=" text-xs mb-1">Sunrise</Text>
            <Ionicons name="sunny-outline" size={24} color="#000" />
            <Text className="text-[13px] mt-1">06:53 am</Text>
          </View>

          {/* Center Info */}
          <View className="items-center flex-1">
            <Text className="font-bold my-1">SHAFI</Text>
            <Text className=" my-[2px]">Now: Fajir time</Text>
            <Text className="font-bold">(Started from 15:27 AM)</Text>

            <View className="w-[60%] border-dashed border-[0.5px] border-[#555] my-1" />
            <Text className=" my-[2px]">Next: Sunrise time</Text>
            <Text className="font-bold">(Starts to 15:27 AM)</Text>
          </View>

          {/* Sunset */}
          <View className="items-center">
            <Text className="text-xs mb-1">Sunset</Text>
            <Ionicons name="sunny" size={24} color="#000" />
            <Text className="t text-[13px] mt-1">05:54 pm</Text>
          </View>
        </View>
      </View>

      {/* --- Date Selector --- */}
      <View className="flex-row justify-between items-center bg-[#252f39] mx-4 my-4 p-3 rounded-xl">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-white font-bold">16 Feb, 2026</Text>
          <Text className="text-[#aaa] text-xs">28 Sha'aban 1447</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

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
