"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerWithEmail } from "../../lib/firebase/auth";

const RegisterForm = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [years, setYears] = useState("");
  const [classValue, setClassValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname || !email || !password || !years || !classValue) {
      setError("すべての項目を入力してください");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const user = await registerWithEmail(email, password, {
        nickname,
        years,
        class: classValue
      });
      
      if (user) {
        console.log('新規登録成功:', user);
        // 登録成功時のリダイレクト
        router.push("/student");
      }
    } catch (err: any) {
      setError(err.message || "登録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, background: "#f5f5f5", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" }}>新規登録</h2>
      
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
          <label style={{ display: 'block', marginBottom: 6 }}>ニックネーム</label>
          <input 
            value={nickname} 
            onChange={e => setNickname(e.target.value)} 
            required 
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} 
          />
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>学年</label>
            <select 
              value={years} 
              onChange={e => setYears(e.target.value)} 
              required 
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }}
            >
              <option value="">選択してください</option>
              <option value="1年">1年</option>
              <option value="2年">2年</option>
              <option value="3年">3年</option>
              <option value="4年">4年</option>
              <option value="5年">5年</option>
              <option value="6年">6年</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>クラス</label>
            <select 
              value={classValue} 
              onChange={e => setClassValue(e.target.value)} 
              required 
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }}
            >
              <option value="">選択してください</option>
              <option value="1組">1組</option>
              <option value="2組">2組</option>
              <option value="3組">3組</option>
              <option value="4組">4組</option>
              <option value="5組">5組</option>
            </select>
          </div>
        </div>
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
            width: '100%', 
            padding: '12px 0', 
            fontSize: 18, 
            background: isLoading ? '#ccc' : '#1976d2', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            fontWeight: 'bold', 
            cursor: isLoading ? 'not-allowed' : 'pointer' 
          }}
        >
          {isLoading ? '登録中...' : '登録'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
