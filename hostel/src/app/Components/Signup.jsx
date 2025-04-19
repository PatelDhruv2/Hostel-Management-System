'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('✅ Signup successful!');
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push(`/CompleteProfile?email=${formData.email}`);
            } else {
                setMessage(data.error || 'Signup failed');
            }
        } catch (error) {
            setMessage('⚠️ Error connecting to server');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            padding: '1.5rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                backgroundColor: '#D9EAFD',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '2rem',
                width: '100%',
                maxWidth: '450px',
                transition: 'all 0.3s ease'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '0.5rem'
                }}>Create an Account</h2>
                <p style={{
                    color: '#666',
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                }}>Sign up to get started</p>

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                border: '1px solid #BCCCDC',
                                padding: '0.75rem',
                                paddingLeft: '2.5rem',
                                borderRadius: '8px',
                                color: '#333',
                                backgroundColor: 'white',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            required
                        />
                        <div style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9AA6B2',
                            fontSize: '1.25rem'
                        }}>👤</div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                border: '1px solid #BCCCDC',
                                padding: '0.75rem',
                                paddingLeft: '2.5rem',
                                borderRadius: '8px',
                                color: '#333',
                                backgroundColor: 'white',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            required
                        />
                        <div style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9AA6B2',
                            fontSize: '1.25rem'
                        }}>✉️</div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                border: '1px solid #BCCCDC',
                                padding: '0.75rem',
                                paddingLeft: '2.5rem',
                                borderRadius: '8px',
                                color: '#333',
                                backgroundColor: 'white',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            required
                        />
                        <div style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9AA6B2',
                            fontSize: '1.25rem'
                        }}>🔒</div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#9AA6B2',
                            color: 'white',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? '0.7' : '1',
                            transition: 'all 0.3s ease',
                            marginTop: '0.5rem'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                {message && (
                    <p style={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: message.includes('✅') ? '#10B981' : '#EF4444'
                    }}>
                        {message}
                    </p>
                )}

                <p style={{
                    marginTop: '1.5rem',
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    color: '#666'
                }}>
                    Already have an account?{' '}
                    <a href="/signin" style={{
                        color: '#9AA6B2',
                        textDecoration: 'none',
                        fontWeight: '500'
                    }}>
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
