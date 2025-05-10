import React from 'react';

const Maintenance = () => (
  <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ef 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{
      background: 'white',
      padding: '3rem 2.5rem',
      borderRadius: '1.5rem',
      boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10)',
      border: '1px solid #e0e7ef',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 420
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.2rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>
        🛠️
      </div>
      <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: '#2563eb', marginBottom: '1rem', textAlign: 'center', letterSpacing: '0.01em', textShadow: '0 2px 16px #bae6fd' }}>
        Under Maintenance
      </h1>
      <p style={{ fontSize: '1.15rem', color: '#334155', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 500 }}>
        We're making some improvements to serve you better.<br />
        Please check back soon!
      </p>
      <p style={{ fontSize: '0.98rem', color: '#64748b', textAlign: 'center', marginTop: '1.2rem' }}>
        If you need urgent help, contact us at <a href="mailto:support@cmtai.in" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>support@cmtai.in</a>
      </p>
    </div>
  </div>
);

export default Maintenance; 