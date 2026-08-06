import axiosInstance from "../services/axiosInstance";

export const todoCreate = (data) => axiosInstance.post(
    "/note", 
    data
);

export const todoDelete = (id) => axiosInstance.delete(
    `/note/${id}`
);

export const todoGetOne = (id) => axiosInstance.get(
    `/note/${id}`
);

export const todoGetAll = () => axiosInstance.get(
    "/note"
);

export const todoUpdate = (id, data) => axiosInstance.put(
    `/note/${id}`, 
    data
);