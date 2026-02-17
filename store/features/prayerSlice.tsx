import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrayerState {
  currentPrayer: string;
  countdown: string;
  times: Record<string, string>; // Fajr, Dhuhr, etc.
}

const initialState: PrayerState = {
  currentPrayer: "",
  countdown: "00:00:00",
  times: {},
};

const prayerSlice = createSlice({
  name: "prayer",
  initialState,
  reducers: {
    setCurrentPrayer: (state, action: PayloadAction<string>) => {
      state.currentPrayer = action.payload;
    },
    setCountdown: (state, action: PayloadAction<string>) => {
      state.countdown = action.payload;
    },
    setPrayerTimes: (state, action: PayloadAction<Record<string, string>>) => {
      state.times = action.payload;
    },
  },
});

export const { setCurrentPrayer, setCountdown, setPrayerTimes } =
  prayerSlice.actions;
export default prayerSlice.reducer;
