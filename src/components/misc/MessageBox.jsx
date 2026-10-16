import { useState, useEffect } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import { ImCross } from 'react-icons/im'

export default function MessageBox ({
    isOpen,
    onClose,
    title,
    message,
    type = "success"
}) {
    if (!isOpen) return null;
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)

        return () => clearTimeout(timer)
    }, [onClose])

    let bgColor = 'bg-red-200'
    let bdColor = 'border-red-300'
    if (type === 'success') {
        bgColor = 'bg-green-200'
        bdColor = 'border-green-300'
    }

    return (
        <div className={`
            ${bgColor}
            fixed
            top-[60px]
            left-4
            right-4
            max-w-md
            z-100
            flex
            items-center
            justify-center
            rounded-md
            border
            ${bdColor}
            p-2`}
        >
            <div className="shrink-0">
                {
                    type === "success" ?
                    <MdCheckCircle
                        size={30}
                        className="text-green-500"
                    /> :
                    <MdError
                        size={30}
                        className="text-red-500"
                    />
                }
            </div>
            <div className="flex-1 min-w-0 px-2">
                <h2 className="
                    text-lg
                    font-bold
                    text-blue-950"
                >
                    {title}
                </h2>
                <p className="
                    text-blue-950
                    text-md
                    break-words"
                >
                    {message}
                </p>
            </div>
            <button className="
                shrink-0
                px-2
                text-gray-500
                hover:text-black"
                onClick={onClose}
            >
                <ImCross size={15} />   
            </button>
        </div>
    )
}