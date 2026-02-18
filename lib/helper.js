// lib/helper.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Convert hours to minutes
 */
export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Convert "HH:MM" (24h to 12h) format with AM/PM
 */
export const to12HourFormat = (time24) => {
  const [hoursStr, minutes] = time24.split(":");
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

/**
 * Function to fetch prayer timings
 */
export const fetchPrayerTimes = createAsyncThunk(
  "prayer/fetchPrayerTimes",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    console.log("Fetching prayer times for:", latitude, longitude);
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${today}?latitude=${latitude}&longitude=${longitude}&method=2`,
      );
      console.log("Prayer times response:", response.data);
      return response.data.data; // the timings object
    } catch (err) {
      console.error("Prayer times error:", err.message);
      return rejectWithValue(err.message);
    }
  },
);
