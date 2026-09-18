import { useState, useEffect } from "react"

export default function ForgotPassForm({
    error,
    setError,
    formData,
    setFormData,
    handleSubmit,
    errorTimer,
    setErrorTimer,
    loading,
    setLoading
}) {
    useEffect(() => {
        if (!error) return;
        if (errorTimer <= 0) {
            setError('')
            return
        }
        const timer = setTimeout(() => {
            setErrorTimer((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [error, errorTimer]);

    const handleChange = (event) => {
        setFormData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <form className="
        space-y-5"
        onSubmit={handleSubmit}
        noValidate
        >
            {/* Error */}
            {error && (<div className="
            rounded-md
            bg-red-50
            border
            border-red-200
            px-5
            py-5
            text-sm
            text-red-600
            ">
                {error} ({errorTimer}s)
            </div>
            )}
            {/* Email */}
            <label className="
            block
            font-medium
            mb-2"
            htmlFor="email"
            >
                Email
            </label>
            <input className="
            w-full
            rounded-md
            border
            border-gray-300
            px-4
            py-4
            text-gray-900"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
            />
            {/* New Password */}
            <label className="
            block
            font-medium
            mb-2"
            htmlFor="new-password"
            >
                New Password
            </label>
            <input className="
            w-full
            rounded-md
            border
            border-gray-300
            px-4
            py-4
            text-gray-900"
            id="new-password"
            name="newPass"
            type="password"
            value={formData.newPass}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
            />
            {/* Confirm New Password */}
            <label className="
            block
            font-medium
            mb-2"
            htmlFor="confirm-new-password"
            >
                Confirm Password
            </label>
            <input className="
            w-full
            rounded-md
            border
            border-gray-300
            px-4
            py-4
            text-gray-900"
            id="confirm-new-password"
            name="confirmNewPass"
            type="password"
            value={formData.confirmNewPass}
            onChange={handleChange}
            placeholder="Re-Enter your new password"
            required
            />
            {/* Verify button */}
            <button className="
            w-full
            rounded-md
            bg-blue-950
            px-4
            py-4
            font-semibold
            text-white
            transition
            hover:bg-blue-900
            disabled:cursor-not-allowed
            disabled:opacity-60"
            type="submit"
            disabled={loading}
            >
                {loading ? "Verifying..." : "Verify"}
            </button>
        </form>
    )
}