"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/");
            return;
        }

        const user = JSON.parse(storedUser);
        if (!user.isAdmin) {
            router.push("/Dashboard");
            return;
        }

        setUser(user);
    }, [router]);

    return (
        <div style={{ 
            minHeight: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: "1rem", 
            backgroundColor: "#F8FAFC", 
            color: "#333" 
        }}>
            {/* Navbar */}
            <nav style={{ 
                width: "100%", 
                backgroundColor: "white", 
                padding: "1rem", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
                border: "1px solid #BCCCDC",
                marginBottom: "1.5rem"
            }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.5rem" }}>🏫</span> Admin Dashboard
                </h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        router.push("/signin");
                    }}
                    style={{
                        backgroundColor: "#D9EAFD",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        display: "flex",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                >
                    <span style={{ marginRight: "0.5rem" }}>🚪</span> Logout
                </button>
            </nav>

            {/* Welcome Message */}
            <div style={{ 
                width: "100%", 
                maxWidth: "1000px", 
                backgroundColor: "white", 
                padding: "1.5rem", 
                borderRadius: "0.5rem", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                border: "1px solid #BCCCDC",
                marginBottom: "1.5rem"
            }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "600" }}>
                    Welcome Admin, {user ? user.email : ""}!
                </h2>
            </div>

            {/* Admin Dashboard Sections */}
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
                gap: "1rem", 
                width: "100%", 
                maxWidth: "1000px" 
            }}>
                {/* Manage Gate Passes */}
                <div
                    onClick={() => router.push("/ManageGatePasses")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>🚪</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>Manage Gate Passes</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Review and approve gate pass requests.</p>
                </div>

                {/* View Feedback */}
                <div
                    onClick={() => router.push("/ViewFeedback")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>📝</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>View Feedback</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Review student feedback and complaints.</p>
                </div>

                {/* Assign Room */}
                <div
                    onClick={() => router.push("/AssignRoom")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>🏠</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>Assign Room</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Assign students to rooms.</p>
                </div>

                {/* Manage Mess Menu */}
                <div
                    onClick={() => router.push("/MessMenu")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>🍽️</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>Manage Mess Menu</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Add or update weekly menu items.</p>
                </div>

                {/* View Rooms */}
                <div
                    onClick={() => router.push("/ViewRooms")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>🔍</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>View Rooms</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>View room assignments and student details.</p>
                </div>

                {/* View Mess Menu */}
                <div
                    onClick={() => router.push("/AdminViewMessMenu")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>🍲</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>View Mess Menu</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>View the current weekly menu.</p>
                </div>

                {/* View Hostel Committee Members */}
                <div
                    onClick={() => router.push("/viewHostelCommitteMembers")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>👥</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>View Committee</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>View Hostel Committee Members</p>
                </div>

                {/* Remove Committee Members */}
                <div
                    onClick={() => router.push("/removeCommitteMembers")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>❌</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>Remove Committee</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Remove Committee Members</p>
                </div>

                {/* Add Committee Members */}
                <div
                    onClick={() => router.push("/addHostelCommitteMembers")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>➕</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>Add Committee</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Add Committee Members</p>
                </div>

                {/* View Staff Members */}
                <div
                    onClick={() => router.push("/seeStaff")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>👨‍💼</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>View Staff</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>View Staff Members</p>
                </div>

                {/* Add Staff Members */}
                <div
                    onClick={() => router.push("/addStaff")}
                    style={{
                        padding: "1.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        textAlign: "center",
                        border: "1px solid #BCCCDC",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.borderColor = "#9AA6B2";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.borderColor = "#BCCCDC";
                    }}
                >
                    <div style={{ 
                        fontSize: "2rem", 
                        marginBottom: "0.75rem",
                        backgroundColor: "#D9EAFD",
                        width: "3rem",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%"
                    }}>➕</div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#4A5568" }}>Add Staff</h3>
                    <p style={{ color: "#718096", marginTop: "0.5rem", fontSize: "0.875rem" }}>Add Staff Members</p>
                </div>
            </div>
        </div>
    );
} 