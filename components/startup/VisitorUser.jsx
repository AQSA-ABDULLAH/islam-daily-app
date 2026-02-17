//components/startup/VisitorUser.jsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisitor, loadVisitor } from "../../store/features/visitorSlice";

function VisitorUser({ setLoading }) {
  const dispatch = useDispatch();
  const { status: visitorStatus = "idle" } = useSelector(
    (state) => state.visitor || {},
  );

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

  useEffect(() => {
    if (visitorStatus === "success") {
      setLoading(false);
    }
  }, [visitorStatus, setLoading]);

  return null;
}

export default VisitorUser;
