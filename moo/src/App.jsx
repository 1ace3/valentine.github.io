import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, WifiOff } from 'lucide-react';
import Header from './components/Header';
import CompetitionGroup from './components/CompetitionGroup';
import MatchDetails from './components/MatchDetails';
import { getMatchesForDate } from './api/mockData';
import { apiFootball } from './api/apiFootball';
import { footballApi } from './api/footballApi';
import { espnApi } from './api/espnApi';
import { datahubApi } from './api/datahubApi';
import { t, getLanguage } from './api/translations';

function App() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const lang = getLanguage();

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      console.log('🔄 Fetching matches for:', currentDate.toDateString());
      try {
        // Try ESPN first (No keys required)
        let data = [];
        try {
          data = await espnApi.getFixtures();
          console.log('✅ ESPN Success:', data.length, 'matches');
        } catch (espnErr) {
          console.warn('⚠️ ESPN failed, trying secondary APIs:', espnErr.message);
          data = await apiFootball.getFixturesByDate(currentDate);
        }

        setMatches(data);
        setUsingMockData(false);
      } catch (err) {
        console.warn('⚠️ Main APIs failed, trying fallback:', err.message);
        try {
          const data = await footballApi.getFixturesByDate(currentDate);
          setMatches(data);
          setUsingMockData(false);
        } catch (apiErr) {
          console.error('❌ All APIs failed. Using premium simulation.');
          const mockData = getMatchesForDate(currentDate);
          setMatches(mockData);
          setUsingMockData(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, [currentDate]);

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());
  const isToday = currentDate.toDateString() === new Date().toDateString();

  const filteredMatches = matches.filter(match => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'LIVE') return match.status === 'LIVE' || match.status === 'HT';
    if (activeTab === 'FINISHED') return match.status === 'FT';
    if (activeTab === 'UPCOMING') return match.status === 'SCHEDULED';
    return true;
  });

  // Group matches by league
  const groupedMatches = filteredMatches.reduce((acc, match) => {
    if (!acc[match.league]) acc[match.league] = [];
    acc[match.league].push(match);
    return acc;
  }, {});

  const formatDate = (date) => {
    return date.toLocaleDateString(t('locale'), { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const btnStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Header />

      <main className="container" style={{ padding: '0 10px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Date Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px 0',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '20px'
        }}>
          <button onClick={() => changeDate(-1)} style={btnStyle}><ChevronLeft /></button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', minWidth: '200px', justifyContent: 'center' }}>
            <Calendar size={18} color="var(--accent-orange)" />
            <span>{isToday ? t('today') : formatDate(currentDate).toUpperCase()}</span>
          </div>

          <button onClick={() => changeDate(1)} style={btnStyle}><ChevronRight /></button>

          {!isToday && (
            <button onClick={goToToday} style={{
              background: 'var(--accent-orange)',
              border: 'none',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>{t('today')}</button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
          {['ALL', 'LIVE', 'UPCOMING', 'FINISHED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: 'none',
                background: activeTab === tab ? 'var(--accent-orange)' : '#222',
                color: activeTab === tab ? 'white' : '#888',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {t(tab.toLowerCase())}
            </button>
          ))}
        </div>

        {/* DataHub Featured Card */}
        <div style={{
          background: 'linear-gradient(45deg, #1a1a1a, #0a0a0a)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '30px',
          border: '1px solid #333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>Awesome Football Datasets</h4>
            <p style={{ fontSize: '12px', color: '#888' }}>Enriching your experience with DataHub.io collections</p>
          </div>
          <a href="https://datahub.io/collections/football" target="_blank" rel="noreferrer" style={{
            fontSize: '11px',
            color: 'var(--accent-orange)',
            textDecoration: 'none',
            fontWeight: 'bold',
            border: '1px solid var(--accent-orange)',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>EXPLORE</a>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
            <p style={{ color: '#888' }}>{t('loading')}</p>
          </div>
        )}

        {!loading && Object.keys(groupedMatches).length > 0 ? (
          Object.keys(groupedMatches).map(league => (
            <CompetitionGroup
              key={league}
              league={league}
              matches={groupedMatches[league]}
              onMatchClick={(match) => setSelectedMatch(match)}
            />
          ))
        ) : !loading && (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#666' }}>
            {t('noMatches')}
          </div>
        )}
      </main>

      {selectedMatch && (
        <MatchDetails match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}

      <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid #1a1a1a', marginTop: 'auto' }}>
        <div style={{ marginBottom: '20px', fontSize: '12px', color: '#555' }}>
          Data provided by <span style={{ color: 'var(--accent-orange)' }}>ESPN</span> & <span style={{ color: 'var(--accent-orange)' }}>DataHub.io</span>
        </div>
        <p style={{ color: '#666', fontSize: '12px' }}>{t('footer')}</p>
      </footer>
    </div>
  );
}

export default App;
