//lib/visitorHelper.js

import { v4 as uuidv4 } from "uuid";
import { request_lamda } from "./services";

const getPlatform = async () => {
  let platform = navigator.platform || "unknown";

  if (navigator.userAgentData?.platform === "Windows") {
    try {
      const ua = await navigator.userAgentData.getHighEntropyValues([
        "platformVersion",
      ]);
      const major = parseInt(ua.platformVersion.split(".")[0], 10);
      if (major >= 13) platform = "Windows 11";
    } catch (e) {}
  }

  return platform;
};

export const getVisitor = async () => {
  try {
    let visitor_id = localStorage.getItem("visitor_id");
    if (!visitor_id) {
      visitor_id = uuidv4();
      localStorage.setItem("visitor_id", visitor_id);
    }

    const platform = await getPlatform();

    // Try to get location first
    const getLocation = () =>
      new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }),
          () => resolve({ latitude: null, longitude: null }), // fallback
        );
      });

    const { latitude, longitude } = await getLocation();

    // Send all info at once
    const response = await request_lamda.post("/api/visitors", {
      visitor_id,
      platform,
      latitude,
      longitude,
    });

    const visitorData = response.data.visitor_data;

    // Save in AsyncStorage or localStorage for Redux
    localStorage.setItem("visitor_data", JSON.stringify(visitorData));

    return visitorData;
  } catch (e) {
    console.error("Visitor error:", e.message);
    throw e;
  }
};
