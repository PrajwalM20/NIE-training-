import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

// LOGIN API
export const LoginApi = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/token/`, {
        username,
        password,
    });
    return response.data;
};

// AUTH TOKEN HEADER
export const AuthToken = () => {
    const token = localStorage.getItem("access");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ADD TRAINER
export const addtrainer = async (trainer) => {
    const response = await axios.post(`${BASE_URL}/trainer/`, trainer, {
        headers: AuthToken(),
    });
    return response.data;
};

// SEARCH TRAINER
export const searchTrainer = async (filter = {}) => {
    const params = new URLSearchParams(filter).toString();
    const response = await axios.get(`${BASE_URL}/trainer/?${params}`, {
        headers: AuthToken(),
    });
    return response.data;
};

// UPDATE TRAINER
export const updateTrainer = async (id, trainer) => {
    const response = await axios.put(`${BASE_URL}/trainer/${id}/`, trainer, {
        headers: AuthToken(),
    });
    return response.data;
};

// DELETE TRAINER
export const deleteTrainer = async (id) => {
    const response = await axios.delete(`${BASE_URL}/trainer/${id}/`, {
        headers: AuthToken(),
    });
    return response.data;
};
