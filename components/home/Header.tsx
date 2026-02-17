// components/home/Header.tsx
import { AppDispatch, RootState } from "@/store"; // make sure your store's RootState is exported
import { fetchVisitor } from "@/store/features/visitorSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const visitorState = useSelector((state: RootState) => state.visitor);
  const { data: visitorData } = visitorState;

  const [gregorianDate, setGregorianDate] = useState<string>("");
  const [hijriDate, setHijriDate] = useState<string>("");

  // Fetch visitor on mount
  useEffect(() => {
    if (!visitorData) {
      dispatch(fetchVisitor());
    }
  }, [dispatch, visitorData]);

  // Set Gregorian date
  useEffect(() => {
    const today = new Date();
    setGregorianDate(
      today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  // Fetch Hijri date when coords available
  useEffect(() => {
    if (!visitorData?.coords || !visitorData.coords.latitude) return;

    const { latitude, longitude } = visitorData.coords;

    fetch(
      `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`,
    )
      .then((res) => res.json())
      .then((res) => {
        const hijri = res.data.date.hijri;
        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
      })
      .catch((err) => console.error("Hijri fetch error:", err));
  }, [visitorData]);

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
          {visitorData?.cityName || "Detecting Location..."}
        </Text>
      </View>
    </View>
  );
};

export default Header;
