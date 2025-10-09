// api/setupInterceptors.ts
import { axiosInstance } from "../lib/utils";
import { generateAccess } from "./userService";
export const setupInterceptors = (
  getAccessToken: () => string | null,
  setAccessToken: (token: string | null) => void,
  logout: () => void
) => {

  // Attach access token to requests
  axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401 errors by refreshing token
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          //  Request new access token (refresh cookie is sent automatically)
          const res = await generateAccess();
          const newAccessToken = res.access_token;

          setAccessToken(newAccessToken);

          // Retry the failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh failed:", refreshError);
          logout(); // clear state, redirect to login if needed
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
