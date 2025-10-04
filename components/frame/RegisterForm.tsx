"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/userManager";

const RegisterForm = () => {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [school, setSchool] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return alert("生徒用か教師用を選択してください");
    
    setIsLoading(true);
    setError("");
    
    try {
      await registerUser({
        email,
        name: userName,
        school,
        role,
        password
      });
      
      // 登録成功時のリダイレクト
      if (role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
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
      
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
        <button
          type="button"
          onClick={() => setRole("student")}
          style={{
            padding: "10px 24px",
            fontSize: 18,
            borderRadius: 8,
            border: role === "student" ? "2px solid #1976d2" : "1.5px solid #bbb",
            background: role === "student" ? "#1976d2" : "#fff",
            color: role === "student" ? "#fff" : "#222",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          生徒用
        </button>
        <button
          type="button"
          onClick={() => setRole("teacher")}
          style={{
            padding: "10px 24px",
            fontSize: 18,
            borderRadius: 8,
            border: role === "teacher" ? "2px solid #1976d2" : "1.5px solid #bbb",
            background: role === "teacher" ? "#1976d2" : "#fff",
            color: role === "teacher" ? "#fff" : "#222",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          教師用
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>学校名</label>
          <input value={school} onChange={e => setSchool(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>ユーザー名</label>
          <input value={userName} onChange={e => setUserName(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>メールアドレス</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>パスワード</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
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
