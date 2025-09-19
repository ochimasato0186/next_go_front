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
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              height: "400px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
              background: "transparent",
            }}
          >
            <div
              style={{
                transform: "scale(1.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Scene />
            </div>
          </div>
          <input
            type="text"
            placeholder="入力する"
            className="border border-gray-400 rounded px-4 w-64"
            style={{ height: "49px", marginTop: "-26.5px", background: "#fff" }}
          />
        </main>

        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}
