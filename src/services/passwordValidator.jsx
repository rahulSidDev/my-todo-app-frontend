export default function passwordValidator (password) {
    const errors = [];

    if (typeof password !== "string") {
        return ["Password must be a string."];
    }

    if (password.length < 15) {
        errors.push(
            "Password must be at least 15 characters long."
        );
    }

    if (password.length > 128) {
        errors.push(
            "Password must not exceed 128 characters."
        );
    }

    if (password.trim().length === 0) {
        errors.push(
            "Password cannot be empty or whitespace only."
        );
    }

    return errors;
}