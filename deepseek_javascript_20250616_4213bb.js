rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Leaderboard is public read-only
    match /leaderboard/{entry} {
      allow read: if true;
      allow write: if false;
    }
    
    // Public stats for leaderboard
    match /publicStats/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}