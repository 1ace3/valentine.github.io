import React from 'react';

const Header = () => {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '16px 0'
        }}>
            <div className="container">
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    margin: 0,
                    color: 'var(--text-primary)'
                }}>
                    LiveScore
                </h1>
            </div>
        </header>
    );
};

export default Header;
