'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCommitteeMember() {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        contact_number: '',
        email: '',
        date_of_join: '',
        gender: '',
    });

    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/addCommitteeMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Member added successfully!');
                setFormData({
                    name: '',
                    position: '',
                    contact_number: '',
                    email: '',
                    date_of_join: '',
                    gender: '',
                });

                // ✅ Redirect after success
                router.push('/AdminDashboard');
            } else {
                setMessage(data.error || 'Failed to add member');
            }
        } catch (error) {
            setMessage('Server error. Try again later.');
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "#F8FAFC", 
            color: "#333", 
            padding: "1.5rem" 
        }}>
            <div style={{
                maxWidth: "500px",
                width: "100%",
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #BCCCDC"
            }}>
                <h2 style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    color: "#4A5568",
                    borderBottom: "2px solid #D9EAFD",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <span style={{ marginRight: "0.5rem" }}>👥</span> Add Hostel Committee Member
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ 
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #BCCCDC",
                                borderRadius: "0.25rem",
                                backgroundColor: "white"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Position</label>
                        <input
                            type="text"
                            name="position"
                            placeholder="e.g., Warden, Member"
                            value={formData.position}
                            onChange={handleChange}
                            style={{ 
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #BCCCDC",
                                borderRadius: "0.25rem",
                                backgroundColor: "white"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Contact Number</label>
                        <input
                            type="text"
                            name="contact_number"
                            placeholder="Phone number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            style={{ 
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #BCCCDC",
                                borderRadius: "0.25rem",
                                backgroundColor: "white"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ 
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #BCCCDC",
                                borderRadius: "0.25rem",
                                backgroundColor: "white"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Date of Join</label>
                        <input
                            type="date"
                            name="date_of_join"
                            value={formData.date_of_join}
                            onChange={handleChange}
                            style={{ 
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #BCCCDC",
                                borderRadius: "0.25rem",
                                backgroundColor: "white"
                            }}
                            required
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{ 
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #BCCCDC",
                                borderRadius: "0.25rem",
                                backgroundColor: "white"
                            }}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            width: "100%",
                            backgroundColor: "#D9EAFD",
                            color: "#333",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                            marginTop: "0.5rem",
                            transition: "background-color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                    >
                        <span style={{ marginRight: "0.5rem" }}>➕</span> Add Member
                    </button>
                </form>

                {message && (
                    <div style={{ 
                        marginTop: "1rem", 
                        color: message.includes('success') ? "#047857" : "#DC2626",
                        textAlign: "center",
                        padding: "0.5rem",
                        backgroundColor: message.includes('success') ? "#d1fae5" : "#fee2e2",
                        borderRadius: "0.25rem"
                    }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
