'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaSpinner } from 'react-icons/fa';

export default function ViewCommitteeMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem', 
                    textAlign: 'center',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <FaUsers style={{ marginRight: '0.75rem', color: '#9AA6B2' }} />
                    Hostel Committee Members
                </h2>

                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <FaSpinner style={{ fontSize: '2rem', color: '#BCCCDC', animation: 'spin 1s linear infinite' }} />
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
                    <p style={{ 
                        textAlign: 'center', 
                        color: '#E53E3E', 
                        padding: '1rem',
                        backgroundColor: '#FFF5F5',
                        borderRadius: '4px',
                        border: '1px solid #FED7D7'
                    }}>{error}</p>
                )}

                {!loading && !error && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ 
                            width: '100%', 
                            backgroundColor: '#D9EAFD', 
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            borderCollapse: 'collapse'
                        }}>
                            <thead style={{ backgroundColor: '#BCCCDC', textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '0.75rem', borderTopLeftRadius: '8px' }}>Name</th>
                                    <th style={{ padding: '0.75rem' }}>Position</th>
                                    <th style={{ padding: '0.75rem' }}>Contact</th>
                                    <th style={{ padding: '0.75rem' }}>Email</th>
                                    <th style={{ padding: '0.75rem' }}>Gender</th>
                                    <th style={{ padding: '0.75rem', borderTopRightRadius: '8px' }}>Date of Join</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => (
                                    <tr key={member.id} style={{ 
                                        borderTop: '1px solid #BCCCDC',
                                        backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF'
                                    }}>
                                        <td style={{ padding: '0.75rem' }}>{member.name}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.position}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.contact_number}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.email}</td>
                                        <td style={{ padding: '0.75rem' }}>{member.gender}</td>
                                        <td style={{ padding: '0.75rem' }}>{new Date(member.date_of_join).toLocaleDateString()}</td>
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
