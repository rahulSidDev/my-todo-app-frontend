export default function PrivacyPolicy () {
    return (
        <main className="
            min-h-screen
            bg-slate-50
            pt-[55px]
        ">
            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-12
            ">
                {/* Introduction */}
                <section className="mb-16">
                    <h1 className="
                        text-5xl
                        font-bold
                        mb-6
                    ">
                        Privacy Policy.
                    </h1>

                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        This Privacy Policy explains how Todo Notes collects, 
                        uses, and protects information provided by users of the 
                        application. By using Todo Notes, you agree to the 
                        collection and use of information in accordance with 
                        this policy.
                    </p>
                </section>

                {/* Information collected */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        What info does MyNotes App collect?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        The users Passwords are never stored in plain text by the 
                        App and are securely hashed before being saved. Additionally 
                        the app collects the following data:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Name</li>
                        <li>Email Address</li>
                        <li>Account Preference</li>
                        <li>All of the content writtern for every note</li>
                    </ul>
                </section>

                {/* How is the information used? */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        How does the App use the information?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        The App uses the information for the following purposes:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Create and manage user accounts</li>
                        <li>Authenticate users securely</li>
                        <li>Store and organize notes</li>
                        <li>Provide password recovery functionality</li>
                        <li>Improve the application's functionality and user experience</li>
                    </ul>
                </section>

                {/* Data Security */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        What data security measures are taken by the App?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        Reasonable measures are taken to protect user information 
                        from unauthorized access, disclosure, or modification. 
                        Authentication is handled using secure technologies including 
                        password hashing and token-based authentication.
                    </p>
                </section>

                {/* Cookies and Authentication */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        What Cookies and Authentication methods are used by the App?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        MyNotes uses authentication cookies to keep users signed 
                        in and provide secure access to their accounts. These 
                        cookies are used solely for authentication purposes and 
                        are not used for advertising or tracking.
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        How does the App handle Account Deletion?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        Users may delete their accounts at any time through the 
                        Profile page. Deleting an account permanently removes 
                        associated account information and user-generated 
                        content from the application.
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        Who do I contact if I have any question pertaining to the App?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        If you have questions regarding this Privacy Policy, 
                        please contact the developer through the contact 
                        information provided on the About page.
                    </p>
                </section>
            </div>
        </main>
    )
}