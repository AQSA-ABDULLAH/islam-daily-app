import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const FastingCard = () => {
  return (
    <View className="bg-[#F8F9FA] border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center mb-6">
      {/* Left Side: Label */}
      <Text className="text-blue-500 font-medium text-sm">
        Voluntary Fasting?
      </Text>

      {/* Right Side: Timings */}
      <View className="flex-row items-center gap-x-4">
        {/* Sehri Section */}
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="weather-sunny"
            size={16}
            color="#4B5563"
          />
          <Text className="ml-1 text-gray-700 text-xs font-semibold">
            Sehri: <Text className="font-bold">05:54</Text>
          </Text>
        </View>

        {/* Iftar Section */}
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="moon-waning-crescent"
            size={16}
            color="#4B5563"
          />
          <Text className="ml-1 text-gray-700 text-xs font-semibold">
            Iftar: <Text className="font-bold">17:39</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FastingCard;
