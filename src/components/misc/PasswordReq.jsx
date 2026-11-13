export default function PasswordReq ({password}) {
    const rules = [
        'At least 15 characters.',
        'No more than 128 characters.',
        'Should not be generic.',
        'Should not be just whitespaces.',
        'Must have enough variety of characters.'
    ];

    return (
        <div className="space-y-2">
            {rules.map((rule) => (
                <p className="flex items-center gap-2 text-md"
                    key={rule}
                >
                    <span>&bull;</span>
                    {rule}
                </p>
            ))}
        </div>
    );
}