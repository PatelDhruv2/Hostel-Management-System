"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewGatePasses() {
    const router = useRouter();
    const [gatePasses, setGatePasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGatePasses = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) {
                    router.push("/");
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/gatepass/student/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Sort gatepasses by date (newest first)
                    const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setGatePasses(sortedData);
                }
            } catch (error) {
                console.error("Error fetching gatepasses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGatePasses();
    }, [router]);

    const getStatusColor = (status) => {
        switch (status) {
            case "APPROVED":
                return "#4ADE80"; // Green
            case "REJECTED":
                return "#F87171"; // Red
            case "PENDING":
                return "#FBBF24"; // Yellow
            default:
                return "#9AA6B2"; // Gray
        }
    };

    const getStatusBgColor = (status) => {
        switch (status) {
            case "APPROVED":
                return "#DCFCE7"; // Light green
            case "REJECTED":
                return "#FEE2E2"; // Light red
            case "PENDING":
                return "#FEF3C7"; // Light yellow
            default:
                return "#F1F5F9"; // Light gray
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "APPROVED":
                return "✅";
            case "REJECTED":
                return "❌";
            case "PENDING":
                return "⏳";
            default:
                return "❓";
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8FAFC',
                color: '#333',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    fontSize: '1.25rem',
                    padding: '1rem 2rem',
                    backgroundColor: '#D9EAFD',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            color: '#333',
            padding: '1.5rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#D9EAFD',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>My Gate Pass Requests</h1>
                    <button
                        onClick={() => router.push("/Dashboard")}
                        style={{
                            backgroundColor: '#9AA6B2',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            fontWeight: '500'
                        }}
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {gatePasses.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            color: '#9AA6B2',
                            padding: '2rem',
                            backgroundColor: '#D9EAFD',
                            borderRadius: '8px',
                            fontSize: '1.1rem'
                        }}>
                            No gate pass requests found.
                        </div>
                    ) : (
                        gatePasses.map((gatePass) => (
                            <div
                                key={gatePass.id}
                                style={{
                                    backgroundColor: '#D9EAFD',
                                    padding: '1.25rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    borderLeft: `4px solid ${getStatusColor(gatePass.approval)}`
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: '#333'
                                        }}>
                                            {new Date(gatePass.leave_date).toLocaleDateString()} -{" "}
                                            {new Date(gatePass.arrival_date).toLocaleDateString()}
                                        </h3>
                                        <p style={{
                                            color: '#555',
                                            marginTop: '0.5rem',
                                            fontSize: '0.95rem'
                                        }}>{gatePass.reason}</p>
                                    </div>
                                    <span style={{
                                        padding: '0.4rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        backgroundColor: getStatusBgColor(gatePass.approval),
                                        color: getStatusColor(gatePass.approval),
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        {getStatusIcon(gatePass.approval)} {gatePass.approval}
                                    </span>
                                </div>
                                <div style={{
                                    marginTop: '0.75rem',
                                    fontSize: '0.875rem',
                                    color: '#777',
                                    borderTop: '1px solid #BCCCDC',
                                    paddingTop: '0.5rem'
                                }}>
                                    Requested on: {new Date(gatePass.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
} 