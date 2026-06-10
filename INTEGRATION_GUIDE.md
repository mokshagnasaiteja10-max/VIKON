# Integration & Cloud Setup Guide

This project is configured with a **Dual-Mode Adapter**. Out of the box, it runs in **Local Demo Mode** using a local JSON file (`src/lib/mock_db.json`) for server-side persistence and browser `localStorage` for session authentication. 

To connect the site to cloud services so that changes are saved in the cloud and leads automatically sync to a Google Sheet, follow these steps.

---

## 1. Firebase Cloud Setup (Auth & Database)

Connecting Firebase will migrate the database and admin logins to the cloud.

### Step 1: Create Firebase Project
1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the steps (disable Google Analytics if you don't need it).

### Step 2: Enable Email/Password Authentication
1. In the Firebase Sidebar, click **Build** > **Authentication**.
2. Click **Get Started**, choose the **Sign-in method** tab.
3. Select **Email/Password**, toggle it to **Enabled**, and click **Save**.
4. Go to the **Users** tab and click **Add User**.
   - Enter an administrator email (e.g. `admin@yourdomain.com`).
   - Enter a secure password.
   - Click **Add User**. Use these credentials to log in later.

### Step 3: Enable Firestore Database
1. In the sidebar, click **Build** > **Firestore Database**.
2. Click **Create Database**.
3. Choose a region close to your target users (e.g. `asia-south1` for India) and click **Next**.
4. Start in **Production Mode** or **Test Mode** (if in production mode, make sure to adjust security rules to allow read/write for authenticated users, see rules below).

#### Firestore Security Rules:
Go to the **Rules** tab in Firestore and paste the following rules, then click **Publish**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public site needs to read properties, projects, testimonials, and settings
    match /properties/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /testimonials/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /site_settings/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Public site writes leads, Admin reads/deletes them
    match /leads/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### Step 4: Get Web App SDK Config
1. Go to **Project Settings** (gear icon in top-left).
2. Under **Your Apps**, click the **Web App icon** (`</>`).
3. Register the app (e.g., name it `Sri Balaji Constructions`).
4. Copy the config values inside the `firebaseConfig` object:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### Step 5: Configure Environment Variables
Create a file named `.env.local` in the root of your project directory (`c:\Users\Prashanth\website\.env.local`) and paste your keys:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_copied_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_copied_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_copied_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_copied_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_copied_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_copied_app_id
```
Restart your development server (`npm run dev`). The application will detect these variables and automatically shift from local files to Firebase Cloud Firestore and Auth!

---

## 2. Google Sheets Integration (Automatic Lead Backup)

To sync every contact form submission to a Google Sheet automatically, we use a simple Google Apps Script Webhook.

### Step 1: Create the Google Sheet
1. Open [Google Sheets](https://sheets.google.com/) and create a new blank spreadsheet.
2. In the first row (headers), add the following column titles:
   - Column A: `Timestamp`
   - Column B: `Lead ID`
   - Column C: `Full Name`
   - Column D: `Phone Number`
   - Column E: `Email`
   - Column F: `Requested Service`
   - Column G: `Property Reference`
   - Column H: `Message`

### Step 2: Create Webhook Script
1. In your Google Sheet menu, click **Extensions** > **Apps Script**.
2. Erase any code in the editor and paste the following script:
```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append a row of cell values corresponding to the lead payload
    sheet.appendRow([
      data.timestamp,
      data.id,
      data.name,
      data.phone,
      data.email,
      data.service,
      data.property,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy the Script as a Web App
1. In the Apps Script editor top-right, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Sync website leads`
   - **Execute as**: `Me (your-gmail-account)`
   - **Who has access**: `Anyone` (This is required so your server can post to it securely)
4. Click **Deploy**.
5. Google will ask you to authorize permissions. Click **Authorize access**, choose your Google account, click **Advanced** (in small text), and click **Go to Untitled project (unsafe)** or **Allow**.
6. Once deployed, copy the **Web app URL** (it starts with `https://script.google.com/macros/s/...`).

### Step 4: Add Webhook URL to .env.local
Open your `.env.local` file and add the webhook URL:
```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/PASTE_YOUR_COPIED_URL_HERE/exec
```

Restart your server. Every time someone submits a contact/enquiry form, it will save to Firestore and automatically append to your Google Sheet!
