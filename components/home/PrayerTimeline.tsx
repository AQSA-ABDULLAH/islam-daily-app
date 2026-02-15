import { timeToMinutes, to12HourFormat } from "@/context/helper";
import { LocationContext } from "@/context/LocationContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

// Type for a single prayer
interface Prayer {
  name: string;
  time: string;
  isActive?: boolean;
}

// Typing the API response from Aladhan
interface TimingsResponse {
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
}

const PrayerTimeline: React.FC = () => {
  const { location } = useContext(LocationContext);
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    if (!location) return;

    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get<TimingsResponse>(
          "https://api.aladhan.com/v1/timings",
          {
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
              method: 4, // Pakistan calculation method
            },
          },
        );

        const { timings } = response.data.data;

        // Create array of prayers
        const todayPrayers: Prayer[] = [
          { name: "Fajr", time: timings.Fajr },
          { name: "Dhuhr", time: timings.Dhuhr },
          { name: "Asr", time: timings.Asr },
          { name: "Maghrib", time: timings.Maghrib },
          { name: "Isha", time: timings.Isha },
        ];

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // Determine active prayer and format time
        const updatedPrayers = todayPrayers.map((p, i) => {
          const prayerMinutes = timeToMinutes(p.time.split(" ")[0]);

          const nextPrayerIndex = todayPrayers.findIndex((pr) => {
            const prMinutes = timeToMinutes(pr.time.split(" ")[0]);
            return prMinutes > currentMinutes;
          });

          const isActive =
            i ===
            (nextPrayerIndex === -1
              ? todayPrayers.length - 1
              : nextPrayerIndex - 1);

          return {
            ...p,
            isActive,
            time: to12HourFormat(p.time.split(" ")[0]),
          };
        });

        setPrayers(updatedPrayers);
      } catch (error) {
        console.log("Prayer fetch error:", error);
      }
    };

    fetchPrayerTimes();
  }, [location]);

  return (
    <View className="bg-white py-4 border-b border-gray-100">
      <View className="flex-row justify-between px-2">
        {prayers.map((item, index) => (
          <View key={index} className="items-center flex-1">
            {/* Dot indicator */}
            <View
              className={`h-2.5 w-2.5 rounded-full mb-2 ${
                item.isActive ? "bg-[#006684]" : "bg-gray-300"
              }`}
            />

            {/* Prayer name */}
            <Text
              className={`text-[12px] mb-0.5 ${
                item.isActive
                  ? "font-bold text-black"
                  : "text-gray-600 font-medium"
              }`}
            >
              {item.name}
            </Text>

            {/* Prayer time */}
            <Text
              className={`text-[10px] ${
                item.isActive ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              {item.time}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PrayerTimeline;
