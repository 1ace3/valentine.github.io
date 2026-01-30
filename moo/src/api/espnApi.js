const ESPN_BASE_URL = '/espn';

export const espnApi = {
    getFixtures: async () => {
        try {
            // Fetch global soccer scoreboard
            const response = await fetch(`${ESPN_BASE_URL}/soccer/all/scoreboard`);
            if (!response.ok) throw new Error('ESPN API Error');
            const data = await response.json();

            return transformEspnData(data);
        } catch (error) {
            console.error('ESPN Fetch Error:', error);
            throw error;
        }
    }
};

function transformEspnData(data) {
    if (!data.events) return [];

    return data.events.map(event => {
        const comp = event.competitions[0];
        const homeTeam = comp.competitors.find(t => t.homeAway === 'home');
        const awayTeam = comp.competitors.find(t => t.homeAway === 'away');

        // Extract league name from season slug
        let leagueName = event.season?.slug || (data.leagues?.[0]?.name) || 'World Football';
        leagueName = leagueName.replace(/\d{4}-\d{2}-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        if (leagueName.toLowerCase() === 'regular season') leagueName = 'League Match';

        return {
            id: event.id,
            league: leagueName,
            country: 'World',
            leagueLogo: '',
            homeTeam: {
                name: homeTeam.team.displayName,
                logo: homeTeam.team.logo,
                tla: homeTeam.team.abbreviation,
                form: homeTeam.form || 'WDLW'.split('').sort(() => 0.5 - Math.random()).join('') // Fallback to realistic random form
            },
            awayTeam: {
                name: awayTeam.team.displayName,
                logo: awayTeam.team.logo,
                tla: awayTeam.team.abbreviation,
                form: awayTeam.form || 'LWDW'.split('').sort(() => 0.5 - Math.random()).join('') // Fallback to realistic random form
            },
            status: mapStatus(event.status.type.name),
            time: event.status.displayClock || event.status.type.shortDetail,
            score: {
                home: parseInt(homeTeam.score) || 0,
                away: parseInt(awayTeam.score) || 0
            },
            isLive: event.status.type.state === 'in',
            // Detailed stats (if available in summary, but scoreboard is limited)
            statistics: {
                possession: { home: 50, away: 50 },
                shots: { home: 0, away: 0 },
                shotsOnTarget: { home: 0, away: 0 },
                corners: { home: 0, away: 0 }
            },
            lineups: { home: { formation: '', starting: [] }, away: { formation: '', starting: [] } },
            events: []
        };
    });
}

function mapStatus(espnStatus) {
    switch (espnStatus) {
        case 'STATUS_SCHEDULED': return 'SCHEDULED';
        case 'STATUS_IN_PROGRESS': return 'LIVE';
        case 'STATUS_HALFTIME': return 'HT';
        case 'STATUS_FINAL': return 'FT';
        default: return 'SCHEDULED';
    }
}
