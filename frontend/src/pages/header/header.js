import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header style={{
            backgroundColor: '#1976d2', // Material blue
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '0',
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '100vw',
                height: '48px',
                padding: '0 1.5rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Hamburger Icon */}
                    <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="4" width="24" height="2" rx="1" fill="white"/>
                            <rect y="11" width="24" height="2" rx="1" fill="white"/>
                            <rect y="18" width="24" height="2" rx="1" fill="white"/>
                        </svg>
                    </span>
                    <span style={{ color: 'white', fontWeight: 500, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                        Book App
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '1.2rem' }}>
                    <Link to="/login" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        letterSpacing: '0.5px',
                    }}>LOGIN</Link>
                    <Link to="/register" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        letterSpacing: '0.5px',
                    }}>REGISTER</Link>
                </div>
            </nav>
        </header>
    );
}
