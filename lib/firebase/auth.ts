// Firebase Authentication ヘルパー関数
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from './config';
import { addUser, getUserById } from './firestore';

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
}

// 🔐 認証機能

// 新規ユーザー登録
export const registerWithEmail = async (
  email: string, 
  password: string, 
  userData: {
    nickname: string;
    years: string;
    class: string;
  }
): Promise<AuthUser | null> => {
  try {
    console.log('Firebase Authで新規登録開始:', email);
    
    // Firebase Authenticationで認証ユーザーを作成
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    console.log('Firebase認証成功:', firebaseUser.uid);
    
    // Firestoreにユーザー情報を保存
    const userDoc = {
      nickname: userData.nickname,
      email: email,
      password: password, // 実際の運用では暗号化が推奨
      years: userData.years,
      class: userData.class,
      created_at: new Date()
    };
    
    const userId = await addUser(userDoc);
    console.log('Firestoreにユーザー保存完了:', userId);
    
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || email,
      displayName: userData.nickname
    };
  } catch (error: any) {
    console.error('新規登録エラー:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// ログイン
export const loginWithEmail = async (email: string, password: string): Promise<AuthUser | null> => {
  try {
    console.log('Firebase Authでログイン開始:', email);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    console.log('Firebase認証成功:', firebaseUser.uid);
    
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || email,
      displayName: firebaseUser.displayName || undefined
    };
  } catch (error: any) {
    console.error('ログインエラー:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// ログアウト
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('ログアウト成功');
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw new Error('ログアウトに失敗しました');
  }
};

// 認証状態の監視
export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || undefined
      });
    } else {
      callback(null);
    }
  });
};

// 現在のユーザーを取得
export const getCurrentUser = (): AuthUser | null => {
  const user = auth.currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || undefined
    };
  }
  return null;
};

// エラーメッセージの変換
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'このメールアドレスは既に使用されています';
    case 'auth/weak-password':
      return 'パスワードは6文字以上で入力してください';
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません';
    case 'auth/user-not-found':
      return 'ユーザーが見つかりません';
    case 'auth/wrong-password':
      return 'パスワードが正しくありません';
    case 'auth/invalid-credential':
      return 'メールアドレスまたはパスワードが正しくありません';
    case 'auth/too-many-requests':
      return 'ログイン試行回数が上限に達しました。しばらく待ってからお試しください';
    default:
      return '認証エラーが発生しました';
  }
};