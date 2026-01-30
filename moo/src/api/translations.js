const translations = {
    en: {
        title: 'LiveScore',
        today: 'TODAY',
        all: 'ALL',
        live: 'LIVE',
        upcoming: 'UPCOMING',
        finished: 'FINISHED',
        loading: 'Loading matches...',
        noMatches: 'No matches found for this selection.',
        simulatedData: 'Simulated data (API not configured)',
        stats: 'Statistics',
        lineups: 'Lineups',
        events: 'Events',
        possession: 'Possession',
        shots: 'Shots',
        shotsOnTarget: 'Shots on target',
        corners: 'Corners',
        matchStatus: {
            SCHEDULED: 'Scheduled',
            LIVE: 'Live',
            HT: 'HT',
            FT: 'FT',
            CANCELLED: 'Cancelled'
        },
        footer: '© 2025 LiveScore Clone',
        locale: 'en-US'
    },
    fr: {
        title: 'LiveScore',
        today: "AUJOURD'HUI",
        all: 'TOUS',
        live: 'DIRECT',
        upcoming: 'À VENIR',
        finished: 'TERMINÉS',
        loading: 'Chargement des matchs...',
        noMatches: 'Aucun match trouvé pour cette sélection.',
        simulatedData: 'Données simulées (API non configurée)',
        stats: 'Statistiques',
        lineups: 'Compositions',
        events: 'Événements',
        possession: 'Possession',
        shots: 'Tirs',
        shotsOnTarget: 'Tirs cadrés',
        corners: 'Corners',
        matchStatus: {
            SCHEDULED: 'Prévu',
            LIVE: 'Direct',
            HT: 'MT',
            FT: 'FM',
            CANCELLED: 'Annulé'
        },
        footer: '© 2025 LiveScore Clone',
        locale: 'fr-FR'
    }
};

export const getLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('fr') ? 'fr' : 'en';
};

export const t = (key) => {
    const lang = getLanguage();
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
        if (result[k]) {
            result = result[k];
        } else {
            return key;
        }
    }
    return result;
};

export default translations;
