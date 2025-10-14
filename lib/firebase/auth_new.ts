// Firebase Authentication ヘルパー関数 - デモ用無効化
export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
}

// 🔐 認証機能 - デモモード（Firebase無効化）

// 新規ユーザー登録（デモモード）
export const registerWithEmail = async (
  email: string, 
  password: string, 
  userData: {
    nickname: string;
    years: string;
    class: string;
  }
): Promise<AuthUser | null> => {
  // デモモードでは認証をスキップ
  console.log("Demo mode: Registration skipped", { email, userData });
  return {
    uid: "demo-user",
    email: email,
    displayName: userData.nickname
  };
};

// ログイン（デモモード）
export const loginWithEmail = async (email: string, password: string): Promise<AuthUser | null> => {
  console.log("Demo mode: Login skipped", { email });
  return {
    uid: "demo-user",
    email: email,
    displayName: "Demo User"
  };
};

// ログアウト（デモモード）
export const logout = async (): Promise<void> => {
  console.log("Demo mode: Logout skipped");
};

// 認証状態の監視（デモモード）
export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
  // デモモードでは常にログイン状態とする
  callback({
    uid: "demo-user",
    email: "demo@example.com",
    displayName: "Demo User"
  });
  
  // 空の関数を返す（購読解除用）
  return () => {};
};

// 現在のユーザーを取得（デモモード）
export const getCurrentUser = (): AuthUser | null => {
  return {
    uid: "demo-user",
    email: "demo@example.com",
    displayName: "Demo User"
  };
};

// エラーメッセージの変換（デモモード）
const getAuthErrorMessage = (errorCode: string): string => {
  return "Demo mode: Authentication error simulated";
};
