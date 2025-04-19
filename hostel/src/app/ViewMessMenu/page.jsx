"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ViewMessMenu() {
    const router = useRouter();
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/messMenu");
                if (response.ok) {
                    const data = await response.json();
                    setMenu(data);
                } else {
                    throw new Error("Failed to fetch menu");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Lunch", "Hi-Tea", "Dinner"];

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
                maxWidth: '1200px',
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
                    }}>Weekly Mess Menu</h1>
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

                {error ? (
                    <div style={{
                        color: '#EF4444',
                        textAlign: 'center',
                        padding: '1rem',
                        backgroundColor: '#FEE2E2',
                        borderRadius: '8px',
                        marginTop: '1rem'
                    }}>{error}</div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1rem'
                    }}>
                        {days.map(day => (
                            <div key={day} style={{
                                backgroundColor: '#D9EAFD',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    textAlign: 'center',
                                    color: '#333',
                                    borderBottom: '2px solid #BCCCDC',
                                    paddingBottom: '0.5rem'
                                }}>{day}</h2>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    {mealTypes.map(type => (
                                        <div key={type} style={{
                                            backgroundColor: '#F8FAFC',
                                            padding: '0.75rem',
                                            borderRadius: '4px'
                                        }}>
                                            <h3 style={{
                                                fontWeight: '500',
                                                color: '#333',
                                                marginBottom: '0.5rem',
                                                fontSize: '1rem',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{
                                                    marginRight: '0.5rem',
                                                    fontSize: '1.25rem'
                                                }}>
                                                    {type === 'Breakfast' ? '🍳' : 
                                                    type === 'Lunch' ? '🍲' : 
                                                    type === 'Hi-Tea' ? '☕' : '🍽️'}
                                                </span>
                                                {type}
                                            </h3>
                                            <ul style={{
                                                paddingLeft: '1.5rem',
                                                color: '#555',
                                                fontSize: '0.9rem'
                                            }}>
                                                {menu[day]?.[type]?.map((item, index) => (
                                                    <li key={index} style={{
                                                        marginBottom: '0.25rem'
                                                    }}>{item}</li>
                                                )) || <li style={{
                                                    color: '#9AA6B2',
                                                    fontStyle: 'italic'
                                                }}>No items added</li>}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 