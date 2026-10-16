export default function LoginForm({
    handleSubmit,
    handleChange,
    formData,
    loading
}) {

    return (
        <form className="
            space-y-5"
            onSubmit={handleSubmit}
        >
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
                autoComplete="current-password"
                required
            />
            {/* Login button */}
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
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    )
}
