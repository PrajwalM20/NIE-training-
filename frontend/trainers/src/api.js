// src/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";
const api = axios.create({ baseURL: API_URL });

// Attach access token
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) config.headers.Authorization = `Bearer ${access}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// Refresh helper
async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token");
  const resp = await axios.post(`${API_URL}token/refresh/`, { refresh });
  const newAccess = resp.data.access;
  localStorage.setItem("access", newAccess);
  return newAccess;
}

// Response interceptor: try refresh on 401 once
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response && error.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const newAccess = await refreshToken();
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// APIs
export const loginUser = (data) => api.post("token/", data);
export const getTrainers = (params) => api.get("trainer/", { params });
export const getTrainer = (id) => api.get(`trainer/${id}/`);
export const addTrainer = (trainer) => api.post("trainer/", trainer);
export const updateTrainer = (id, trainer) => api.put(`trainer/${id}/`, trainer);
export const deleteTrainer = (id) => api.delete(`trainer/${id}/`);

// ✔ FIXED: Correct Stats API
export const getTrainerStats = () => api.get("stats/");

export default api;
