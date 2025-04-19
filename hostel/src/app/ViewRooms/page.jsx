"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaArrowLeft, FaSpinner, FaUserAlt, FaEnvelope, FaMobile, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ViewRooms() {
    const router = useRouter();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/roomAssignments");
                if (response.ok) {
                    const data = await response.json();
                    setRooms(data);
                } else {
                    throw new Error("Failed to fetch room assignments");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8FAFC',
                color: '#333'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <FaSpinner style={{ 
                        fontSize: '2rem', 
                        color: '#9AA6B2',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <div style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Loading...</div>
                    <style jsx global>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            color: '#333',
            padding: '1rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <FaHome style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                        Room Assignments
                    </h1>
                    <button
                        onClick={() => router.push("/AdminDashboard")}
                        style={{
                            backgroundColor: '#D9EAFD',
                            color: '#333',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#BCCCDC'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D9EAFD'}
                    >
                        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
                        Back to Dashboard
                    </button>
                </div>

                {error ? (
                    <div style={{
                        color: '#E53E3E',
                        textAlign: 'center',
                        padding: '1rem',
                        backgroundColor: '#FFF5F5',
                        borderRadius: '8px',
                        border: '1px solid #FED7D7'
                    }}>{error}</div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1rem'
                    }}>
                        {rooms.map((room) => (
                            <div key={room.room_id} style={{
                                backgroundColor: '#FFFFFF',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #D9EAFD'
                            }}>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    textAlign: 'center',
                                    color: '#333',
                                    backgroundColor: '#D9EAFD',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }}>Room {room.room_id}</h2>
                                {room.students.length > 0 ? (
                                    <div style={{ marginTop: '1rem' }}>
                                        {room.students.map((student, index) => (
                                            <div key={index} style={{
                                                marginTop: index > 0 ? '1.5rem' : '0',
                                                borderTop: index > 0 ? '1px solid #BCCCDC' : 'none',
                                                paddingTop: index > 0 ? '1.5rem' : '0'
                                            }}>
                                                <h3 style={{
                                                    fontWeight: '500',
                                                    color: '#4A5568',
                                                    marginBottom: '0.75rem',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <FaUserAlt style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                                    Student {index + 1}
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ fontWeight: '500', marginRight: '0.5rem', minWidth: '140px' }}>Name:</span> 
                                                        {student.name}
                                                    </p>
                                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaEnvelope style={{ marginRight: '0.5rem', color: '#9AA6B2', fontSize: '0.875rem' }} />
                                                        <span style={{ fontWeight: '500', marginRight: '0.5rem', minWidth: '140px' }}>Email:</span> 
                                                        {student.email}
                                                    </p>
                                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaMobile style={{ marginRight: '0.5rem', color: '#9AA6B2', fontSize: '0.875rem' }} />
                                                        <span style={{ fontWeight: '500', marginRight: '0.5rem', minWidth: '140px' }}>Mobile:</span> 
                                                        {student.mobile_number}
                                                    </p>
                                                    <p style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                        <FaMapMarkerAlt style={{ marginRight: '0.5rem', color: '#9AA6B2', fontSize: '0.875rem', marginTop: '0.25rem' }} />
                                                        <span style={{ fontWeight: '500', marginRight: '0.5rem', minWidth: '140px' }}>Address:</span> 
                                                        {student.address}
                                                    </p>
                                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaPhone style={{ marginRight: '0.5rem', color: '#9AA6B2', fontSize: '0.875rem' }} />
                                                        <span style={{ fontWeight: '500', marginRight: '0.5rem', minWidth: '140px' }}>Emergency Contact:</span> 
                                                        {student.emergency_number}
                                                    </p>
                                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaPhone style={{ marginRight: '0.5rem', color: '#9AA6B2', fontSize: '0.875rem' }} />
                                                        <span style={{ fontWeight: '500', marginRight: '0.5rem', minWidth: '140px' }}>Parent Contact:</span> 
                                                        {student.parent_contact}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{
                                        textAlign: 'center',
                                        color: '#9AA6B2',
                                        padding: '1rem',
                                        backgroundColor: '#F8FAFC',
                                        borderRadius: '4px',
                                        marginTop: '1rem'
                                    }}>No students assigned</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 