import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { IconSymbol } from "@/components/ui/icon-symbol";
import PrayerIcon from "../../assets/tabs/calendar-clock.svg";
import CompassIcon from "../../assets/tabs/compass.svg";
import DuaIcon from "../../assets/tabs/hand-helping.svg";
import SettingsIcon from "../../assets/tabs/settings.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="qiblah"
        options={{
          title: "Qiblah",
          tabBarIcon: ({ color }) => (
            <CompassIcon width={28} height={28} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="prayer"
        options={{
          title: "Prayer",
          tabBarIcon: ({ color }) => (
            <PrayerIcon width={28} height={28} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="dua"
        options={{
          title: "Dua",
          tabBarIcon: ({ color }) => (
            <DuaIcon width={28} height={28} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SettingsIcon width={28} height={28} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
