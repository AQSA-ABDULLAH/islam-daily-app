import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center py-4 bg-white">
      {/* Left Side: Calendar Icon and Date */}
      <View className="flex-row items-center">
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={32}
          color="#1E293B"
        />
        <View className="ml-3">
          <Text className="text-gray-900 font-semibold text-[15px]">
            Sha'ban 13, 1447
          </Text>
          <Text className="text-gray-500 text-[13px]">February 1, 2026</Text>
        </View>
      </View>

      {/* Right Side: Location Text */}
      <View className="flex-1 items-end ml-4">
        <Text
          className="text-gray-800 font-bold text-[11px] tracking-[1px] text-right uppercase"
          numberOfLines={2}
        >
          Wah, Punjab, Pakistan
        </Text>
      </View>
    </View>
  );
};

export default Header;
