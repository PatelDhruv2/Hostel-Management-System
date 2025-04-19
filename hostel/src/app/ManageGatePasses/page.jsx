"use client";

import { useState, useEffect } from "react";

export default function ManageGatePasses() {
    const [gatePasses, setGatePasses] = useState([]);

    useEffect(() => {
        const fetchGatePasses = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getAllGatePasses");
                const data = await response.json();
                if (response.ok) {
                    setGatePasses(data);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Error fetching gate passes:", error);
            }
        };

        fetchGatePasses();
    }, []);

    const updateGatePassStatus = async (id, approval) => {
        try {
            const response = await fetch("http://localhost:5000/api/updateGatePassStatus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, approval }),
            });

            const data = await response.json();
            if (response.ok) {
                setGatePasses((prev) =>
                    prev.map((pass) => (pass.id === id ? { ...pass, approval } : pass))
                );
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error updating gate pass status:", error);
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            padding: "1rem", 
            backgroundColor: "#F8FAFC", 
            color: "#333"
        }}>
            <h1 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "bold", 
                marginBottom: "1rem",
                color: "#4A5568",
                borderBottom: "2px solid #D9EAFD",
                paddingBottom: "0.5rem"
            }}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <span style={{ marginRight: "0.5rem" }}>🚪</span> Manage Gate Passes
                </span>
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {gatePasses.length === 0 ? (
                    <div style={{ 
                        padding: "1rem", 
                        backgroundColor: "white", 
                        borderRadius: "0.5rem", 
                        textAlign: "center",
                        border: "1px solid #BCCCDC" 
                    }}>
                        No gate passes found
                    </div>
                ) : (
                    gatePasses.map((pass) => (
                        <div key={pass.id} style={{ 
                            padding: "1rem", 
                            backgroundColor: "white", 
                            borderRadius: "0.5rem", 
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #BCCCDC"
                        }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
                                <p style={{ margin: "0" }}><strong>Student:</strong> {pass.student.name}</p>
                                <p style={{ margin: "0" }}><strong>Email:</strong> {pass.student.email}</p>
                                <p style={{ margin: "0" }}><strong>Leave Date:</strong> {new Date(pass.leave_date).toLocaleDateString()}</p>
                                <p style={{ margin: "0" }}><strong>Arrival Date:</strong> {new Date(pass.arrival_date).toLocaleDateString()}</p>
                            </div>
                            
                            <p style={{ margin: "0.5rem 0", padding: "0.5rem", backgroundColor: "#F8FAFC", borderRadius: "0.25rem" }}>
                                <strong>Reason:</strong> {pass.reason}
                            </p>
                            
                            <div style={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center",
                                marginTop: "0.75rem", 
                                borderTop: "1px solid #BCCCDC",
                                paddingTop: "0.75rem"
                            }}>
                                <p style={{ 
                                    margin: "0", 
                                    fontWeight: "500",
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "0.25rem",
                                    backgroundColor: pass.approval === "APPROVED" ? "#d1fae5" : 
                                                 pass.approval === "REJECTED" ? "#fee2e2" : "#D9EAFD"
                                }}>
                                    <strong>Status:</strong> {pass.approval}
                                </p>
                                <div>
                                    <button
                                        onClick={() => updateGatePassStatus(pass.id, "APPROVED")}
                                        style={{
                                            backgroundColor: "#BCCCDC",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "0.375rem",
                                            border: "none",
                                            marginRight: "0.5rem",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s"
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#9AA6B2"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                                    >
                                        <span style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "0.3rem" }}>✅</span> Approve
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => updateGatePassStatus(pass.id, "REJECTED")}
                                        style={{
                                            backgroundColor: "#D9EAFD",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "0.375rem",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s"
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                                    >
                                        <span style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "0.3rem" }}>❌</span> Reject
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 