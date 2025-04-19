"use client";

import SigninForm from "../Components/SignIn";

export default function SignInPage() {
    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#F8FAFC",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem"
        }}>
            <div style={{
                maxWidth: "480px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #D9EAFD",
                padding: "2rem"
            }}>
                <SigninForm />
            </div>
        </div>
    );
} 