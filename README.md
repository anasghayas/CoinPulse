# CoinPulse - Cryptocurrency Tracker & Wishlist Dashboard

Developed by **Anas Ghayas**

🔗 **Live Link**: [coinpulsecrypto.netlify.app](https://coinpulsecrypto.netlify.app)

CoinPulse is a premium, real-time cryptocurrency tracker and analytics dashboard. It offers developers and crypto enthusiasts a seamless interface to inspect live price metrics, analyze historic market trend charts, manage custom watchlist items, and dynamically switch between global currencies (USD, INR, EUR) with real-time UI updates.

---

## 🚀 Key Features

* **Interactive Carousel**: A smooth, looping visual banner showcasing trending coins with 24-hour gains/losses and backdrop animated gradients.
* **Live Search & Filter**: Real-time matching filter to query any of the top 100 cryptocurrencies by coin name or ticker symbol instantly.
* **Consolidated Data Caching**: The application caches top market fetches inside the global `CurrencyContext`, eliminating redundant queries to CoinGecko, optimizing network data transfer, and avoiding rate limits.
* **Interactive Charting**: Custom analytics graphs built on Recharts and Shadcn UI components. Toggle historic charts across multiple intervals: `1H`, `24H`, `7D`, `30D`, `90D`, `1Y`, and `MAX`.
* **Dynamic Currency Switching**: Fully synced dropdown selector enabling instant updates across USD ($), INR (₹), and EUR (€) symbols, formatting all list and sidebar items dynamically.
* **Firebase Authentication**: User accounts with secure Email/Password registration and login sliding panels.
* **Real-time Wishlist Sync**: Toggleable wishlist entries synced in real-time with Firestore. Add/remove coins with heart icons inside lists, details pages, or direct deletion buttons in the profile drawer.

---

## 🛠️ Tech Stack & Architecture

### Frontend Core
* **React 19** + **Vite** (Optimized for Fast HMR compilation)
* **Tailwind CSS v4** (Utility-first styling framework)
* **Lucide React** (Unified SVG iconography)
* **Recharts** (Canvas-rendered charting engine)

### State Management & Backend
* **Context API**:
  * `CurrencyContext`: Manages active currency configuration and acts as a central caching fetch layer for the coin list metadata.
  * `AuthContext`: Manages logged-in Firebase user states, active Firestore wishlist sync, and handles add/delete wishlist mutations.
* **Firebase (v10)**:
  * **Firebase Authentication**: Handles secure sign-in and account creation operations.
  * **Cloud Firestore**: Holds persistent user documents containing custom coin arrays (`wishlist`) that update via real-time listeners.

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable components
│   ├── ui/              # Shadcn primitive design UI widgets
│   ├── CoinCarousel.jsx # Dynamic looping banner
│   ├── CoinChart.jsx    # Historical chart component
│   ├── CoinTable.jsx    # Coin lists with wishlist toggles
│   ├── Header.jsx       # Global navbar & sidebar drawer
│   └── index.js         # Centralized components export
├── context/             # Global Context State Layers
│   ├── AuthContext.jsx  # Firebase users & Firestore syncing
│   ├── CurrencyContext.jsx # Global currency selection & markets cache
│   └── index.js         # Centralized context export
├── lib/                 # Core utilities
│   ├── coingecko.js     # CoinGecko query builders
│   └── utils.js         # Class merger helper (cn)
├── pages/               # Route pages
│   ├── HomePage.jsx     # Landing dashboard layout
│   ├── CoinPage.jsx     # Split statistics & chart page
│   └── index.js         # Centralized pages export
├── users/               # Base configurations
│   └── firebase.js      # Firebase SDK client initialization
├── App.jsx              # Main React routing switch
└── main.jsx             # DOM mounting & context wrapping
```

---

## ⚙️ Local Development Setup

Follow these steps to run CoinPulse on your computer:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd CoinPulse
```

### 2. Install Project Dependencies
Use `npm` to install all package items inside the React project directory:
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env` in the root of the project directory (`CoinPulse/.env`) and insert your Firebase app credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Firestore Database Security Rules
To ensure the wishlist data can be correctly synchronized, configure your Cloud Firestore database with the following rules inside the Firebase Console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Launch the Local Development Server
Boot up the Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser to view the application.

---

## 📈 Optimization & Implementation Choices
* **Index Consolidation**: Component and page files are routed through centralized `index.js` export sheets, simplifying imports and keeping lines clean.
* **Unified API Requests**: Instead of fetching the markets list in the header, table, and carousel separately, a single context fetch executes and provides cached coins data to all layout blocks, ensuring instant updates and zero rate-limit blocks.
* **Stop Propagation on Lists**: Table row actions and heart toggles are isolated using programmatic propagation overrides to allow users to wishlist coins directly from the dashboard page without triggering row navigation.
