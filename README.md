# ComfortWay

A modern web platform for all your home appliance needs: repair, maintenance, protection plans, and buy/rent options. ComfortWay connects users with qualified technicians and offers seamless service booking, dynamic search, and a user-friendly dashboard.

## 🚀 Features
- **Home Appliance Services:** Book repairs, installations, and maintenance for AC, RO, electrician, plumbing, kitchen/home appliances, and more.
- **Dynamic Search:** Autocomplete search for products and services with instant dropdown suggestions.
- **Protection Plans:** Choose or customize home protection plans for all your appliances.
- **Buy/Rent:** Explore and book appliances for purchase or rent, with WhatsApp integration.
- **Google Authentication:** Secure login with Google and manual JWT auth.
- **Dashboard:** Admin and user dashboards for managing products, services, and bookings.
- **Responsive UI:** Beautiful, mobile-friendly design with Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express, Firebase Admin SDK
- **Database:** Firebase Firestore
- **Auth:** JWT, Google Auth (Firebase)

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/comfortway.git
cd comfortway
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root with your config:
```
VITE_BASE_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Run the app
```bash
npm run dev
```

### 5. Backend Setup
- See `/comfort-backend/README.md` for backend setup and API docs.

## 📦 Folder Structure
- `src/components/` – UI components (HeroCarousel, SearchSection, etc.)
- `src/pages/` – Main pages (buy-rent, maintenance-repair, protection-plans, dashboard, etc.)
- `src/features/slices/` – Redux slices for products, services, auth, etc.
- `src/firebase.js` – Firebase config (frontend)
- `comfort-backend/` – Node.js/Express backend

## 🙋‍♂️ Contact & Support
For issues, suggestions, or contributions:
- [comfortway.in](https://comfortway.in)
- Email: support@comfortway.in

---

**ComfortWay** – Making home appliance care easy, reliable, and affordable. 
