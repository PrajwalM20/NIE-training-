import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const AuthToken = () => {
  const token = localStorage.getItem("access");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// LOGIN
export const LoginApi = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/token/`, {
    username,
    password,
  });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};

// REFRESH TOKEN
export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  try {
    const response = await axios.post(`${BASE_URL}/token/refresh/`, {
      refresh,
    });

    localStorage.setItem("access", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// INTERCEPTOR
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        original.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(original);
      } else {
        alert("Session expired. Please login again.");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

// ADD TRAINER
export const addtrainer = async (trainer) => {
  const response = await axios.post(`${BASE_URL}/trainer/`, trainer, {
    headers: AuthToken(),
  });
  return response.data;
};

// GET SINGLE TRAINER
export const getTrainer = async (id) => {
  const response = await axios.get(`${BASE_URL}/trainer/${id}`, {
    headers: AuthToken(),
  });
  return response.data;
};

// UPDATE TRAINER
export const updateTrainer = async (id, trainer) => {
  const response = await axios.put(`${BASE_URL}/trainer/${id}`, trainer, {
    headers: AuthToken(),
  });
  return response.data;
};

// DELETE TRAINER
export const deleteTrainer = async (id) => {
  const response = await axios.delete(`${BASE_URL}/trainer/${id}`, {
    headers: AuthToken(),
  });
  return response.data;
};

// SEARCH TRAINERS
export const searchTrainer = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${BASE_URL}/trainer/?${params}`, {
    headers: AuthToken(),
  });
  return response.data;
};
