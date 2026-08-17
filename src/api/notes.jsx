import axiosInstance from "../services/axiosInstance";

export const noteCreate = (data) => axiosInstance.post(
    "/note", 
    data
);

export const noteDeleteOne = (id) => axiosInstance.delete(
    `/note/${id}`
);
export const noteDeleteAll = () => axiosInstance.delete(
    `/note`
);

export const noteUpdate = (id, data) => axiosInstance.put(
    `/note/${id}`, 
    data
);

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
export const noteReorder = (data) => axiosInstance.patch(
    '/note/reorder',
    data
)

export const noteGetOne = (id) => axiosInstance.get(
    `/note/${id}`
);
export const noteGetAll = () => axiosInstance.get(
    "/note"
);
export const noteGetTrashed = () => axiosInstance.get(
    '/note/trashed'
)
export const noteSearch = (search) => axiosInstance.get(
    '/note',
    {params: {search}}
)
