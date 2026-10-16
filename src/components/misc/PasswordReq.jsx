export default function PasswordReq ({password}) {
    const rules = [
        {
            label: "At least 15 characters",
            valid: password.length >= 15
        },
        {
            label: "No more than 128 characters",
            valid: password.length <= 128
        },
        {
            label: "Not empty or whitespace only",
            valid: password.trim().length > 0
        }
    ];

    return (
        <div className="mt-3 space-y-2">
            {rules.map((rule) => (
                <p className={`flex items-center gap-2 text-sm ${
                    rule.valid ? "text-green-600" : "text-slate-500"}`}
                    key={rule.label}
                >
                    <span>{rule.valid ? "✓" : "○"}</span>
                    {rule.label}
                </p>
            ))}
        </div>
    );
}