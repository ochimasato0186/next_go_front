// Firebase設定ファイル（テンプレート）
// TODO: Firebase プロジェクト作成後に実際の設定値を入力
// TODO: Firebase SDK をインストール後にコメントアウトを解除
// npm install firebase

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// TODO: Firebase Console から取得した設定情報を入力
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// TODO: Firebase SDK インストール後にコメントアウトを解除
// Firebase アプリの初期化
// const app = initializeApp(firebaseConfig);

// Firestore データベースの初期化
// export const db = getFirestore(app);

// Firebase Authentication の初期化
// export const auth = getAuth(app);

// export default app;

export default firebaseConfig;