import axiosInstance from "../services/axiosInstance";

export const todoCreate = (data) => axiosInstance.post("/createTodo", data);
export const todoDelete = (id) => axiosInstance.delete(`/deleteTodo/${id}`);
export const todoGetOne = (id) => axiosInstance.get(`/getTodo/${id}`);
export const todoGetAll = () => axiosInstance.get("/getAllTodos");
export const todoUpdate = (id, data) => axiosInstance.put(`/updateTodo/${id}`, data);
