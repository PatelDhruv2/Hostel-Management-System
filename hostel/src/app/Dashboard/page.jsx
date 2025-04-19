"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/");
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.isAdmin) {
            router.push("/AdminDashboard");
            return;
        }

        setUser(user);
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            backgroundColor: '#F8FAFC',
            fontFamily: 'Arial, sans-serif',
            color: '#333'
        }}>
            {/* Navbar */}
            <nav style={{
                width: '100%',
                backgroundColor: '#BCCCDC',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#333'
                }}>Student Dashboard</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        router.push("/signin");
                    }}
                    style={{
                        backgroundColor: '#9AA6B2',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Logout
                </button>
            </nav>

            {/* Welcome Message */}
            <div style={{
                marginTop: '2rem',
                width: '100%',
                maxWidth: '1000px',
                backgroundColor: '#D9EAFD',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: '#333'
                }}>
                    Welcome, {user ? user.name : "Student"}!
                </h2>
            </div>

            {/* Dashboard Sections */}
            <div style={{
                marginTop: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '1000px',
                padding: '0 1rem'
            }}>
                {/* Feedback Section */}
                <div
                    onClick={() => router.push("/Feedback")}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: '#D9EAFD',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>Feedback</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Submit a complaint or issue.</p>
                </div>

                {/* Gate Pass Section */}
                <div
                    onClick={() => router.push("/GatePass")}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: '#D9EAFD',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚪</div>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>Gate Pass</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Request permission for leaving.</p>
                </div>

                {/* View Gate Passes Section */}
                <div
                    onClick={() => router.push("/ViewGatePasses")}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: '#D9EAFD',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>View Gate Passes</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>View your gate pass requests.</p>
                </div>

                {/* Fee Payment Section */}
                <div
                    onClick={() => router.push("/FeePayment")}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: '#D9EAFD',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>Fee Payment</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Submit the Fee details Here</p>
                </div>

                {/* View Mess Menu Section */}
                <div
                    onClick={() => router.push("/ViewMessMenu")}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: '#D9EAFD',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>View Mess Menu</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Check weekly menu items.</p>
                </div>
                <div
                    onClick={() => router.push("/viewHostelCommitteMembers")}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: '#D9EAFD',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>View Hostel Committee Members</h3>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>View Hostel Committee Members</p>
                </div>
            </div>
        </div>
    );
}
