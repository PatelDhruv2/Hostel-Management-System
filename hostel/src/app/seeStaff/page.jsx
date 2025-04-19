'use client';

import { useEffect, useState } from 'react';
import { FaUserTie, FaTrash, FaSpinner, FaExclamationCircle, FaUsers } from 'react-icons/fa';

export default function ManageStaff() {
    const [staff, setStaff] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the staff data when the component is mounted
        const fetchStaff = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/seeStaff');
                const data = await response.json();

                if (response.ok) {
                    setStaff(data);
                } else {
                    setMessage('Failed to load staff data');
                }
            } catch (error) {
                setMessage('Error connecting to the server');
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    // Function to handle removing a staff member
    const handleRemove = async (staffId) => {
        const confirmRemoval = window.confirm('Are you sure you want to remove this staff member?');
        if (!confirmRemoval) return;

        try {
            const response = await fetch(`http://localhost:5000/api/removeStaff/${staffId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Staff removed successfully');
                setStaff(staff.filter((staffMember) => staffMember.id !== staffId)); // Update the list after removal
            } else {
                setMessage(data.error || 'Failed to remove staff');
            }
        } catch (error) {
            setMessage('Error connecting to the server');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: '#F8FAFC',
            color: '#333',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '1000px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '2rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333',
                    borderBottom: '2px solid #D9EAFD',
                    paddingBottom: '0.75rem'
                }}>
                    <FaUsers style={{ marginRight: '0.75rem', color: '#9AA6B2' }} />
                    Staff List
                </h2>

                {message && (
                    <div style={{
                        color: message.includes('successfully') ? '#38A169' : '#E53E3E',
                        backgroundColor: message.includes('successfully') ? '#F0FFF4' : '#FFF5F5',
                        border: `1px solid ${message.includes('successfully') ? '#C6F6D5' : '#FED7D7'}`,
                        borderRadius: '4px',
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaExclamationCircle style={{ marginRight: '0.5rem' }} />
                        {message}
                    </div>
                )}

                {loading ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem'
                    }}>
                        <FaSpinner style={{
                            fontSize: '2rem',
                            color: '#BCCCDC',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <p style={{ marginTop: '1rem', color: '#9AA6B2' }}>Loading staff data...</p>
                        <style jsx global>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                ) : (
                    <div style={{
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                minWidth: '100%',
                                fontSize: '0.875rem',
                                textAlign: 'left',
                                borderCollapse: 'collapse'
                            }}>
                                <thead style={{ backgroundColor: '#D9EAFD' }}>
                                    <tr>
                                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#4A5568' }}>Name</th>
                                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#4A5568' }}>Role</th>
                                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#4A5568' }}>Contact</th>
                                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#4A5568' }}>Salary</th>
                                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#4A5568' }}>Age</th>
                                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#4A5568' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.length > 0 ? (
                                        staff.map((staffMember, index) => (
                                            <tr key={staffMember.id} style={{
                                                borderTop: '1px solid #BCCCDC',
                                                backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                                                transition: 'background-color 0.2s'
                                            }}>
                                                <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center' }}>
                                                    <FaUserTie style={{ marginRight: '0.5rem', color: '#9AA6B2' }} />
                                                    {staffMember.name}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem' }}>{staffMember.role?.role}</td>
                                                <td style={{ padding: '0.75rem 1rem' }}>{staffMember.contact_number}</td>
                                                <td style={{ padding: '0.75rem 1rem' }}>{staffMember.salary}</td>
                                                <td style={{ padding: '0.75rem 1rem' }}>{staffMember.age}</td>
                                                <td style={{ padding: '0.75rem 1rem' }}>
                                                    <button
                                                        onClick={() => handleRemove(staffMember.id)}
                                                        style={{
                                                            backgroundColor: '#F56565',
                                                            color: 'white',
                                                            padding: '0.5rem 0.75rem',
                                                            borderRadius: '0.25rem',
                                                            border: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontSize: '0.875rem',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E53E3E'}
                                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F56565'}
                                                    >
                                                        <FaTrash style={{ marginRight: '0.5rem' }} />
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                color: '#9AA6B2',
                                                backgroundColor: '#F8FAFC'
                                            }}>No staff available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
