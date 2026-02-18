// components/startup/VisitorUser.jsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrayerTimes } from "../../store/features/prayerSlice";
import { fetchVisitor, loadVisitor } from "../../store/features/visitorSlice";

function VisitorUser({ setLoading }) {
  const dispatch = useDispatch();
  const { status: visitorStatus = "idle", data: visitorData } = useSelector(
    (state) => state.visitor || {},
  );
  const { status: prayerStatus } = useSelector((state) => state.prayer || {});

  // Load visitor from AsyncStorage or API
  useEffect(() => {
    const checkVisitor = async () => {
      const localVisitor = await AsyncStorage.getItem("visitor_data");

      if (!localVisitor) {
        dispatch(fetchVisitor());
      } else {
        dispatch(loadVisitor(JSON.parse(localVisitor)));
      }
    };

    checkVisitor();
  }, [dispatch]);

  // Once visitor data is ready, fetch prayer times
  useEffect(() => {
    const fetchPrayerForVisitor = async () => {
      if (visitorStatus === "success" && visitorData) {
        const latitude = visitorData.latitude ?? visitorData.coords?.latitude;
        const longitude =
          visitorData.longitude ?? visitorData.coords?.longitude;

        if (!latitude || !longitude) {
          console.warn("No coordinates found for visitor!");
          setLoading(false);
          return;
        }

        // Try loading cached prayer data first
        const cachedPrayer = await AsyncStorage.getItem("prayer_data");
        if (cachedPrayer) {
          dispatch({
            type: "prayer/loadPrayer",
            payload: JSON.parse(cachedPrayer),
          });
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const resultAction = await dispatch(
          fetchPrayerTimes({ latitude, longitude }),
        );
        if (fetchPrayerTimes.fulfilled.match(resultAction)) {
          await AsyncStorage.setItem(
            "prayer_data",
            JSON.stringify(resultAction.payload),
          );
        }

        setLoading(false);
      }
    };

    fetchPrayerForVisitor();
  }, [visitorStatus, visitorData, dispatch, setLoading]);

  return null;
}

export default VisitorUser;
