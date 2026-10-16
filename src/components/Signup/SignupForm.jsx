import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SignupForm({
    formData,
    formError,
    handleChange,
    loading,
    handleSubmit
}) {
    return (
        <form className="
            space-y-5"
            onSubmit={handleSubmit}
        >
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
            {formError && (
                <p className="mt-2 text-sm text-red-600">
                    {formError}
                </p>
            )}
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
    );
}
