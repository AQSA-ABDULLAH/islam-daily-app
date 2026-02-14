import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const features = [
  {
    name: "Prayer Time",
    icon: "https://cdn-icons-png.flaticon.com/128/2693/2693507.png",
  },
  {
    name: "Al-Quran",
    icon: "https://cdn-icons-png.flaticon.com/128/2849/2849733.png",
  },
  {
    name: "Hadith",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504445.png",
  },
  {
    name: "Dua",
    icon: "https://cdn-icons-png.flaticon.com/128/3211/3211186.png",
  },
  {
    name: "Qibla",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504481.png",
  },
  {
    name: "Tasbih",
    icon: "https://cdn-icons-png.flaticon.com/128/2611/2611082.png",
  },
  {
    name: "Zakat",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504434.png",
  },
  {
    name: "Hijri",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504439.png",
  },
  {
    name: "Community",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504423.png",
  },
  {
    name: "Mosque",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504455.png",
  },
  {
    name: "Kitab",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504452.png",
  },
  {
    name: "Donate",
    icon: "https://cdn-icons-png.flaticon.com/128/3504/3504429.png",
  },
];

const FeaturesGrid = () => {
  return (
    <View className="flex-row flex-wrap justify-between px-2">
      {features.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="w-[23%] items-center mb-5"
          activeOpacity={0.7}
        >
          {/* Icon Container with specific image styling */}
          <View className="bg-gray-50/80 w-16 h-16 rounded-[24px] items-center justify-center mb-1.5 shadow-sm border border-gray-100/50">
            <Image
              source={{ uri: item.icon }}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>

          {/* Label */}
          <Text className="text-[11px] text-gray-700 font-medium text-center">
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FeaturesGrid;
