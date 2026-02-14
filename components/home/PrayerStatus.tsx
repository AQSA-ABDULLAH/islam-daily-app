import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PrayerStatus = () => {
  return (
    <View className="p-5 mb-6">
      {/* Header: Hijri Date and Location */}
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={26}
            color="#1E293B"
          />
          <View className="ml-3">
            <Text className="text-gray-800 font-semibold text-sm">
              Sha'ban 13, 1447
            </Text>
            <Text className="text-gray-500 text-xs">February 1, 2026</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-gray-800 font-bold text-[10px] tracking-widest uppercase">
            Wah, Punjab, Pakistan
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-row justify-between items-center">
        {/* Prayer Info */}
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
              <Text className="text-xl font-black text-black">ASR</Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-right"
              size={22}
              color="#1E293B"
              style={{ marginHorizontal: 16 }}
            />

            {/* Next Prayer */}
            <View>
              <Text className="text-gray-800 font-bold text-sm">5:40 PM</Text>
              <Text className="text-xl font-black text-black">MAGHRIB</Text>
            </View>
          </View>
        </View>

        {/* Countdown Section */}
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
                00:45:12
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
