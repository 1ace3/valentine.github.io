const LEAGUES = [
    { name: "National League", country: "England", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Gulf Cup", country: "Gulf Cup", logo: "🌍" },
    { name: "Elite 1", country: "Cameroon", logo: "🇨🇲" },
    { name: "Club Friendlies", country: "World", logo: "🤝" },
    { name: "Premier League", country: "England", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "La Liga", country: "Spain", logo: "🇪🇸" }
];

const REAL_MATCHES = [
    {
        league: "National League",
        home: { name: "Solihull Moors", logo: "https://crests.football-data.org/742.png", tla: "SOL", form: "WDLW" },
        away: { name: "Tamworth", logo: "https://crests.football-data.org/743.png", tla: "TAM", form: "LWDW" },
        startHour: 15,
        realScore: { home: 2, away: 0 }
    },
    {
        league: "Gulf Cup",
        home: { name: "Oman", logo: "https://crests.football-data.org/oman.png", tla: "OMA", form: "WWDL" },
        away: { name: "Saudi Arabia", logo: "https://crests.football-data.org/saudi.png", tla: "KSA", form: "WWWW" },
        startHour: 14,
        realScore: { home: 2, away: 1 }
    },
    {
        league: "Gulf Cup",
        home: { name: "Bahrain", logo: "https://crests.football-data.org/bahrain.png", tla: "BAH", form: "LDDW" },
        away: { name: "Kuwait", logo: "https://crests.football-data.org/kuwait.png", tla: "KUW", form: "LLWD" },
        startHour: 14,
        realScore: { home: 1, away: 0 }
    },
    {
        league: "Elite 1",
        home: { name: "AS Fortuna", logo: "https://crests.football-data.org/fortuna.png", tla: "FOR", form: "WDLW" },
        away: { name: "Union Douala", logo: "https://crests.football-data.org/douala.png", tla: "UNI", form: "LLDW" },
        startHour: 13,
        realScore: { home: 2, away: 0 }
    },
    {
        league: "Club Friendlies",
        home: { name: "Safa SC", logo: "https://crests.football-data.org/safa.png", tla: "SAF", form: "WWWW" },
        away: { name: "Al-Ansar", logo: "https://crests.football-data.org/ansar.png", tla: "ALA", form: "WLWW" },
        startHour: 12,
        realScore: { home: 3, away: 2 }
    }
];

const GLOBAL_LEAGUES = [
    { name: "Premier League", country: "England", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "La Liga", country: "Spain", logo: "🇪🇸" },
    { name: "Bundesliga", country: "Germany", logo: "🇩🇪" },
    { name: "Serie A", country: "Italy", logo: "🇮🇹" },
    { name: "Ligue 1", country: "France", logo: "🇫🇷" }
];

const MOCK_TEAMS = {
    "Premier League": [
        { name: "Arsenal", logo: "https://crests.football-data.org/57.png", tla: "ARS", form: "WWWL" },
        { name: "Liverpool", logo: "https://crests.football-data.org/64.png", tla: "LIV", form: "DWWW" },
        { name: "Man City", logo: "https://crests.football-data.org/65.png", tla: "MCI", form: "WWWW" },
        { name: "Chelsea", logo: "https://crests.football-data.org/61.png", tla: "CHE", form: "LDWW" }
    ],
    "La Liga": [
        { name: "Real Madrid", logo: "https://crests.football-data.org/86.png", tla: "RMA", form: "WWWW" },
        { name: "Barcelona", logo: "https://crests.football-data.org/81.png", tla: "FCB", form: "WLWW" }
    ]
};

export function getMatchesForDate(date) {
    const requestDate = new Date(date);
    const now = new Date();
    const isActuallyToday = requestDate.toDateString() === now.toDateString();

    const day = requestDate.getDate();
    const month = requestDate.getMonth();
    const year = requestDate.getFullYear();
    const seedInt = day + (month * 31) + (year * 366);

    const matches = [];

    // Add Real Matches first
    REAL_MATCHES.forEach((m, idx) => {
        const startTime = new Date(requestDate);
        startTime.setHours(m.startHour, 0, 0, 0);

        const diffMinutes = isActuallyToday
            ? Math.floor((now.getTime() - startTime.getTime()) / 60000)
            : (requestDate < now ? 120 : -1);

        let status = "SCHEDULED";
        let isLive = false;
        let score = { home: 0, away: 0 };
        let timeDisplay = `${String(m.startHour).padStart(2, '0')}:00`;

        if (diffMinutes >= 0 && diffMinutes <= 115 && isActuallyToday) {
            status = "LIVE";
            isLive = true;
            if (diffMinutes > 45 && diffMinutes <= 60) {
                timeDisplay = "HT";
            } else {
                const elapsed = diffMinutes > 60 ? diffMinutes - 15 : diffMinutes;
                timeDisplay = `${Math.min(elapsed, 90)}'`;
            }
            const progress = Math.min(diffMinutes / 90, 1);
            score.home = Math.floor(m.realScore.home * progress);
            score.away = Math.floor(m.realScore.away * progress);
        } else if (diffMinutes > 115) {
            status = "FT";
            timeDisplay = "FT";
            score = { ...m.realScore };
        }

        const leagueInfo = LEAGUES.find(l => l.name === m.league);

        matches.push({
            id: `real-${seedInt}-${idx}`,
            league: m.league,
            country: leagueInfo?.country || "World",
            homeTeam: m.home,
            awayTeam: m.away,
            status,
            time: timeDisplay,
            score,
            isLive,
            statistics: { possession: { home: 52, away: 48 }, shots: { home: 12, away: 10 }, shotsOnTarget: { home: 5, away: 4 }, corners: { home: 6, away: 4 } },
            lineups: { home: { formation: '4-3-3', starting: [] }, away: { formation: '4-4-2', starting: [] } },
            events: []
        });
    });

    // Add generated matches for more variety
    GLOBAL_LEAGUES.forEach((league, lIdx) => {
        const teams = MOCK_TEAMS[league.name] || [];
        if (teams.length >= 2) {
            const startTime = new Date(requestDate);
            startTime.setHours(18 + lIdx, 30, 0, 0);

            const diffMinutes = isActuallyToday
                ? Math.floor((now.getTime() - startTime.getTime()) / 60000)
                : (requestDate < now ? 120 : -1);

            let status = "SCHEDULED";
            let timeDisplay = `${18 + lIdx}:30`;
            let score = { home: 0, away: 0 };
            let isLive = false;

            if (diffMinutes >= 0 && diffMinutes <= 115 && isActuallyToday) {
                status = "LIVE";
                isLive = true;
                timeDisplay = diffMinutes + "'";
                score = { home: Math.floor(diffMinutes / 40), away: Math.floor(diffMinutes / 50) };
            } else if (diffMinutes > 115) {
                status = "FT";
                timeDisplay = "FT";
                score = { home: 1 + Math.floor(diffMinutes % 3), away: Math.floor(diffMinutes % 2) };
            }

            matches.push({
                id: `mock-${seedInt}-${lIdx}`,
                league: league.name,
                country: league.country,
                homeTeam: teams[0],
                awayTeam: teams[1],
                status,
                time: timeDisplay,
                score,
                isLive,
                statistics: { possession: { home: 50, away: 50 }, shots: { home: 8, away: 8 }, shotsOnTarget: { home: 3, away: 3 }, corners: { home: 4, away: 4 } },
                lineups: {
                    home: {
                        formation: '4-3-3',
                        starting: [
                            { name: 'A. Onana', img: 'https://i.pravatar.cc/150?u=onana', pos: 'GK' },
                            { name: 'C. Akapo', img: 'https://i.pravatar.cc/150?u=akapo', pos: 'RB' },
                            { name: 'S. Coco', img: 'https://i.pravatar.cc/150?u=coco', pos: 'CB' },
                            { name: 'E. Obiang', img: 'https://i.pravatar.cc/150?u=obiang', pos: 'CB' },
                            { name: 'B. Ndong', img: 'https://i.pravatar.cc/150?u=ndong', pos: 'LB' },
                            { name: 'P. Obiang', img: 'https://i.pravatar.cc/150?u=pobiang', pos: 'CM' },
                            { name: 'O. Mascarell', img: 'https://i.pravatar.cc/150?u=mascarell', pos: 'CM' },
                            { name: 'F. Bikoro', img: 'https://i.pravatar.cc/150?u=bikoro', pos: 'CM' },
                            { name: 'I. Salvador', img: 'https://i.pravatar.cc/150?u=salvador', pos: 'RW' },
                            { name: 'D. Miranda', img: 'https://i.pravatar.cc/150?u=miranda', pos: 'ST' },
                            { name: 'L. Nlavo', img: 'https://i.pravatar.cc/150?u=nlavo', pos: 'LW' }
                        ]
                    },
                    away: {
                        formation: '4-4-2',
                        starting: [
                            { name: 'A. Mandrea', img: 'https://i.pravatar.cc/150?u=mandrea', pos: 'GK' },
                            { name: 'Y. Atal', img: 'https://i.pravatar.cc/150?u=atal', pos: 'RB' },
                            { name: 'A. Mandi', img: 'https://i.pravatar.cc/150?u=mandi', pos: 'CB' },
                            { name: 'R. Ait-Nouri', img: 'https://i.pravatar.cc/150?u=nouri', pos: 'CB' },
                            { name: 'J. Hadjam', img: 'https://i.pravatar.cc/150?u=hadjam', pos: 'LB' },
                            { name: 'R. Mahrez', img: 'https://i.pravatar.cc/150?u=mahrez', pos: 'RM' },
                            { name: 'R. Zerrouki', img: 'https://i.pravatar.cc/150?u=zerrouki', pos: 'CM' },
                            { name: 'I. Bennacer', img: 'https://i.pravatar.cc/150?u=bennacer', pos: 'CM' },
                            { name: 'S. Benrahma', img: 'https://i.pravatar.cc/150?u=benrahma', pos: 'LM' },
                            { name: 'B. Bounedjah', img: 'https://i.pravatar.cc/150?u=bounedjah', pos: 'ST' },
                            { name: 'A. Gouiri', img: 'https://i.pravatar.cc/150?u=gouiri', pos: 'ST' }
                        ]
                    }
                },
                events: []
            });
        }
    });

    return matches;
}
