"use client";

import SmartphoneFrame from "../../components/frame/SmartphoneFrame";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "../../lib/firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const user = await loginWithEmail(email, password);
      
      if (user) {
        console.log('ログイン成功:', user);
        
        // メールアドレスのドメイン部分を取得
        const domain = email.split('@')[1];
        
        // 特定のドメインの場合はmaker側へリダイレクト
        const teacherDomains = [
          'teacher.edu.jp',      // 教師専用ドメイン例
          'school.ac.jp',        // 学校関係者ドメイン例
          'admin.edu.jp',        // 管理者ドメイン例
          'maker.local'          // 開発・テスト用
        ];
        
        if (teacherDomains.includes(domain)) {
          console.log('教師用ドメインを検出:', domain);
          router.push("/maker");
        } else {
          console.log('生徒用ドメイン:', domain);
          router.push("/student");
        }
      } else {
        setError("メールアドレスまたはパスワードが正しくありません");
      }
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SmartphoneFrame>
      <div style={{ maxWidth: 340, margin: "40px auto", padding: 24, background: "#f5f5f5", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" }}>ログイン</h2>
        
        {error && (
          <div style={{
            background: "#fee",
            color: "#c53030",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "16px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>メールアドレス</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} 
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>パスワード</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} 
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: 140,
              padding: "8px 0",
              fontSize: 16,
              background: isLoading ? "#ccc" : "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              margin: "0 auto",
              display: "block"
            }}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
        
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            width: 140,
            padding: "8px 0",
            fontSize: 14,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
            margin: "24px auto 0 auto",
            display: "block"
          }}
        >
          新規登録画面へ
        </button>
      </div>
    </SmartphoneFrame>
  );
}
