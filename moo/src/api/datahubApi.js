export const datahubApi = {
    getLeaguesCollection: async () => {
        try {
            // DataHub often provides CSV/JSON on GitHub or their pkgstore.
            // We'll use the Premier League JSON as a "Featured Resource"
            const url = 'https://pkgstore.datahub.io/core/english-premier-league/season-1819_json/data/7627448d35661d4b68f9b97cb11bf1a2/season-1819_json.json';
            const response = await fetch(url);
            if (!response.ok) throw new Error('DataHub API Error');
            const data = await response.json();
            return data.slice(0, 10); // Return first 10 for demonstration
        } catch (error) {
            console.error('DataHub Fetch Error:', error);
            return [];
        }
    }
};
