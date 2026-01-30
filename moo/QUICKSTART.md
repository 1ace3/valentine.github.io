# Quick Start Guide - Football-Data.org API

## 🚀 Get Started in 3 Steps

### Step 1: Get Your FREE API Token
1. Visit **https://www.football-data.org/**
2. Click **"Register"** (top right)
3. Fill in:
   - Email
   - Password
   - Accept terms
4. **Verify your email** (check inbox)
5. Login and copy your **API token** from the dashboard

### Step 2: Add API Token to Your Project
Create a file named `.env` in your project root (same folder as package.json):

```bash
VITE_FOOTBALL_DATA_API_KEY=your_token_here
```

**Important:** Replace `your_token_here` with your actual API token!

### Step 3: Restart the App
```bash
npm run dev
```

## ✅ That's It!

Your app will now show **REAL live football data**:
- ⚽ Live scores
- 🏆 Real team logos
- ⏰ Actual match times
- 📊 Multiple leagues

## 🔄 Automatic Fallback

If the API key is missing or invalid, the app automatically switches to simulated data with a yellow warning banner.

## 📝 Free Tier Includes:
- ✅ 10 requests per minute
- ✅ Premier League
- ✅ La Liga
- ✅ Bundesliga
- ✅ Serie A
- ✅ Champions League
- ✅ And more!

## 🆓 100% Free Forever
No credit card required, ever!
