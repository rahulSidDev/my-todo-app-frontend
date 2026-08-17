import axiosInstance from "../services/axiosInstance";

export const userLogin = (data) => axiosInstance.post(
    "/user/login", 
    data
);
export const userSignup = (data) => axiosInstance.post(
    "/user/signup", 
    data
);
export const userOtp = (data) => axiosInstance.post(
    "/user/signup/verify", 
    data
);
export const userChangePassword = (data) => axiosInstance.post(
    "/user/change-password", 
    data
);
export const userForgotPassword = (data) => axiosInstance.post(
    "/user/forgot-password", 
    data
);
export const userForgotPassOtp = (data) => axiosInstance.post(
    "/user/forgot-password/verify", 
    data
);
export const userUpdateEmailOtp = (data) => axiosInstance.post(
    "/user/email/verify", 
    data
);
export const userLogout = (data) => axiosInstance.post(
    "/user/logout", 
    data
);

export const userProfile = () => axiosInstance.get(
    "/user"
);

export const userUpdatePreferences = (data) => axiosInstance.patch(
    '/user/preferences',
    data
)
export const userUpdateEmail = (data) => axiosInstance.patch(
    '/user/email',
    data
)

export const userDelete = (data) => axiosInstance.delete(
    '/user',
    {data: data}
)
