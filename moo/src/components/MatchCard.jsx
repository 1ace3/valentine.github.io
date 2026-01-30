import React from 'react';
import LiveBadge from './LiveBadge';

const MatchCard = ({ match }) => {
    const cardClass = `glass match-card ${match.isLive ? 'match-card-live' : ''}`;
    const [homeLogoError, setHomeLogoError] = React.useState(false);
    const [awayLogoError, setAwayLogoError] = React.useState(false);

    const TeamLogo = ({ team, isError, onError }) => (
        <div style={{
            width: '56px',
            height: '56px',
            background: isError ? 'linear-gradient(135deg, #374151, #4b5563)' : 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            transition: 'transform 0.3s'
        }}>
            {isError ? (
                <span style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                }}>
                    {team.tla || team.name.substring(0, 3)}
                </span>
            ) : (
                <img
                    src={team.logo}
                    alt={team.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={onError}
                    loading="lazy"
                />
            )}
        </div>
    );

    return (
        <div className={cardClass} style={{
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--spacing-md)',
            cursor: 'pointer'
        }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    fontWeight: 600
                }}>
                    {match.league}
                </span>
                <LiveBadge status={match.status} time={match.time} isLive={match.isLive} />
            </div>

            <div className="flex-between" style={{ marginTop: 'var(--spacing-lg)', gap: 'var(--spacing-md)' }}>
                {/* Home Team */}
                <div className="flex-center" style={{ flexDirection: 'column', gap: 'var(--spacing-sm)', flex: 1 }}>
                    <TeamLogo
                        team={match.homeTeam}
                        isError={homeLogoError}
                        onError={() => setHomeLogoError(true)}
                    />
                    <span style={{ fontWeight: 600, textAlign: 'center', fontSize: '0.875rem' }}>{match.homeTeam.name}</span>
                </div>

                {/* Score */}
                <div className="flex-center" style={{
                    background: match.isLive
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.08))'
                        : 'rgba(0,0,0,0.4)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    margin: '0 var(--spacing-sm)',
                    minWidth: '100px',
                    border: match.isLive ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                    boxShadow: match.isLive ? '0 0 10px rgba(16, 185, 129, 0.1)' : 'none'
                }}>
                    <span style={{
                        fontSize: match.status === 'SCHEDULED' ? '0.875rem' : '1.5rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em'
                    }}>
                        {match.status === 'SCHEDULED' ? 'VS' : `${match.score.home} - ${match.score.away}`}
                    </span>
                </div>

                {/* Away Team */}
                <div className="flex-center" style={{ flexDirection: 'column', gap: 'var(--spacing-sm)', flex: 1 }}>
                    <TeamLogo
                        team={match.awayTeam}
                        isError={awayLogoError}
                        onError={() => setAwayLogoError(true)}
                    />
                    <span style={{ fontWeight: 600, textAlign: 'center', fontSize: '0.875rem' }}>{match.awayTeam.name}</span>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
