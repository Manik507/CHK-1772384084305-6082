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

*(Include screenshots of the Application Dashboard, Landing Page, Scanner Page, and Admin Panel here to showcase the rich UI)*

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
   git clone <repository-url>
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
