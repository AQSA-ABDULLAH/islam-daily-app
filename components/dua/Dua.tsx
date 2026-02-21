import React from "react";
import { ScrollView, Text, View } from "react-native";
import duas from "../data/duas.json";

const Dua: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-black px-5 py-6">
      {duas.map((dua) => (
        <View
          key={dua.id}
          className="w-full border-2 border-blue-500 rounded-3xl p-6 mb-6"
        >
          {/* Title */}
          <Text className="text-center text-lg font-bold text-blue-400 mb-6">
            {dua.title}
          </Text>

          {/* Arabic */}
          <Text className="text-right text-2xl leading-10 text-white mb-4">
            {dua.arabic}
          </Text>

          {/* Translation */}
          <Text className="text-right text-base text-gray-300">
            {dua.translation}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Dua;
