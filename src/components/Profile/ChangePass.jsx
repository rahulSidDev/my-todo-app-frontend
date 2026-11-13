import { BsFillExclamationCircleFill } from "react-icons/bs";
import PasswordReq from '../../components/misc/PasswordReq'
import { validateConfirmPass } from '../../services/formValidators'
import { useState } from "react";

export default function ChangePass({
    password,
    setPassword,
    handleSubmit,
    passMatch,
    setPassMatch,
    formError
}) {
    return (
        <div className="
            bg-white
            border
            border-slate-300
            rounded-md
            p-5
            text-blue-950"
        >
            <h2 className="
                text-2xl
                font-bold
                mb-2"
            >
                Change Password
            </h2>
            <p className="
                text-slate-600 
                mb-2
                gap-2
                flex"
            >
                <BsFillExclamationCircleFill 
                    className="shrink-0 mt-1" 
                    size={15}
                />
                Changing your password will require you to log in again.
            </p>
            <form className="space-y-4"
                onSubmit={handleSubmit}
                noValidate
            >
                <label>Current Password:</label>
                <input className="
                    w-full
                    border
                    rounded-md
                    p-2"
                    type="password"
                    required
                    value={password.password}
                    onChange={(e) =>
                        setPassword({
                            ...password,
                            password: e.target.value
                        })
                    }
                />
                <label>New Password:</label>
                <input className="
                    w-full
                    border
                    rounded-md
                    p-2"
                    required
                    type="password"
                    value={password.newPass}
                    onChange={(e) =>
                        setPassword({
                            ...password,
                            newPass: e.target.value
                        })
                    }
                />
                <PasswordReq />
                <label>Confirm New Password:</label>
                <input className="
                    w-full
                    border
                    rounded-md
                    p-2"
                    required
                    type="password"
                    value={password.confirmNewPass}
                    onChange={(e) => {
                        const isMatch = validateConfirmPass(
                            password.newPass,
                            e.target.value
                        )
                        setPassMatch({
                            text: isMatch
                            ? 'New Password and Confirm New Password match.'
                            : 'New Password and Confirm New Password do not match',
                            isMatch: isMatch
                        })
                        setPassword({
                            ...password,
                            confirmNewPass: e.target.value
                        })
                    }}
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
                <button className="
                    p-2
                    bg-blue-950
                    text-white
                    rounded-md
                    hover:bg-blue-900
                    transition"
                    type="submit"
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}