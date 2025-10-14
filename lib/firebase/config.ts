// Firebase設定ファイル
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase Console から取得した設定情報
const firebaseConfig = {
  //FireBaseのAPIキーを書く
apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxx"
};

// Firebase アプリの初期化
const app = initializeApp(firebaseConfig);

// Firestore データベースの初期化
export const db = getFirestore(app);

// Firebase Authentication の初期化
export const auth = getAuth(app);

export default app;