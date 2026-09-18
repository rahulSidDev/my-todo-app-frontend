import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SignupForm({
    error,
    setError,
    errorTimer,
    setErrorTimer,
    formData,
    setFormData,
    loading,
    setLoading,
    handleSubmit
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

    function handleChange(event) {
        setFormData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <>
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
            {/* Name */}
            <label className="
            block
            font-medium
            mb-2"
            htmlFor="email"
            >
                Name
            </label>
            <input className="
            w-full
            rounded-md
            border
            border-gray-300
            px-4
            py-4
            text-gray-900"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            />
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
            required
            />
            {/* Password */}
            <label className="
            block
            font-medium
            text-gray-700
            mb-2"
            htmlFor="password"
            >
                Password
            </label>
            <input className="
            w-full
            rounded-md
            border
            border-gray-300
            px-4
            py-4
            text-gray-900"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            />
            {/* Confirm Password */}
            <label className="
            block
            font-medium
            text-gray-700
            mb-2"
            htmlFor="password"
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
            id="confirmPass"
            name="confirmPass"
            type="password"
            value={formData.confirmPass}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
            />
            {/* Signup button */}
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
                {loading ? "Signing up..." : "Signup"}
            </button>
        </form>
        {/* Sign up */}
        <div className="
        mt-5
        text-center
        text-sm
        text-gray-600
        ">
            Already have an account?{" "}
            <Link className="
            font-semibold
            text-blue-950
            hover:underline
            hover:decoration-2
            underline-offset-4"
            to="/login"
            >
                Login
            </Link>
        </div>
        </>
    );
}
