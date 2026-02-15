import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DuaCard from "@/components/home/DuaCard";
import FastingCard from "@/components/home/FastingCard";
// import FeaturesGrid from "@/components/home/FeaturesGrid";
import Header from "@/components/home/Header";
import PrayerStatus from "@/components/home/PrayerStatus";
import PrayerTimeline from "@/components/home/PrayerTimeline";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <PrayerStatus />
        <FastingCard />
        <PrayerTimeline />
        {/* <FeaturesGrid /> */}
        <DuaCard />
      </ScrollView>
    </SafeAreaView>
  );
}
