"use client";


import SmartphoneFrame from "../../components/SmartphoneFrame";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [className, setClassName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで認証処理を実装（API連携など）
    // 仮で生徒/教師判定はせずstudentに遷移
    router.push("/student");
  };

  return (
    <SmartphoneFrame>
      <div style={{ maxWidth: 340, margin: "40px auto", padding: 24, background: "#f5f5f5", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" }}>ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>学校名</label>
            <input value={school} onChange={e => setSchool(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 6 }}>学年</label>
              <input
                value={grade}
                onChange={e => setGrade(e.target.value)}
                required
                placeholder="例: 1"
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  fontSize: 16,
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 6 }}>組</label>
              <input
                value={className}
                onChange={e => setClassName(e.target.value)}
                required
                placeholder="例: 2"
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  fontSize: 16,
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>パスワード</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
          </div>
          <button
            type="submit"
            style={{
              width: 140,
              padding: "8px 0",
              fontSize: 16,
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
              margin: "0 auto",
              display: "block"
            }}
          >
            ログイン
          </button>
        </form>
      </div>
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
    </SmartphoneFrame>
  );
}
