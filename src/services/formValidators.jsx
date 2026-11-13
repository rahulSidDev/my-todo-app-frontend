import zxcvbnReady from './zxcvbn'

const commonPasswords = [
    "123456",
    "admin",
    "12345678",
    "123456789",
    "12345",
    "password",
    "Aa123456",
    "1234567890",
    "Pass@123",
    "admin123",
    "1234567",
    "123123",
    "111111",
    "12345678910",
    "P@ssw0rd",
    "Password",
    "Aa@123456",
    "admintelecom",
    "Admin@123",
    "112233"
]

export function validateEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false
    }

    return true
}

export function validateConfirmPass (password, confirmPass) {
    if (
        password === confirmPass && 
        password !== '' && 
        confirmPass !== ''
    ) return true

    return false
}

export async function validatePassword (password) {
    const errors = [];

    if (typeof password !== "string") {
        return ["Password must be a string."];
    }

    if (password.length < 15) {
        errors.push(
            "Password is less than 15 characters long."
        );
    }

    if (password.length > 128) {
        errors.push(
            "Password is more than 128 characters."
        );
    }

    if (password.trim().length === 0) {
        errors.push(
            "Password cannot be whitespace only."
        );
    }

    if (commonPasswords.includes(password)) {
        errors.push(
            'Password is too generic.'
        )
    }

    const zxcvbn = await zxcvbnReady
    const result = zxcvbn.check(password)
    if (result.score < 4) {
        errors.push('Password does not have enough variety.')
    }

    return errors;
}