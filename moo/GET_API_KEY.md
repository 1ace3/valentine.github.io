# 🚀 **Get Your FREE API Key in 2 Minutes**

## ✅ **Step-by-Step Guide**

### 1️⃣ Register (30 seconds)
1. Visit **https://www.football-data.org/**
2. Click the **menu button** (☰ top right)
3. Click **"Get started >"** (green button)
4. Fill in the form:
   - **Name**: Your first name
   - **Email**: Your valid email
   - **Choose ur weapon**: Leave as "I wanna remain unarmed"
   - ✅ Check "I accept the terms and conditions"
5. Click **"Create account"**

### 2️⃣ Get Your Token (1 minute)
1. **Check your email inbox** (might take 1-2 minutes)
2. Look for email from `football-data.org`
3. **Copy the API Token** from the email

### 3️⃣ Add to Your Project (30 seconds)
1. In your project folder, create a file named `.env`
2. Add this line (replace with your actual token):
   ```
   VITE_FOOTBALL_DATA_API_KEY=your_token_from_email
   ```
3. Save the file

### 4️⃣ Restart & Enjoy! 🎉
```bash
npm run dev
```

**That's it!** Your app will now show **REAL live football matches**!

---

## 🆘 **Troubleshooting**

**Yellow banner still shows?**
- Make sure `.env` is in the **root folder** (same level as `package.json`)
- Token should be the **full string** from email (no quotes needed)
- **Restart the dev server** after creating `.env`

**No email received?**
- Check **spam/junk folder**
- Wait 2-3 minutes (might be delayed)
- Try registering again with a different email

---

## 🎁 **What You Get (FREE)**

✅ **10 requests per minute**  
✅ **Premier League** matches  
✅ **La Liga** matches  
✅ **Champions League** matches  
✅ **World Cup** data  
✅ **Live scores & updates**  
✅ **Team logos**  
✅ **Forever FREE** - no credit card!

---

## 📧 **Example .env File**

```bash
# This is what your .env file should look like:
VITE_FOOTBALL_DATA_API_KEY=a1b2c3d4e5f6g7h8i9j0
```

Replace `a1b2c3d4e5f6g7h8i9j0` with your actual token from the email!
