// Use relative path for Vite proxy to bypass CORS
const API_BASE_URL = '/v4';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_FOOTBALL_DATA_API_KEY || '';

// API Service for fetching live football data
export const footballApi = {
    // Fetch all matches for today
    async getTodayMatches() {
        try {
            const response = await fetch(
                `${API_BASE_URL}/matches`,
                {
                    method: 'GET',
                    headers: {
                        'X-Auth-Token': API_KEY
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Invalid API key or access forbidden');
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return transformApiData(data.matches);
        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    },

    // Fetch fixtures for a specific date
    async getFixturesByDate(date) {
        try {
            const formattedDate = formatDateForAPI(date);
            const competitions = ['PL', 'PD', 'BL1', 'SA', 'FL1', 'CL']; // Free tier leagues

            // On free tier, we often have to fetch competitions specifically or just /matches
            // Let's try /matches with date filter first but catch the error specifically
            const response = await fetch(
                `${API_BASE_URL}/matches?dateFrom=${formattedDate}&dateTo=${formattedDate}`,
                {
                    method: 'GET',
                    headers: {
                        'X-Auth-Token': API_KEY
                    }
                }
            );

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('API Error details:', errorBody);

                if (response.status === 403) {
                    throw new Error('This competition or date range is not available on the free tier.');
                }
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return transformApiData(data.matches);
        } catch (error) {
            console.error('Error fetching fixtures:', error);
            throw error;
        }
    }
};

// Helper: Format date for API (YYYY-MM-DD)
function formatDateForAPI(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper: Transform API data to our app format
function transformApiData(matches) {
    if (!matches || !Array.isArray(matches)) {
        return [];
    }

    return matches.map((match) => {
        const { id, utcDate, status, homeTeam, awayTeam, score, competition } = match;

        // Determine match status and time display
        let matchStatus = 'SCHEDULED';
        let isLive = false;
        let timeDisplay = formatTimeDisplay(utcDate, status);

        if (status === 'IN_PLAY' || status === 'PAUSED') {
            matchStatus = 'LIVE';
            isLive = true;
            timeDisplay = status === 'PAUSED' ? 'HT' : 'LIVE';
        } else if (status === 'FINISHED') {
            matchStatus = 'FT';
            timeDisplay = 'Full Time';
        } else if (status === 'TIMED' || status === 'SCHEDULED') {
            matchStatus = 'SCHEDULED';
        } else if (status === 'POSTPONED' || status === 'CANCELLED') {
            matchStatus = 'CANCELLED';
            timeDisplay = 'Cancelled';
        }

        // Get team logos (football-data.org provides crest URLs)
        const homeTeamData = {
            name: homeTeam.shortName || homeTeam.name,
            logo: homeTeam.crest || 'https://via.placeholder.com/100x100?text=' + (homeTeam.tla || 'H')
        };

        const awayTeamData = {
            name: awayTeam.shortName || awayTeam.name,
            logo: awayTeam.crest || 'https://via.placeholder.com/100x100?text=' + (awayTeam.tla || 'A')
        };

        return {
            id: id,
            league: competition.name,
            homeTeam: homeTeamData,
            awayTeam: awayTeamData,
            status: matchStatus,
            time: timeDisplay,
            score: {
                home: score.fullTime.home,
                away: score.fullTime.away
            },
            isLive
        };
    });
}

// Helper: Format time display
function formatTimeDisplay(utcDate, status) {
    if (status === 'TIMED' || status === 'SCHEDULED') {
        const date = new Date(utcDate);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    return status;
}

export default footballApi;
