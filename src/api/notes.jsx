import axiosInstance from "../services/axiosInstance";

export const todoCreate = (data) => axiosInstance.post(
    "/note", 
    data
);

export const todoDeleteOne = (id) => axiosInstance.delete(
    `/note/${id}`
);

export const todoDeleteAll = () => axiosInstance.delete(
    `/note`
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

export const noteGetTrashed = () => axiosInstance.get(
    '/note/trashed'
)

export const noteMoveToTrash = (id) => axiosInstance.patch(
    `/note/trash/${id}`
)

export const noteRestore = (id) => axiosInstance.patch(
    `/note/restore/${id}`
)

export const noteCheckCheckbox = (id, data) => axiosInstance.patch(
    `/note/checkbox/${id}`,
    data
)