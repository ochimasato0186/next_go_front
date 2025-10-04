"use client";

import { useState } from "react";
import SmartphoneFrame from "../../../components/frame/SmartphoneFrame";
import SmartphoneHeader from "../../../components/frame/SmartphoneHeader";
import StudentBell from "../../../components/student/StudentBell";
import StudentFooter from "../../../components/student/StudentFooter";
import Scene from "../../../components/3D/Scene";
import { useNews } from "../../../hooks/useNews";

export default function Home() {
  const [message, setMessage] = useState(""); // 入力テキスト管理
  const [chatHistory, setChatHistory] = useState<string[]>([]); // チャット履歴管理
  const { newNewsCount } = useNews(); // ニュースカウントを取得

  const handleSend = () => {
    if (!message.trim()) return; // 空なら何もしない
    setChatHistory((prev) => [...prev, message]); // 履歴に追加
    setMessage(""); // 入力欄をクリア
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <SmartphoneFrame>
        <SmartphoneHeader />
        <div style={{ position: "absolute", top: "25mm", right: "3mm", zIndex: 50 }}>
          <StudentBell count={newNewsCount} color="#fff" />
        </div>

        <main
          className="flex flex-col w-full"
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#001f3f", // ← 紺色
            position: "relative",
            paddingBottom: "60px", // フッター分の余白を追加
          }}
        >
          <div style={{ height: "110px" }}></div>
          
          {/* 3Dモデル */}
          <div
            style={{
              width: "100%",
              height: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Scene />
          </div>
          
          {/* チャット履歴 */}
          <div
            style={{
              height: "40%",
              display: "flex",
              flexDirection: "column",
              padding: "0 10px",
              margin: "0",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
                overflowY: "auto",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              {chatHistory.length === 0 ? (
                <div style={{ marginBottom: "5px", color: "#666" }}>
                  チャット履歴がここに表示されます...
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <div key={i} style={{ marginBottom: "5px" }}>
                    {msg}
                  </div>
                ))
              )}
            </div>
          </div>
            
          {/* 入力エリア */}
          <div 
            style={{
              height: "20%",
              display: "flex",
              alignItems: "flex-start",
              padding: "5px 10px",
              marginBottom: "5mm",
            }}
          >
            <div style={{ display: "flex", gap: "8px", width: "100%" }}>
              <input
                type="text"
                placeholder="AIに質問を入力..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{
                  flex: 1,
                  height: "40px",
                  padding: "0 12px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  background: "#fff",
                  fontSize: "14px",
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: "60px",
                  height: "40px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                送信
              </button>
            </div>
          </div>
        </main>

        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}
