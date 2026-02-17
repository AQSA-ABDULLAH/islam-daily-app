// lib/helper.js

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
 * Function to get all prayer and sun times
 */
export const getPrayerTimes = () => {
  const times = {
    Fajr: "05:00",
    Sunrise: "06:15",
    Dhuhr: "12:30",
    Asr: "16:00",
    Maghrib: "18:45",
    Isha: "20:00",
    Sunset: "18:45",
  };

  const formattedTimes = Object.fromEntries(
    Object.entries(times).map(([key, time]) => [key, to12HourFormat(time)]),
  );

  return formattedTimes;
};
