import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Icons Data Array taake code lamba na ho
const features = [
  { name: "Prayer Time", icon: "clock-outline", type: "material" },
  { name: "Al-Quran", icon: "book-open-variant", type: "material" },
  { name: "Hadith", icon: "book-open", type: "font-awesome" },
  { name: "Dua", icon: "hands", type: "font-awesome-5" },
  { name: "Qibla", icon: "kaaba", type: "font-awesome-5" },
  { name: "Tasbih", icon: "prayer-beads", type: "font-awesome-6" },
  { name: "Zakat", icon: "hand-holding-heart", type: "font-awesome-5" },
  { name: "Hijri", icon: "calendar-month", type: "material" },
  { name: "Community", icon: "account-group", type: "material" },
  { name: "Mosque", icon: "mosque", type: "font-awesome-5" },
  { name: "Kitab", icon: "book", type: "font-awesome-5" },
  { name: "Donate", icon: "heart", type: "font-awesome" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* --- Top Prayer Timeline --- */}
        <View className="flex-row justify-between py-6 border-b border-gray-100 mb-4">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((p, i) => (
            <View key={i} className="items-center">
              <View
                className={`h-2 w-2 rounded-full mb-1 ${p === "Asr" ? "bg-teal-600" : "bg-gray-300"}`}
              />
              <Text
                className={`text-[10px] ${p === "Asr" ? "font-bold text-black" : "text-gray-400"}`}
              >
                {p}
              </Text>
              <Text className="text-[10px] text-gray-400">
                {p === "Asr" ? "4:02 PM" : "..."}
              </Text>
            </View>
          ))}
        </View>

        {/* --- Features Grid --- */}
        <View className="flex-row flex-wrap justify-between">
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="w-[23%] aspect-square items-center justify-center mb-6"
            >
              <View className="bg-blue-50/50 p-3 rounded-2xl mb-1 items-center justify-center w-14 h-14">
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={26}
                  color="#4A90E2"
                />
              </View>
              <Text className="text-[11px] text-center text-gray-700 font-medium">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Ayat of the Moment Card --- */}
        <View className="bg-[#2C2C2E] rounded-3xl p-5 mb-10">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-yellow-500 font-bold text-sm">
                Ayat of the Moment
              </Text>
              <Text className="text-gray-400 text-xs">
                Surat-us-Shooaraa [26-111]
              </Text>
            </View>
            <View className="flex-row gap-4">
              <MaterialCommunityIcons
                name="share-variant"
                size={20}
                color="white"
              />
              <MaterialCommunityIcons
                name="book-open-outline"
                size={20}
                color="white"
              />
            </View>
          </View>

          <Text className="text-white text-right text-xl leading-10 font-serif">
            قَالُوا أَنُؤْمِنُ لَكَ وَاتَّبَعَكَ الْأَرْذَلُونَ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
