import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import FeaturesGrid from "@/components/home/FeaturesGrid";
import FastingCard from "@/components/home/FastingCard";
import Header from "@/components/home/Header";
import PrayerStatus from "@/components/home/PrayerStatus";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <PrayerStatus />
        <FastingCard />
        {/* <PrayerTimeline />
        <DuaCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
