// API Configuration for API-Football (RapidAPI)
const API_BASE_URL = '/rapidapi/v3';

// Get API key from environment variable (User needs to add this to .env)
const RAPID_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const RAPID_API_HOST = 'api-football-v1.p.rapidapi.com';

export const apiFootball = {
    // Fetch fixtures for a specific date
    async getFixturesByDate(date) {
        if (!RAPID_API_KEY) {
            throw new Error('RapidAPI Key is missing');
        }

        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await fetch(
                `${API_BASE_URL}/fixtures?date=${formattedDate}`,
                {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': RAPID_API_KEY,
                        'X-RapidAPI-Host': RAPID_API_HOST
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 403 || response.status === 401) {
                    throw new Error('API Access Forbidden or invalid key');
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return transformApiData(data.response);
        } catch (error) {
            console.error('API-Football Error:', error);
            throw error;
        }
    }
};

// Helper: Transform API-Football data to our app format
function transformApiData(fixtures) {
    if (!fixtures || !Array.isArray(fixtures)) {
        return [];
    }

    return fixtures.map((item) => {
        const { fixture, league, teams, goals } = item;

        let status = 'SCHEDULED';
        let isLive = false;
        let timeDisplay = fixture.status.short;

        if (['1H', '2H', 'ET', 'P'].includes(fixture.status.short)) {
            status = 'LIVE';
            isLive = true;
            timeDisplay = fixture.status.elapsed + "'";
        } else if (fixture.status.short === 'HT') {
            status = 'LIVE';
            isLive = true;
            timeDisplay = 'HT';
        } else if (['FT', 'AET', 'PEN'].includes(fixture.status.short)) {
            status = 'FT';
            timeDisplay = 'FT';
        } else if (fixture.status.short === 'NS') {
            const date = new Date(fixture.date);
            timeDisplay = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        return {
            id: fixture.id,
            league: league.name,
            homeTeam: {
                name: teams.home.name,
                logo: teams.home.logo,
                tla: teams.home.name.substring(0, 3).toUpperCase()
            },
            awayTeam: {
                name: teams.away.name,
                logo: teams.away.logo,
                tla: teams.away.name.substring(0, 3).toUpperCase()
            },
            status: status,
            time: timeDisplay,
            score: {
                home: goals.home ?? 0,
                away: goals.away ?? 0
            },
            isLive: isLive,
            // Additional details for modal
            statistics: {
                possession: { home: 50, away: 50 }, // Placeholder if not available in daily fetch
                shots: { home: 0, away: 0 },
                shotsOnTarget: { home: 0, away: 0 },
                corners: { home: 0, away: 0 }
            },
            lineups: {
                home: { formation: 'N/A', starting: [] },
                away: { formation: 'N/A', starting: [] }
            },
            events: []
        };
    });
}

export default apiFootball;
