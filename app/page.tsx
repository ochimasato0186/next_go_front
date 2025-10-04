"use client";
import SmartphoneFrame from "../components/frame/SmartphoneFrame";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/userManager";

export default function Home() {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [school, setSchool] = useState("");
  const [userName, setUserName] = useState("");
  const [grade, setGrade] = useState("");
  const [className, setClassName] = useState("");
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
      // 新しいユーザー管理システムでユーザー登録
      await registerUser({
        email,
        name: userName,
        school,
        grade,
        className,
        role,
        password
      });
      
      // 従来のlocalStorage保存（互換性のため）
      localStorage.setItem("schoolInfo", JSON.stringify({
        school,
        userName,
        grade,
        className,
        email
      }));
      
      // 登録成功時のリダイレクト
      if (role === "teacher") {
        router.push("/maker");
      } else {
        router.push("/student/home");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setIsLoading(false);
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
              {error && (
                <div
                  style={{
                    padding: 12,
                    backgroundColor: "#fee",
                    border: "1px solid #fcc",
                    color: "#c33",
                    borderRadius: 8,
                    marginBottom: 16,
                    fontSize: 14,
                  }}
                >
                  {error}
                </div>
              )}

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
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 6 }}>ユーザー名</label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                disabled={isLoading}
                style={{
                  width: 140,
                  padding: "8px 0",
                  fontSize: 16,
                  background: isLoading ? "#ccc" : "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: "bold",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  margin: "0 auto 16px auto",
                  display: "block",
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                {isLoading ? "登録中..." : "登録"}
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
