import axiosInstance from "../services/axiosInstance";

export const userProfile = () => axiosInstance.get(
    "/user"
);

export const userSignup = (data) => axiosInstance.post(
    "/user/signup", 
    data
);

export const userLogin = (data) => axiosInstance.post(
    "/user/login", 
    data
);

export const userOtp = (data) => axiosInstance.post(
    "/user/send-otp", 
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
    "/user/forgot-password/send-otp", 
    data
);

export const userLogout = (data) => axiosInstance.post(
    "/user/logout", 
    data
);

export const userDelete = (data) => axiosInstance.delete(
    '/user',
    { 
        data: data 
    }
)

export const userUpdate = (data) => axiosInstance.put(
    '/user',
    data
)