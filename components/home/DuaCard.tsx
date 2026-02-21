import duas from "@/components/data/duas.json"; // path to your JSON
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DuaCard: React.FC = () => {
  const todayDua = useMemo(() => {
    const today = new Date();
    // Use day of year to cycle through duas
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Cycle through duas based on day of year
    const index = dayOfYear % duas.length;
    return duas[index];
  }, []);

  return (
    <View className="border-1 rounded-3xl p-5 mb-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-yellow-500 font-bold text-sm">
            Dua of the Day
          </Text>
          <Text className="text-gray-400 text-xs">Reference of dua</Text>
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
      <Text className="text-right text-xl leading-10 font-serif">
        {todayDua.arabic}
      </Text>

      {/* Translation */}
      <Text className="text-right text-xl leading-10 font-serif">
        {todayDua.translation}
      </Text>
    </View>
  );
};

export default DuaCard;
