import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BackendLoader ({ children }) {
    const [status, setStatus] = useState("connecting");
    const [progress, setProgress] = useState(0);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let isMounted = true;
        let progressInterval;
        let finishTimeout;

        const controller = new AbortController();

        const checkBackend = async () => {
            setStatus("connecting");
            setProgress(5);

            // Simulated progress: stop at 90% until the backend responds.
            progressInterval = setInterval(() => {
                if (isMounted) {
                    setProgress((current) => Math.min(current + 2, 90));
                }
            }, 400);

            try {
                const response = await fetch(
                    `${BACKEND_URL.replace(/\/$/, "")}/`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Backend connection failed");
                }

                clearInterval(progressInterval);

                if (isMounted) {
                    setProgress(100);

                    // Briefly display 100% before showing the app.
                    finishTimeout = setTimeout(() => {
                        if (isMounted) {
                            setStatus("connected");
                        }
                    }, 400);
                }
            } catch (error) {
                clearInterval(progressInterval);

                if (isMounted && error.name !== "AbortError") {
                    setStatus("error");
                }
            }
        };

        checkBackend();

        return () => {
            isMounted = false;
            controller.abort();
            clearInterval(progressInterval);
            clearTimeout(finishTimeout);
        };
    }, [attempt]);

    if (status === "connected") {
        return children;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">

            <h1 className="text-3xl font-bold text-blue-950 mb-3">
                [MyNotes~APP]
            </h1>

            {status === "connecting" ? (
                <>
                    <p className="text-gray-600 mb-6">
                        Connecting to backend...
                    </p>

                    <div className="w-72 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-950 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        {progress}%
                    </p>

                    <p className="mt-4 text-xs text-gray-400">
                        Please wait while we wake up the server.
                    </p>
                </>
            ) : (
                <>
                    <p className="text-red-500 mb-4">
                        Unable to connect to the backend.
                    </p>

                    <button
                        onClick={() => setAttempt((prev) => prev + 1)}
                        className="bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Try again
                    </button>
                </>
            )}
        </div>
    );
};