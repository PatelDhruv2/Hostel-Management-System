'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SigninForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Signin successful!');
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on user type
                if (data.user.isAdmin) {
                    router.push('/AdminDashboard');
                } else {
                    router.push('/Dashboard');
                }
            } else {
                setMessage(data.error || 'Signin failed');
            }
        } catch (error) {
            setMessage('Error connecting to server');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: '#F8FAFC',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                backgroundColor: '#D9EAFD',
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>Sign In</h2>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%'
                }}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        onChange={handleChange} 
                        style={{
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #BCCCDC',
                            fontSize: '1rem',
                            backgroundColor: '#fff'
                        }} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        style={{
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #BCCCDC',
                            fontSize: '1rem',
                            backgroundColor: '#fff'
                        }} 
                        required 
                    />
                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: '#9AA6B2',
                            color: 'white',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '0.5rem'
                        }}
                    >
                        Sign In
                    </button>
                </form>
                {message && <p style={{
                    marginTop: '1rem',
                    color: message.includes('successful') ? 'green' : 'red',
                    textAlign: 'center'
                }}>{message}</p>}
            </div>
        </div>
    );
}
