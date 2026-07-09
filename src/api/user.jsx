import axiosInstance from '../services/axiosInstance'

export const userProfile = () => axiosInstance.get('/user/profile')

export const userSignup = (data) => axiosInstance.post('/user/signup', data)
export const userLogin = (data) => axiosInstance.post('/user/login', data)
export const userOtp = (data) => axiosInstance.post('/user/otp', data)
export const userResetPassword = (data) => axiosInstance.post('/user/reset-password', data)
export const userForgotPassword = (data) => axiosInstance.post('/user/forgot-password', data)
export const userForgotPasswordReset = (data) => axiosInstance.post('/user/forgot-password-reset', data)
export const userForgotPasswordOtp = (data) => axiosInstance.post('/user/forgot-password-otp', data)
export const userLogout = (data) => axiosInstance.post('/user/logout', data)

