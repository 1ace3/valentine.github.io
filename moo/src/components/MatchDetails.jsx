import React from 'react';
import { X, Activity, Users, Layout } from 'lucide-react';
import { t } from '../api/translations';

const MatchDetails = ({ match, onClose }) => {
    const isLiveOrFinished = match.status === 'LIVE' || match.status === 'HT' || match.status === 'FT';
    const [lineupView, setLineupView] = React.useState('TACTICAL');

    const availableTabs = [
        { id: 'STATS', label: t('stats'), icon: <Activity size={18} />, hidden: !isLiveOrFinished },
        { id: 'LINEUPS', label: t('lineups'), icon: <Users size={18} /> },
        { id: 'EVENTS', label: t('events'), icon: <Layout size={18} />, hidden: !isLiveOrFinished },
    ].filter(tab => !tab.hidden);

    const [activeTab, setActiveTab] = React.useState(availableTabs[0]?.id || 'LINEUPS');

    if (!match) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                background: '#0a0a0a',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid #222'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid #222', position: 'relative' }}>
                    <button onClick={onClose} style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        background: 'none',
                        border: 'none',
                        color: '#888',
                        cursor: 'pointer'
                    }}><X /></button>

                    <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>
                        {match.league}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <img src={match.homeTeam.logo} alt="" style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                            <div style={{ fontWeight: 'bold' }}>{match.homeTeam.name}</div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                                {match.score.home} - {match.score.away}
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--accent-orange)', fontWeight: 'bold' }}>
                                {match.isLive ? match.time : (t(`matchStatus.${match.status}`) || match.status)}
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <img src={match.awayTeam.logo} alt="" style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                            <div style={{ fontWeight: 'bold' }}>{match.awayTeam.name}</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #222' }}>
                    {availableTabs.map(tab => (
                        <button key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: 'none',
                                border: 'none',
                                color: activeTab === tab.id ? 'var(--accent-orange)' : '#888',
                                borderBottom: activeTab === tab.id ? '2px solid var(--accent-orange)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                            {tab.icon}
                            <span className="hide-mobile">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    {!isLiveOrFinished && (
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '16px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Recent Form (Last 4)
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 40px' }}>
                                <TeamForm results={match.homeTeam.form} />
                                <TeamForm results={match.awayTeam.form} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'STATS' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <StatRow label={t('possession')} home={match.statistics.possession.home} away={match.statistics.possession.away} suffix="%" />
                            <StatRow label={t('shots')} home={match.statistics.shots.home} away={match.statistics.shots.away} />
                            <StatRow label={t('shotsOnTarget')} home={match.statistics.shotsOnTarget.home} away={match.statistics.shotsOnTarget.away} />
                            <StatRow label={t('corners')} home={match.statistics.corners.home} away={match.statistics.corners.away} />
                        </div>
                    )}

                    {activeTab === 'LINEUPS' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Toggle View (Premium Touch) */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <button onClick={() => setLineupView('TACTICAL')} style={{
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    border: lineupView === 'TACTICAL' ? 'none' : '1px solid #333',
                                    background: lineupView === 'TACTICAL' ? 'var(--accent-orange)' : 'transparent',
                                    color: 'white',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>TACTICAL</button>
                                <button onClick={() => setLineupView('LIST')} style={{
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    border: lineupView === 'LIST' ? 'none' : '1px solid #333',
                                    background: lineupView === 'LIST' ? 'var(--accent-orange)' : 'transparent',
                                    color: 'white',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>LIST</button>
                            </div>

                            {lineupView === 'TACTICAL' && match.lineups.home.starting.length > 0 ? (
                                <TacticalField match={match} />
                            ) : (
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--accent-orange)' }}>{match.homeTeam.name} ({match.lineups.home.formation || 'N/A'})</div>
                                        {match.lineups.home.starting.length > 0 ? match.lineups.home.starting.map((p, i) => (
                                            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #222', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src={p.img || 'https://i.pravatar.cc/150'} style={{ width: '24px', height: '24px', borderRadius: '50%' }} alt="" />
                                                <span>{p.name}</span>
                                            </div>
                                        )) : <div style={{ color: '#555', fontSize: '13px' }}>Lineups not yet released</div>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--accent-orange)' }}>{match.awayTeam.name} ({match.lineups.away.formation || 'N/A'})</div>
                                        {match.lineups.away.starting.length > 0 ? match.lineups.away.starting.map((p, i) => (
                                            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #222', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src={p.img || 'https://i.pravatar.cc/150'} style={{ width: '24px', height: '24px', borderRadius: '50%' }} alt="" />
                                                <span>{p.name}</span>
                                            </div>
                                        )) : <div style={{ color: '#555', fontSize: '13px' }}>Lineups not yet released</div>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'EVENTS' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {match.events.length > 0 ? match.events.map((event, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    flexDirection: event.team === 'home' ? 'row' : 'row-reverse'
                                }}>
                                    <div style={{ width: '30px', fontWeight: 'bold', color: '#888' }}>{event.minute}'</div>
                                    <div style={{
                                        background: '#1a1a1a',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        justifyContent: event.team === 'home' ? 'flex-start' : 'flex-end'
                                    }}>
                                        {event.type === 'GOAL' && <span>⚽</span>}
                                        {event.type === 'YELLOW_CARD' && <div style={{ width: '12px', height: '16px', background: '#ffd700', borderRadius: '2px' }} />}
                                        {event.type === 'RED_CARD' && <div style={{ width: '12px', height: '16px', background: '#ff4b00', borderRadius: '2px' }} />}
                                        <span style={{ fontWeight: '500' }}>{event.player}</span>
                                    </div>
                                </div>
                            )) : <div style={{ textAlign: 'center', color: '#555', padding: '20px' }}>No events recorded for this match</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TeamForm = ({ results }) => {
    if (!results) return null;
    const items = results.substring(0, 4).split('');

    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {items.map((res, i) => (
                <div key={i} style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: 'white',
                    background: res === 'W' ? '#2ecc71' : res === 'L' ? '#e74c3c' : '#95a5a6'
                }}>
                    {res}
                </div>
            ))}
        </div>
    );
};

const POSITION_MAP = {
    'GK': { bottom: '5%', left: '50%' },
    'RB': { bottom: '20%', left: '85%' },
    'CB': { bottom: '20%', left: '35%', second: { left: '65%' } },
    'LB': { bottom: '20%', left: '15%' },
    'RM': { bottom: '45%', left: '85%' },
    'CM': { bottom: '45%', left: '25%', second: { left: '50%' }, third: { left: '75%' } },
    'LM': { bottom: '45%', left: '15%' },
    'RW': { bottom: '75%', left: '85%' },
    'ST': { bottom: '75%', left: '50%', second: { left: '35%' }, third: { left: '65%' } },
    'LW': { bottom: '75%', left: '15%' }
};

const TacticalField = ({ match }) => {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            paddingTop: '140%', // Aspect ratio of the field
            background: `url(/C:/Users/lenovo/.gemini/antigravity/brain/f3ae2d12-d5bc-457f-b700-c2d60247cbcd/football_pitch_premium_1767189095711.png)`,
            backgroundSize: 'cover',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
            border: '1px solid #333'
        }}>
            {/* Home Team (Bottom) */}
            {renderPlayers(match.lineups.home.starting, 'home')}

            {/* Away Team (Top - Inverted) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(180deg)' }}>
                {renderPlayers(match.lineups.away.starting, 'away')}
            </div>
        </div>
    );
};

const renderPlayers = (players, team) => {
    const counts = {};
    return players.map((p, i) => {
        counts[p.pos] = (counts[p.pos] || 0) + 1;
        let pos = { ...POSITION_MAP[p.pos] };
        if (counts[p.pos] === 2 && pos.second) pos = { ...pos, ...pos.second };
        if (counts[p.pos] === 3 && pos.third) pos = { ...pos, ...pos.third };

        return (
            <div key={i} style={{
                position: 'absolute',
                bottom: pos.bottom,
                left: pos.left,
                transform: 'translate(-50%, 50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: `2px solid ${team === 'home' ? 'var(--accent-orange)' : '#eee'}`,
                    background: '#1a1a1a',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    transform: team === 'away' ? 'rotate(180deg)' : 'none'
                }}>
                    <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: 'white',
                    padding: '2px 4px',
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: '4px',
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    transform: team === 'away' ? 'rotate(180deg)' : 'none'
                }}>{p.name.split(' ').pop()}</div>
            </div>
        );
    });
};
