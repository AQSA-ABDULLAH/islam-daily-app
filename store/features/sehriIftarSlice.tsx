// store/features/sehriIftarSlice.ts
import { fetchSehriIftarTimes } from "@/lib/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SehriIftarState {
  data: { sehri: string; iftar: string } | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: SehriIftarState = {
  data: null,
  status: "idle",
};

const sehriIftarSlice = createSlice({
  name: "sehriIftar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSehriIftarTimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSehriIftarTimes.fulfilled,
        (state, action: PayloadAction<{ sehri: string; iftar: string }>) => {
          state.status = "success";
          state.data = action.payload;
        },
      )
      .addCase(fetchSehriIftarTimes.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default sehriIftarSlice.reducer;
