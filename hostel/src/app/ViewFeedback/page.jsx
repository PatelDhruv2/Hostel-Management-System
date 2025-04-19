"use client";

import { useState, useEffect } from "react";
import { FaComments, FaUser, FaExclamationCircle, FaDoorOpen, FaCalendarAlt, FaSpinner } from "react-icons/fa";

export default function ViewFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getAllFeedback");
                const data = await response.json();
                if (response.ok) {
                    setFeedbacks(data);
                } else {
                    setError(data.error || "Failed to fetch feedback");
                }
            } catch (error) {
                setError("Error fetching feedbacks: " + error.message);
                console.error("Error fetching feedbacks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div style={{ 
            minHeight: '100vh', 
            padding: '2rem', 
            backgroundColor: '#F8FAFC', 
            color: '#333',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '1.5rem'
            }}>
                <h1 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid #D9EAFD',
                    paddingBottom: '0.75rem'
                }}>
                    <FaComments style={{ marginRight: '0.75rem', color: '#9AA6B2' }} />
                    View Feedback
                </h1>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <FaSpinner style={{ 
                            fontSize: '2rem', 
                            color: '#BCCCDC',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <p style={{ marginTop: '1rem', color: '#9AA6B2' }}>Loading feedback...</p>
                        <style jsx global>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                )}

                {error && !loading && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#FFF5F5',
                        color: '#E53E3E',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        border: '1px solid #FED7D7',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {!loading && !error && feedbacks.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '8px',
                        color: '#9AA6B2'
                    }}>
                        No feedback found
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!loading && feedbacks.map((feedback) => (
                        <div key={feedback.id} style={{ 
                            padding: '1.25rem', 
                            backgroundColor: '#F8FAFC', 
                            borderRadius: '8px', 
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                            border: '1px solid #D9EAFD'
                        }}>
                            <p style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                marginBottom: '0.75rem',
                                fontWeight: '500'
                            }}>
                                <FaUser style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Student:</span> 
                                {feedback.student.name} ({feedback.student.email})
                            </p>
                            <p style={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                marginBottom: '0.75rem' 
                            }}>
                                <FaExclamationCircle style={{ marginRight: '0.5rem', color: '#9AA6B2', marginTop: '0.25rem' }} />
                                <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Issue:</span> 
                                <span style={{ flex: 1 }}>{feedback.issue}</span>
                            </p>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                marginTop: '1rem',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid #BCCCDC'
                            }}>
                                <p style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: '#4A5568',
                                    fontSize: '0.875rem'
                                }}>
                                    <FaDoorOpen style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                    <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Room Number:</span> 
                                    {feedback.room_number}
                                </p>
                                <p style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: '#4A5568',
                                    fontSize: '0.875rem'
                                }}>
                                    <FaCalendarAlt style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                    <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Date:</span> 
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 