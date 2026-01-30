import React from 'react';
import MatchRow from './MatchRow';
import { ChevronRight } from 'lucide-react';

const CompetitionGroup = ({ league, matches, onMatchClick }) => {
    const country = matches[0]?.country || "World";
    const leagueLogo = matches[0]?.leagueLogo || "";

    return (
        <div style={{ marginBottom: '1px', background: 'var(--bg-primary)' }}>
            {/* League Header */}
            <div style={{
                background: '#1a1a1a',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid #111'
            }}>
                {/* Optional League Badge */}
                <div style={{
                    width: '18px',
                    height: '18px',
                    background: '#2a2a2a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px'
                }}>
                    🏆
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#fff',
                        letterSpacing: '0.2px'
                    }}>
                        {league.toUpperCase()}
                    </div>
                    <div style={{
                        fontSize: '10px',
                        color: '#999',
                        fontWeight: '500',
                        marginTop: '-1px'
                    }}>
                        {country}
                    </div>
                </div>
                <ChevronRight size={14} color="#555" />
            </div>

            {/* Matches */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {matches.map((match) => (
                    <MatchRow key={match.id} match={match} onClick={onMatchClick} />
                ))}
            </div>
        </div>
    );
};

export default CompetitionGroup;
