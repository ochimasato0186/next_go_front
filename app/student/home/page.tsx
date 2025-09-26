"use client";

import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentBell from "../../../components/StudentBell";
import StudentFooter from "../../../components/StudentFooter";
import Scene from "../../../components/Scene";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SmartphoneFrame>
        <SmartphoneHeader />
        <div style={{ position: "absolute", top: "25mm", right: "3mm", zIndex: 50 }}>
          <StudentBell count={3} color="#fff" />
        </div>

        <main
          className="flex flex-col justify-center items-center w-full"
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#001f3f", // ← 紺色
            position: "relative",
          }}
        >
          {/* 3Dモデルを画面中央に配置 */}
          <div
            style={{
              width: "100%",
              height: "45%", // 60%から45%にさらに縮小
              display: "flex",
              alignItems: "center", // 中央に戻して3Dモデルが自由に移動できるように
              justifyContent: "center",
              position: "relative", // 追加：3Dモデルの位置調整を可能にする
            }}
          >
            <Scene />
          </div>
          
          {/* チャットエリアを下部に配置 */}
          <div
            style={{
              height: "55%", // 40%から55%にさらに拡大
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              gap: "10px",
            }}
          >
            {/* チャット履歴表示エリア */}
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #ccc",
                padding: "8px",
                overflowY: "auto",
                fontSize: "14px",
              }}
            >
              <div style={{ marginBottom: "5px", color: "#666" }}>
                チャット履歴がここに表示されます...
              </div>
            </div>
            
            {/* 入力エリア */}
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="メッセージを入力..."
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
