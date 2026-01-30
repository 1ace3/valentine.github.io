import React from 'react';

const LiveBadge = ({ status, time, isLive }) => {
    if (isLive) {
        return (
            <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--color-live)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                <span className="live-indicator"></span>
                <span>{time}</span>
            </div>
        );
    }

    return (
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
            {status === 'FT' ? 'Full Time' : time}
        </div>
    );
};

export default LiveBadge;
