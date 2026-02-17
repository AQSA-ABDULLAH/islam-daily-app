// store/features/visitorSlice.tsx

import { getVisitor } from "@/lib/visitorHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface VisitorState {
  data: any;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: VisitorState = {
  data: null,
  status: "idle",
};

// Async thunk to fetch/send visitor using your helper
export const fetchVisitor = createAsyncThunk(
  "visitor/fetchVisitor",
  async (_, { rejectWithValue }) => {
    try {
      const visitorData = await getVisitor(); // uses /lib/visitorHelper.js
      // Save locally
      await AsyncStorage.setItem("visitor_data", JSON.stringify(visitorData));
      return visitorData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    loadVisitor: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVisitor.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchVisitor.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { loadVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
