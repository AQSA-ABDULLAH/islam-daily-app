// store/features/prayerSlice.ts
import { fetchPrayerTimes } from "@/lib/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrayerState {
  data: any;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: PrayerState = {
  data: null,
  status: "idle",
};

const prayerSlice = createSlice({
  name: "prayer",
  initialState,
  reducers: {
    // load cached prayer data from AsyncStorage
    loadPrayer(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.status = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrayerTimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrayerTimes.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchPrayerTimes.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { loadPrayer } = prayerSlice.actions;
export default prayerSlice.reducer;
