import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Header = () => {
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    const today = new Date();

    // Gregorian Date
    const formattedGregorian = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setGregorianDate(formattedGregorian);

    // Hijri Date
    axios
      .get("https://api.aladhan.com/v1/timingsByCity", {
        params: {
          city: "Wah",
          country: "Pakistan",
          method: 4, // Umm al-Qura
        },
      })
      .then((res) => {
        const hijri = res.data.data.date.hijri;

        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
      })
      .catch((err) => {
        console.log("Hijri fetch error:", err);
      });
  }, []);

  return (
    <View className="flex-row justify-between items-center py-4 px-4">
      <View className="flex-row items-center">
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={32}
          color="#1E293B"
        />

        <View className="ml-3">
          <Text className="text-gray-900 font-semibold text-[15px]">
            {hijriDate || "Loading..."}
          </Text>

          <Text className="text-gray-500 text-[13px]">{gregorianDate}</Text>
        </View>
      </View>

      <View className="flex-1 items-end ml-4">
        <Text
          className="text-gray-800 font-bold text-[11px] tracking-[1px] uppercase"
          numberOfLines={2}
        >
          Wah, Pakistan
        </Text>
      </View>
    </View>
  );
};

export default Header;
