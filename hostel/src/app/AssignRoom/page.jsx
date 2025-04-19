"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssignRoom() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");
    const [roomCount, setRoomCount] = useState(0);
    const [studentEmails, setStudentEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoomCount = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getAdminRoomCount");
                if (response.ok) {
                    const data = await response.json();
                    setRoomCount(data.room_count);
                    // Initialize student emails array with empty strings
                    setStudentEmails(new Array(data.room_count).fill(""));
                }
            } catch (error) {
                console.error("Error fetching room count:", error);
                setError("Failed to load room count");
            } finally {
                setLoading(false);
            }
        };

        fetchRoomCount();
    }, []);

    const handleEmailChange = (index, value) => {
        const newEmails = [...studentEmails];
        newEmails[index] = value;
        setStudentEmails(newEmails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Filter out empty emails
        const validEmails = studentEmails.filter(email => email.trim() !== "");

        if (validEmails.length === 0) {
            setError("Please enter at least one student email");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/assignStudentsToRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room_id: roomId,
                    student_emails: validEmails,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to assign students to room");
            }

            // Reset form
            setRoomId("");
            setStudentEmails(new Array(roomCount).fill(""));
            alert("Students assigned to room successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div style={{ 
                minHeight: "100vh", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                backgroundColor: "#F8FAFC", 
                color: "#333" 
            }}>
                <div style={{ fontSize: "1.25rem" }}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: "100vh", 
            backgroundColor: "#F8FAFC", 
            color: "#333", 
            padding: "1rem" 
        }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "1.5rem" 
                }}>
                    <h1 style={{ 
                        fontSize: "1.5rem", 
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <span style={{ marginRight: "0.5rem" }}>🏠</span> Assign Students to Room
                    </h1>
                    <button
                        onClick={() => router.push("/AdminDashboard")}
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
                        <span style={{ marginRight: "0.5rem" }}>↩️</span> Back to Dashboard
                    </button>
                </div>

                <div style={{ 
                    backgroundColor: "white", 
                    padding: "1.5rem", 
                    borderRadius: "0.5rem", 
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #BCCCDC"
                }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <label style={{ 
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                marginBottom: "0.5rem"
                            }}>
                                Room ID (e.g., D-304)
                            </label>
                            <input
                                type="text"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                style={{ 
                                    width: "100%", 
                                    padding: "0.75rem", 
                                    backgroundColor: "white", 
                                    borderRadius: "0.25rem",
                                    border: "1px solid #BCCCDC",
                                    outline: "none"
                                }}
                                required
                                placeholder="Enter room ID"
                            />
                        </div>

                        <div>
                            <label style={{ 
                                display: "block",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                marginBottom: "0.5rem" 
                            }}>
                                Student Emails (Max: {roomCount})
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {studentEmails.map((email, index) => (
                                    <input
                                        key={index}
                                        type="email"
                                        value={email}
                                        onChange={(e) => handleEmailChange(index, e.target.value)}
                                        style={{ 
                                            width: "100%", 
                                            padding: "0.75rem", 
                                            backgroundColor: "white", 
                                            borderRadius: "0.25rem",
                                            border: "1px solid #BCCCDC",
                                            outline: "none"
                                        }}
                                        placeholder={`Student ${index + 1} email`}
                                    />
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div style={{ 
                                color: "#DC2626", 
                                fontSize: "0.875rem",
                                backgroundColor: "#fee2e2",
                                padding: "0.5rem",
                                borderRadius: "0.25rem"
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{ 
                                width: "100%", 
                                backgroundColor: "#D9EAFD", 
                                padding: "0.75rem", 
                                borderRadius: "0.25rem",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                        >
                            <span style={{ marginRight: "0.5rem" }}>✅</span> Assign Students to Room
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 