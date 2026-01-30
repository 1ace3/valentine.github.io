# Football-Data.org API Integration

## Setup Instructions

1. **Get your FREE API Key:**
   - Go to https://www.football-data.org/
   - Click "Register" or "Get API Key"
   - Sign up for a free account (no credit card required)
   - Copy your API token from the dashboard

2. **Configure the API Key:**
   - Open the `.env` file in the project root (or create it from `.env.example`)
   - Add your API key:
     ```
     VITE_FOOTBALL_DATA_API_KEY=your_api_token_here
     ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

## Free Tier Limits
- ⚡ **10 requests per minute**
- 📊 **Competitions**: Selected leagues only
- 🆓 **Completely free** - no credit card required
- ✅ **Live scores** and match data

## API Endpoints Used
- `GET /v4/matches` - Get all matches for today
- `GET /v4/matches?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD` - Get matches for specific date

## Supported Competitions (Free Tier)
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League
- 🇪🇸 La Liga
- 🇩🇪 Bundesliga
- 🇮🇹 Serie A
- 🇫🇷 Ligue 1
- 🇳🇱 Eredivisie
- 🏆 UEFA Champions League
- 🏆 FIFA World Cup
- And more!

## Features
✅ Real-time match data
✅ Live scores and statuses
✅ Official team crests/logos
✅ Multiple leagues
✅ Match times in local timezone
✅ Automatic fallback to simulated data if API unavailable
