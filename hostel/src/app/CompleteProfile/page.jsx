'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CompleteProfile() {
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        email: '',
        gender: '',
        age: '',
        mobile_number: '',
        address: '',
        emergency_number: '',
        parent_contact: '',
        roll_number: '',
        college_name: ''
    });
    
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        
        try {
            const response = await fetch('http://localhost:5000/api/completeProfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Profile updated successfully!');
                router.push('/Dashboard'); // Redirect after profile completion
            } else {
                setMessage(data.error || 'Profile update failed');
            }
        } catch (error) {
            setMessage('Error connecting to server');
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
                maxWidth: "600px",
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
                    paddingBottom: "0.5rem"
                }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ marginRight: "0.5rem" }}>👤</span> Complete Your Profile
                    </span>
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            placeholder="your@email.com" 
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
                            <option value="Male">MALE</option>
                            <option value="Female">FEMALE</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Age</label>
                        <input 
                            type="number" 
                            name="age" 
                            placeholder="Your age" 
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
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Mobile Number</label>
                        <input 
                            type="text" 
                            name="mobile_number" 
                            placeholder="Your mobile number" 
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
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="Your full address" 
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
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Emergency Contact</label>
                        <input 
                            type="text" 
                            name="emergency_number" 
                            placeholder="Emergency contact number" 
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
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Parent Contact</label>
                        <input 
                            type="text" 
                            name="parent_contact" 
                            placeholder="Parent's contact number" 
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
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Roll Number</label>
                        <input 
                            type="text" 
                            name="roll_number" 
                            placeholder="Your roll/registration number" 
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
                        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>College Name</label>
                        <input 
                            type="text" 
                            name="college_name" 
                            placeholder="Your college/university name" 
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
                    
                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: "#D9EAFD",
                            color: "#333",
                            padding: "0.75rem",
                            borderRadius: "0.25rem",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                            marginTop: "1rem",
                            transition: "background-color 0.3s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#BCCCDC"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#D9EAFD"}
                    >
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ marginRight: "0.5rem" }}>✅</span> Complete Profile
                        </span>
                    </button>
                </form>
                
                {message && (
                    <p style={{ 
                        marginTop: "1rem", 
                        color: message.includes('success') ? "#047857" : "#DC2626",
                        textAlign: "center",
                        padding: "0.5rem",
                        backgroundColor: message.includes('success') ? "#d1fae5" : "#fee2e2",
                        borderRadius: "0.25rem"
                    }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
