"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUtensils, FaArrowLeft, FaCalendarAlt, FaClock, FaList, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function MessMenu() {
    const router = useRouter();
    const [menu, setMenu] = useState({
        day: "Monday",
        meal_type: "Breakfast",
        items: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Lunch", "Hi-Tea", "Dinner"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/messMenu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(menu),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add menu item");
            }

            setSuccess("Menu item added successfully!");
            setMenu(prev => ({ ...prev, items: "" })); // Clear items field only
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            color: '#333',
            padding: '1.5rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '800px',
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
                        <FaUtensils style={{ marginRight: '0.75rem', color: '#9AA6B2' }} />
                        Manage Mess Menu
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

                <div style={{
                    backgroundColor: '#FFFFFF',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    color: '#4A5568',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <FaCalendarAlt style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                    Day
                                </label>
                                <select
                                    value={menu.day}
                                    onChange={(e) => setMenu(prev => ({ ...prev, day: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#F8FAFC',
                                        border: '1px solid #BCCCDC',
                                        borderRadius: '0.25rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        color: '#333'
                                    }}
                                    required
                                >
                                    {days.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem',
                                    color: '#4A5568',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <FaClock style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                    Meal Type
                                </label>
                                <select
                                    value={menu.meal_type}
                                    onChange={(e) => setMenu(prev => ({ ...prev, meal_type: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        backgroundColor: '#F8FAFC',
                                        border: '1px solid #BCCCDC',
                                        borderRadius: '0.25rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        color: '#333'
                                    }}
                                    required
                                >
                                    {mealTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#4A5568',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <FaList style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                Menu Items (comma-separated)
                            </label>
                            <textarea
                                value={menu.items}
                                onChange={(e) => setMenu(prev => ({ ...prev, items: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: '#F8FAFC',
                                    border: '1px solid #BCCCDC',
                                    borderRadius: '0.25rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    resize: 'vertical',
                                    minHeight: '100px',
                                    color: '#333',
                                    fontFamily: 'Arial, sans-serif'
                                }}
                                placeholder="Enter menu items separated by commas (e.g., Rice, Dal, Vegetables, Salad)"
                                required
                            />
                        </div>

                        {error && (
                            <div style={{
                                color: '#E53E3E',
                                padding: '0.75rem',
                                backgroundColor: '#FFF5F5',
                                borderRadius: '0.25rem',
                                border: '1px solid #FED7D7',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <FaExclamationCircle style={{ marginRight: '0.5rem' }} />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div style={{
                                color: '#38A169',
                                padding: '0.75rem',
                                backgroundColor: '#F0FFF4',
                                borderRadius: '0.25rem',
                                border: '1px solid #C6F6D5',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <FaCheckCircle style={{ marginRight: '0.5rem' }} />
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                backgroundColor: '#68D391',
                                color: '#FFFFFF',
                                padding: '0.75rem',
                                borderRadius: '0.25rem',
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                marginTop: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#48BB78'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#68D391'}
                        >
                            <FaUtensils style={{ marginRight: '0.5rem' }} />
                            Add Menu Item
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 