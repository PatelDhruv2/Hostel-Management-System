"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Feedback() {
    const [formData, setFormData] = useState({
        student1_id: "",
        issue: "",
        room_number: "",
    });

    const [modal, setModal] = useState({ show: false, message: "", success: true });
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData((prevData) => ({
                ...prevData,
                student1_id: user.id || "",
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createFeedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            setModal({
                show: true,
                message: "Feedback submitted successfully!",
                success: true,
            });

            setFormData({
                student1_id: formData.student1_id,
                issue: "",
                room_number: "",
            });

            // Auto-redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push("/Dashboard");
            }, 2000);
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
            backgroundColor: '#F8FAFC',
            color: '#333',
            padding: '2rem',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                width: '100%',
                border: '1px solid #BCCCDC'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: '#4A5568',
                    textAlign: 'center',
                    borderBottom: '2px solid #D9EAFD',
                    paddingBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{ marginRight: '0.5rem' }}>📋</span> Submit Feedback
                </h2>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.25rem',
                            fontWeight: '500',
                            color: '#333'
                        }}>Your Issue</label>
                        <input
                            type="text"
                            name="issue"
                            placeholder="Describe your issue here..."
                            value={formData.issue}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid #BCCCDC',
                                backgroundColor: 'white',
                                color: '#333'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.25rem',
                            fontWeight: '500',
                            color: '#333'
                        }}>Room Number</label>
                        <input
                            type="text"
                            name="room_number"
                            placeholder="Your Room Number"
                            value={formData.room_number}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid #BCCCDC',
                                backgroundColor: 'white',
                                color: '#333'
                            }}
                            required
                        />
                    </div>
                    <button style={{
                        width: '100%',
                        backgroundColor: '#D9EAFD',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        border: 'none',
                        color: '#333',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}>
                        <span style={{ marginRight: '0.5rem' }}>📤</span> Submit Feedback
                    </button>
                </form>

                {modal.show && (
                    <div style={{
                        position: 'fixed',
                        inset: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '50'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            color: '#333',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                            width: '100%'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                marginBottom: '1rem',
                                color: modal.success ? '#047857' : '#DC2626'
                            }}>
                                {modal.success ? "Success" : "Error"}
                            </h3>
                            <p style={{
                                marginBottom: '1rem'
                            }}>{modal.message}</p>
                            {!modal.success && (
                                <button
                                    style={{
                                        backgroundColor: '#D9EAFD',
                                        color: '#333',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        border: 'none',
                                        cursor: 'pointer'
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
