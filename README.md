# Medical Helper App

A comprehensive web application designed to help users interact with their medication. Featuring barcode scanning/uploading for retrieving medication details, multi-language support (English, Hindi, Marathi), and a Voice Assistant that can read out medication instructions. It also includes an extensive Admin Dashboard for managing the catalog of medicines securely.

## Features

- **Barcode Scanning & Uploading**: Quickly scan or upload medicine barcodes to view detailed information, including ingredients, use cases, and side effects.
- **Multilingual Support**: Supports displaying medication details in English, Hindi, and Marathi, catering to diverse users.
- **Voice Assistant**: Integrated text-to-speech voice assistant to read medicine details aloud, particularly useful for elderly or visually impaired users.
- **Admin Dashboard**: Comprehensive admin panel with secure access for managing medicines (Add, Edit, View, Delete). Only authorized admins can manage the database.
- **Reminder & Notifications**: Users can set up pill reminders and receive automated notifications along with dynamically generated barcodes.
- **Font Size Adjustment**: Adjustable UI text size for improved accessibility to aid elderly users.
- **Authentication**: Secure login and signup with personalized profiles using Firebase Authentication.

## Folder Structure

```text
src/
├── main.jsx                 # Entry point
├── App.css
├── index.css
│
├── backend/                 # Backend Node.js Scripts & Controllers
│   ├── server.js
│   ├── controller/
│   ├── middleware/
│   └── routes/
│
├── firebase/                # Firebase Configurations & Services
│   ├── firebase-admin.js
│   ├── firebase-config.js
│   └── firestoreService.js
│
└── frontend/                # Main React Frontend
    ├── App.jsx              # Main React App Route Component
    ├── components/          # Reusable UI Components
    │   ├── BarcodeDisplay.jsx
    │   ├── FontSizeAdjuster.jsx
    │   ├── NotificationBell.jsx
    │   ├── NotificationManager.jsx
    │   ├── ProtectedRoute.jsx
    │   └── VoiceAssistant.jsx
    ├── context/             # React Context Providers
    │   ├── AuthContext.jsx
    │   ├── FontSizeContext.jsx
    │   ├── LanguageContext.jsx
    │   └── ThemeContext.jsx
    ├── layouts/
    │   └── MainLayout.jsx
    └── pages/               # Application Pages
        ├── AddReminder.jsx
        ├── AdminDashboard.jsx
        ├── Dashboard.jsx
        ├── HistoryPage.jsx
        ├── LandingPage.jsx
        ├── LoginPage.jsx
        ├── MedicineDetail.jsx
        ├── ProfilePage.jsx
        ├── RemindersPage.jsx
        ├── ScannerPage.jsx
        ├── SearchMedicine.jsx
        ├── SettingsPage.jsx
        └── SignupPage.jsx
```

## Output & Screenshots

<img width="1898" height="889" alt="Screenshot 2026-03-11 022306" src="https://github.com/user-attachments/assets/c494e6c9-90a2-455b-8088-f8f9c0759357" />
<img width="1194" height="888" alt="Screenshot 2026-03-11 021102" src="https://github.com/user-attachments/assets/15992b07-2e17-4462-b053-09b0d2a9ecc9" />
<img width="1901" height="893" alt="Screenshot 2026-03-11 021151" src="https://github.com/user-attachments/assets/11defb0e-b5bb-40d5-ae1c-3618248cbcd6" />
<img width="1899" height="906" alt="Screenshot 2026-03-11 021244" src="https://github.com/user-attachments/assets/37cb7918-bfbe-4b57-8ab4-7c82be84018d" />
<img width="1909" height="902" alt="Screenshot 2026-03-11 021639" src="https://github.com/user-attachments/assets/79397711-2ec4-4aa5-8c4c-463317c8c633" />
<img width="1904" height="901" alt="Screenshot 2026-03-11 021653" src="https://github.com/user-attachments/assets/98874ddf-a8e9-4461-a481-586273acfffc" />
<img width="1910" height="897" alt="Screenshot 2026-03-11 021808" src="https://github.com/user-attachments/assets/a3ac0189-826d-4782-b2f8-73b034bd123c" />
<img width="1911" height="901" alt="Screenshot 2026-03-11 021916" src="https://github.com/user-attachments/assets/84addc2e-d77a-4f6e-ad5e-f788608a1ed9" />
<img width="1904" height="892" alt="Screenshot 2026-03-11 022045" src="https://github.com/user-attachments/assets/b6e628d1-5407-4c6c-a874-066b74efaede" />
<img width="1898" height="889" alt="Screenshot 2026-03-11 022306" src="https://github.com/user-attachments/assets/41163ab5-5785-4691-bc2d-65b7bfa44f1d" />


## Technologies Used

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Lucide React icons
- **Backend & Database**: Firebase (Firestore, Authentication, Admin SDK)
- **Scanning & Barcodes**: `html5-qrcode` for scanning, `jsbarcode` for generating barcodes
- **Notifications**: `react-hot-toast` for toast notifications

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Firebase Account with a configured Project

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone "https://github.com/Manik507/CHK-1772384084305-6082"
   ```

2. **Navigate to the project directory:**
   ```bash
   cd CHK-1772384084305-6082/medical-helper-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the `medical-helper-app` root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyBchyO4uc_ly0EMHvXG9ZtOMWOPCBF-D5s
   VITE_FIREBASE_AUTH_DOMAIN=medication-helper-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=medication-helper-app
   VITE_FIREBASE_STORAGE_BUCKET=medication-helper-app.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=1052418756688
   VITE_FIREBASE_APP_ID=1:1052418756688:web:740ec847fe2b4281868155
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Contributing

Feel free to fork the repository and submit pull requests to contribute to the UI or integrate new features!
