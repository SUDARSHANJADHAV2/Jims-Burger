# 🍔 Jimis Burger — Official Website
**Sangli's #1 Gourmet Burger Brand**

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏠 Home Page | Hero, featured items, reviews, event CTA |
| 🍔 Full Menu | 25 items, search, filter by category |
| 🛒 Cart & Checkout | 3-step with delivery/pickup/dine-in |
| ⏰ Smart Pickup Timing | Customer tells arrival time, live countdown for owner |
| 🪑 Dine-In Pre-Order | Order ahead, food ready on table when you arrive |
| 🎉 Event & Bulk Orders | 4-step planner for birthdays, weddings, corporate |
| 📱 WhatsApp Alerts | Every order auto-sends details to owner via WhatsApp |
| 👤 Auth | Register/Login with persistent storage |
| ⚡ Admin Panel | Dashboard, live orders with countdown, menu management |
| 🍔 Menu Management | Edit prices, toggle availability, add/delete items |
| 📍 Google Maps | Embedded map on About page |
| 📱 Mobile Responsive | Works perfectly on all screen sizes |

---

## 🚀 Free Deployment — Step by Step

### Option 1: Vercel (RECOMMENDED — takes 3 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Upload this project folder (drag & drop or connect GitHub)
4. Vercel auto-detects Vite → Click **Deploy**
5. Your site is live at `https://jimis-burger.vercel.app` ✓

### Option 2: Netlify (Also free)

1. Go to [netlify.com](https://netlify.com) → Sign up
2. Run `npm run build` locally first
3. Drag the `dist/` folder to Netlify's deploy zone
4. Done — live in seconds

### Option 3: Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:5173

# Build for production
npm run build
```

---

## 🔑 Admin Access

```
Email:    admin@jimisburger.com
Password: jimis@admin2024
```

---

## 📱 WhatsApp Integration

Every order (regular + event) automatically opens a pre-filled WhatsApp message to:
**+91-84080 26942** (Owner's number)

To change the number, edit `OWNER_WHATSAPP` in `src/App.jsx`:
```js
const OWNER_WHATSAPP = "918408026942"; // format: countrycode + number
```

---

## ⏰ Smart Pickup / Dine-In System

When a customer selects **Pickup** or **Dine-In**:
1. They choose their arrival time (10, 15, 20, 30, 45, 60 min or custom)
2. The website calculates the **"Ready By" time** automatically
3. Owner gets a WhatsApp with urgency level (🔴 Urgent / 🟡 Moderate / 🟢 Relaxed)
4. Admin **Live Orders** panel shows a **live countdown timer** for each pickup
5. Cards pulse red when customer arrives in < 15 minutes

---

## 🍔 Menu Management (Admin)

In Admin Panel → **Menu Mgmt** tab:
- ✅ Edit item name, price, description, emoji, category
- ✅ Toggle items as available/unavailable (shows "Unavailable" badge on menu)
- ✅ Mark items as Popular or Hot/Spicy
- ✅ Add new menu items
- ✅ Delete items

Changes persist across sessions via storage.

---

## 📍 Google Maps

The About page has an embedded Google Maps showing the restaurant location.
To update with exact pin, replace the `src` of the iframe in `AboutPage` with your Google Maps embed URL:
1. Go to maps.google.com → search your address
2. Click Share → Embed a map → Copy the `src` URL
3. Paste it in the `<iframe src="...">` in `App.jsx`

---

## 💡 Tech Stack (100% Free)

- **React 18** + **Vite** — frontend framework
- **No backend needed** — storage uses browser localStorage + Claude storage API
- **WhatsApp Business API (Free)** — wa.me links, no API key needed
- **Google Maps Embed (Free)** — standard iframe embed
- **Google Fonts** — Oswald, DM Sans, Bebas Neue
- **Hosting** — Vercel / Netlify free tier

---

*Built for Jimis Burger, Sangli — © 2024*
