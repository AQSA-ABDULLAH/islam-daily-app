import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DuaCard = () => {
  return (
    <View className="bg-[#2C2C2E] rounded-3xl p-5 mb-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-yellow-500 font-bold text-sm">
            Ayat of the Moment
          </Text>
          <Text className="text-gray-400 text-xs">
            Surat Ash-Shu'ara [26:111]
          </Text>
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="book-open-outline"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Arabic Ayah */}
      <Text className="text-white text-right text-xl leading-10 font-serif">
        قَالُوا أَنُؤْمِنُ لَكَ وَاتَّبَعَكَ الْأَرْذَلُونَ
      </Text>
    </View>
  );
};

export default DuaCard;
