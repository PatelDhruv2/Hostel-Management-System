"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminViewMessMenu() {
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
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "1.5rem" 
                }}>
                    <h1 style={{ 
                        fontSize: "1.5rem", 
                        fontWeight: "bold" 
                    }}>Weekly Mess Menu</h1>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                            onClick={() => router.push("/MessMenu")}
                            style={{
                                backgroundColor: "#BCCCDC",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                fontWeight: "500"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#9AA6B2"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                        >
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <span style={{ marginRight: "0.5rem" }}>✏️</span> Edit Menu
                            </span>
                        </button>
                        <button
                            onClick={() => router.push("/AdminDashboard")}
                            style={{
                                backgroundColor: "#D9EAFD",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                fontWeight: "500"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                        >
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <span style={{ marginRight: "0.5rem" }}>↩️</span> Back to Dashboard
                            </span>
                        </button>
                    </div>
                </div>

                {error ? (
                    <div style={{ color: "#e53e3e", textAlign: "center" }}>{error}</div>
                ) : (
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                        gap: "1rem" 
                    }}>
                        {days.map(day => (
                            <div key={day} style={{ 
                                backgroundColor: "white", 
                                padding: "1rem", 
                                borderRadius: "0.5rem", 
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                border: "1px solid #BCCCDC"
                            }}>
                                <h2 style={{ 
                                    fontSize: "1.25rem", 
                                    fontWeight: "600", 
                                    marginBottom: "1rem", 
                                    textAlign: "center",
                                    color: "#4A5568",
                                    borderBottom: "2px solid #D9EAFD",
                                    paddingBottom: "0.5rem"
                                }}>{day}</h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {mealTypes.map(type => (
                                        <div key={type} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                            <h3 style={{ 
                                                fontWeight: "500", 
                                                color: "#4A5568",
                                                backgroundColor: "#D9EAFD",
                                                padding: "0.25rem 0.5rem",
                                                borderRadius: "0.25rem"
                                            }}>{type}</h3>
                                            <ul style={{ 
                                                listStyleType: "disc", 
                                                paddingLeft: "1.5rem", 
                                                color: "#4A5568" 
                                            }}>
                                                {menu[day]?.[type]?.map((item, index) => (
                                                    <li key={index} style={{ margin: "0.25rem 0" }}>{item}</li>
                                                )) || <li style={{ color: "#9AA6B2" }}>No items added</li>}
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