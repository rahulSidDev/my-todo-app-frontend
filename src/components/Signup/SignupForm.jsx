import PasswordReq from '../misc/PasswordReq'

export default function SignupForm({
    formData,
    formError,
    passMatch,
    handleChange,
    loading,
    handleSubmit
}) {
    return (
        <form className="
            space-y-5"
            onSubmit={handleSubmit}
            noValidate
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
            <PasswordReq />
            {/* Confirm Password */}
            <label className="
                block
                font-medium
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
                p-4
                text-gray-900"
                id="confirmPass"
                name="confirmPass"
                type="password"
                value={formData.confirmPass}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
            />
            {passMatch.text && (
                <p className={`
                    text-sm
                    ${
                        passMatch.isMatch ? 
                        'text-green-600' : 
                        'text-red-600'
                    }
                `}>
                    {passMatch.text}
                </p>
            )}
            {formError && (
                <p className="
                    text-sm
                    text-red-600"
                >
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
