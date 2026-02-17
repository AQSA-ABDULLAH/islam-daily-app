import axios from "axios";
import axiosRetry from "axios-retry";

export const request_lamda = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(request_lamda, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Wait 1 second before retrying
  },
  retryCondition: (error) => {
    return (
      error.response.status === 502 || // Retry on 502 Bad Gateway
      error.response.status === 503 || // Retry on 503 Service Unavailable
      error.response.status === 504 // Retry on 504 Gateway Timeout
    );
  },
});
