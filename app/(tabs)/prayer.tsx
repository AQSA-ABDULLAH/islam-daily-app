import PrayerHeader from "@/components/prayer-timing/PrayerHeader";
import PrayersTiming from "@/components/prayer-timing/PrayersTiming";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrayerScreen() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <PrayerHeader />
        <PrayersTiming />
      </ScrollView>
    </SafeAreaView>
  );
}
