'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaUserMinus, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function ViewCommitteeMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Fetch all members
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/getcommitteeMembers');
                const data = await res.json();

                if (res.ok) {
                    setMembers(data);
                } else {
                    setError(data.error || 'Failed to fetch members');
                }
            } catch (err) {
                setError('Server error while fetching members.');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    // Handle removing a committee member
    const handleRemoveMember = async (id) => {
        if (window.confirm('Are you sure you want to remove this member?')) {
            try {
                const res = await fetch(`http://localhost:5000/api/removeCommitteeMember/${id}`, {
                    method: 'DELETE',
                });
                const data = await res.json();

                if (res.ok) {
                    setMessage('Member removed successfully!');
                    setMembers(members.filter((member) => member.id !== id));
                } else {
                    setMessage(data.error || 'Failed to remove member');
                }
            } catch (err) {
                setMessage('Server error while removing the member.');
            }
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#F8FAFC', 
            color: '#333', 
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '2rem'
            }}>
                <h2 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem', 
                    textAlign: 'center',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '2px solid #D9EAFD',
                    paddingBottom: '0.75rem'
                }}>
                    <FaUsers style={{ marginRight: '0.75rem', color: '#9AA6B2' }} />
                    Hostel Committee Members
                </h2>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <FaSpinner style={{ 
                            fontSize: '2rem', 
                            color: '#BCCCDC', 
                            animation: 'spin 1s linear infinite' 
                        }} />
                        <p style={{ marginTop: '1rem', color: '#9AA6B2' }}>Loading members...</p>
                        <style jsx global>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                )}
                
                {error && (
                    <div style={{ 
                        textAlign: 'center', 
                        color: '#E53E3E', 
                        padding: '1rem',
                        backgroundColor: '#FFF5F5',
                        borderRadius: '4px',
                        border: '1px solid #FED7D7',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaExclamationCircle style={{ marginRight: '0.5rem' }} />
                        {error}
                    </div>
                )}
                
                {message && (
                    <div style={{ 
                        textAlign: 'center', 
                        color: '#38A169', 
                        padding: '1rem',
                        backgroundColor: '#F0FFF4',
                        borderRadius: '4px',
                        border: '1px solid #C6F6D5',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaCheckCircle style={{ marginRight: '0.5rem' }} />
                        {message}
                    </div>
                )}

                {!loading && !error && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ 
                            width: '100%', 
                            backgroundColor: '#FFFFFF', 
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            borderCollapse: 'collapse'
                        }}>
                            <thead style={{ backgroundColor: '#D9EAFD', textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '0.75rem', borderTopLeftRadius: '8px', fontWeight: '600', color: '#4A5568' }}>Name</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#4A5568' }}>Position</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#4A5568' }}>Contact</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#4A5568' }}>Email</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#4A5568' }}>Gender</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#4A5568' }}>Date of Join</th>
                                    <th style={{ padding: '0.75rem', borderTopRightRadius: '8px', fontWeight: '600', color: '#4A5568' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => (
                                    <tr key={member.id} style={{ 
                                        borderTop: '1px solid #BCCCDC',
                                        backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                                        transition: 'background-color 0.2s'
                                    }}>
                                        <td style={{ padding: '0.75rem' }}>{member.name}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.position}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.contact_number}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.email}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.gender}</td>
                                        <td style={{ padding: '0.75rem' }}>{new Date(member.date_of_join).toLocaleDateString()}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
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
                                                <FaUserMinus style={{ marginRight: '0.5rem' }} />
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
