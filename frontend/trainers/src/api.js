import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

api.interceptors.response.use((res) => res, async (err) => {
  const original = err.config;
  if (err.response && err.response.status === 401 && !original._retry) {
    original._retry = true;
    try {
      const refresh = localStorage.getItem("refresh");
      const r = await axios.post(BASE_URL + "token/refresh/", { refresh });
      localStorage.setItem("access", r.data.access);
      return api(original);
    } catch (e) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }
  return Promise.reject(err);
});

// helper exports
export const addTrainer = (data) => api.post("trainer/", data);
export const getTrainers = (params) => api.get("trainer/", { params });
export const getTrainer = (id) => api.get(`trainer/${id}/`);
export const updateTrainer = (id, data) => api.put(`trainer/${id}/`, data);
export const deleteTrainer = (id) => api.delete(`trainer/${id}/`);

export default api;
