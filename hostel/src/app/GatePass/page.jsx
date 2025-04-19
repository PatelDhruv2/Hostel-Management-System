"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GatePass() {
    const [formData, setFormData] = useState({
        student1_id: "",
        reason: "",
        leave_date: "",
        arrival_date: "",
        approval: "PENDING",
    });

    const [modal, setModal] = useState({ show: false, message: "", success: true });
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData((prevData) => ({
                ...prevData,
                student1_id: user.id || "", // Using id from user object as student1_id

            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.student1_id) {
            alert("Student ID is required. Please log in again.");
            return;
        }

        const response = await fetch("http://localhost:5000/api/createGatePass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {

            alert("Gate pass request submitted successfully!");
            setFormData({ student1_id: formData.student1_id, reason: "", leave_date: "", arrival_date: "", approval: "Pending" });

           
        } else {
            setModal({
                show: true,
                message: `Error: ${data.error}`,
                success: false,
            });
        }
    };

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: "2rem",
            backgroundColor: "#F8FAFC",
            minHeight: "100vh"
        }}>
            <div style={{ 
                backgroundColor: "white", 
                color: "#333", 
                padding: "1.5rem", 
                borderRadius: "0.5rem", 
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "450px", 
                width: "100%",
                border: "1px solid #BCCCDC"
            }}>
                <h2 style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: "bold", 
                    marginBottom: "1rem",
                    color: "#4A5568",
                    borderBottom: "2px solid #D9EAFD",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <span style={{ marginRight: "0.5rem" }}>🚪</span> Request Gate Pass
                </h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Reason for Leave</label>
                        <input
                            type="text"
                            name="reason"
                            placeholder="Please provide a detailed reason for your leave request"
                            value={formData.reason}
                            onChange={handleChange}
                            style={{ 
                                width: "100%", 
                                padding: "0.5rem", 
                                borderRadius: "0.25rem", 
                                backgroundColor: "white", 
                                color: "#333",
                                border: "1px solid #BCCCDC"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Leave Date</label>
                        <input
                            type="date"
                            name="leave_date"
                            value={formData.leave_date}
                            onChange={handleChange}
                            style={{ 
                                width: "100%", 
                                padding: "0.5rem", 
                                borderRadius: "0.25rem", 
                                backgroundColor: "white", 
                                color: "#333",
                                border: "1px solid #BCCCDC"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Arrival Date</label>
                        <input
                            type="date"
                            name="arrival_date"
                            value={formData.arrival_date}
                            onChange={handleChange}
                            style={{ 
                                width: "100%", 
                                padding: "0.5rem", 
                                borderRadius: "0.25rem", 
                                backgroundColor: "white", 
                                color: "#333",
                                border: "1px solid #BCCCDC"
                            }}
                            required
                        />
                    </div>
                    
                    <button style={{ 
                        width: "100%", 
                        backgroundColor: "#D9EAFD", 
                        padding: "0.75rem", 
                        borderRadius: "0.25rem",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginTop: "0.5rem",
                        transition: "background-color 0.3s"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}>
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>📝</span> Submit Gate Pass
                        </span>
                    </button>
                </form>

                {modal.show && (
                    <div style={{ 
                        position: "fixed", 
                        inset: "0", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: "50" 
                    }}>
                        <div style={{ 
                            backgroundColor: "white", 
                            color: "black", 
                            padding: "1.5rem", 
                            borderRadius: "0.5rem", 
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            maxWidth: "350px", 
                            width: "100%" 
                        }}>
                            <h3 style={{ 
                                fontSize: "1.125rem", 
                                fontWeight: "600", 
                                marginBottom: "1rem",
                                color: modal.success ? "#047857" : "#DC2626"
                            }}>
                                {modal.success ? "Success" : "Error"}
                            </h3>
                            <p style={{ marginBottom: "1rem" }}>{modal.message}</p>
                            {!modal.success && (
                                <button
                                    style={{ 
                                        backgroundColor: "#D9EAFD", 
                                        color: "#333", 
                                        padding: "0.5rem 1rem", 
                                        borderRadius: "0.25rem",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setModal({ ...modal, show: false })}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
