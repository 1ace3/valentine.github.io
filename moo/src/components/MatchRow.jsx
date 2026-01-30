import React from 'react';
import { Star } from 'lucide-react';

const MatchRow = ({ match, onClick }) => {
    const [homeLogoError, setHomeLogoError] = React.useState(false);
    const [awayLogoError, setAwayLogoError] = React.useState(false);

    const TeamLogo = ({ team, isError, onError, size = "18px" }) => {
        if (isError || !team.logo) {
            return (
                <div style={{
                    width: size,
                    height: size,
                    background: '#222',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px',
                    color: '#888',
                    fontWeight: 'bold'
                }}>
                    {team.tla || team.name?.substring(0, 3)}
                </div>
            );
        }

        return (
            <img
                src={team.logo}
                alt={team.name}
                style={{ width: size, height: size, objectFit: 'contain' }}
                onError={onError}
                loading="lazy"
            />
        );
    };

    return (
        <div
            onClick={() => onClick(match)}
            style={{
                background: 'var(--bg-card)',
                borderBottom: '1px solid #1a1a1a',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 0.1s ease',
            }}
            className="match-row-hover"
        >
            {/* Time/Status (Far Left) */}
            <div style={{
                width: '50px',
                flexShrink: 0,
                fontSize: '11px',
                fontWeight: '700',
                color: match.isLive ? 'var(--accent-orange)' : 'var(--text-secondary)',
                textAlign: 'left'
            }}>
                {match.time}
            </div>

            {/* Teams (Center) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TeamLogo team={match.homeTeam} isError={homeLogoError} onError={() => setHomeLogoError(true)} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#eee' }}>{match.homeTeam.name}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: match.isLive ? 'var(--accent-orange)' : '#fff', paddingRight: '20px' }}>
                        {match.score.home}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TeamLogo team={match.awayTeam} isError={awayLogoError} onError={() => setAwayLogoError(true)} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#eee' }}>{match.awayTeam.name}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: match.isLive ? 'var(--accent-orange)' : '#fff', paddingRight: '20px' }}>
                        {match.score.away}
                    </span>
                </div>
            </div>

            {/* Favorite Icon (Far Right) */}
            <div style={{ color: '#2a2a2a' }}>
                <Star size={16} fill="none" />
            </div>
        </div>
    );
};

export default MatchRow;
