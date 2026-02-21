import Dua from "@/components/dua/Dua";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DuaScreen() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Dua />
      </ScrollView>
    </SafeAreaView>
  );
}
