// Firebase設定ファイル
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase Console から取得した設定情報
const firebaseConfig = {
apiKey: "AIzaSyBwxKa3BwbwzSrOzeNg4eobQvZdI6fS0hI",
  authDomain: "database-da923.firebaseapp.com",
  projectId: "database-da923",
  storageBucket: "database-da923.firebasestorage.app",
  messagingSenderId: "999946560625",
  appId: "1:999946560625:web:3fbc053a7b5097deed67d0",
  measurementId: "G-G0JPE2P0N9"

};

// Firebase アプリの初期化
const app = initializeApp(firebaseConfig);

// Firestore データベースの初期化
export const db = getFirestore(app);

// Firebase Authentication の初期化
export const auth = getAuth(app);

export default app;