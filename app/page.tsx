"use client";
import SmartphoneFrame from "../components/SmartphoneFrame";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [className, setClassName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return alert("生徒用か教師用を選択してください");
    // 入力値をlocalStorageに保存
    localStorage.setItem("schoolInfo", JSON.stringify({
      school,
      grade,
      className
    }));
    // ここで登録処理を実装（API連携など）
    if (role === "teacher") {
      router.push("/teacher");
    } else {
      router.push("/student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <main className="flex flex-col items-center justify-center min-h-[80vh] w-full">
          <div style={{ maxWidth: 340, width: "100%", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              新規登録
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={() => setRole("student")}
                style={{
                  padding: "10px 24px",
                  fontSize: 18,
                  borderRadius: 8,
                  border:
                    role === "student" ? "2px solid #1976d2" : "1.5px solid #bbb",
                  background: role === "student" ? "#1976d2" : "#fff",
                  color: role === "student" ? "#fff" : "#222",
                  fontWeight: "bold",
                  cursor: "pointer",
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
                  border:
                    role === "teacher" ? "2px solid #1976d2" : "1.5px solid #bbb",
                  background: role === "teacher" ? "#1976d2" : "#fff",
                  color: role === "teacher" ? "#fff" : "#222",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                教師用
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 6 }}>学校名</label>
                <input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 6,
                    border: "1px solid #bbb",
                    fontSize: 16,
                  }}
                />
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
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 6 }}>メールアドレス</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 6,
                    border: "1px solid #bbb",
                    fontSize: 16,
                  }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", marginBottom: 6 }}>パスワード</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 6,
                    border: "1px solid #bbb",
                    fontSize: 16,
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: 140,
                  padding: "8px 0",
                  fontSize: 16,
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: "bold",
                  cursor: "pointer",
                  margin: "0 auto 16px auto",
                  display: "block"
                }}
              >
                登録
              </button>
            </form>
            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                width: 140,
                padding: "8px 0",
                fontSize: 14,
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
              ログイン画面へ
            </button>
          </div>
        </main>
      </SmartphoneFrame>
    </div>
  );
}
