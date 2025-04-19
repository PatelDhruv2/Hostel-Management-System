'use client';

import { useState } from 'react';

export default function DashboardCard({ title, description, route, onClick, enableHover = false, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onClick={onClick}
      style={{
        padding: '25px 20px',
        background: '#D9EAFD',
        borderRadius: '8px',
        boxShadow: isHovered ? '0 10px 15px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        textAlign: 'center',
        border: '1px solid #BCCCDC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: enableHover ? 'all 0.3s ease' : 'none',
        minHeight: '150px'
      }}
      onMouseOver={() => enableHover && setIsHovered(true)}
      onMouseOut={() => enableHover && setIsHovered(false)}
    >
      {icon && <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>}
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '12px'
      }}>{title}</h3>
      <p style={{
        color: '#555',
        margin: '0',
        fontSize: '14px'
      }}>{description}</p>
    </div>
  );
} 