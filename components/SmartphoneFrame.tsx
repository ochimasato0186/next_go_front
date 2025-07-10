import React from "react";

/**
 * スマホデモ機風のフレームコンポーネント。
 * 画面中央に配置し、背景を暗くしてデモ機感を演出。
 *
 * レスポンシブ対応: 画面幅に応じて最大375px・高さ812pxで縮小表示。
 */
const SmartphoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    minHeight: "100vh",
    width: "100vw",
    background: "#222a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    inset: 0,
    zIndex: 1000
  }}>
    <div style={{
      width: "min(100vw, 375px)",
      height: "min(90vh, 812px)",
      maxWidth: 375,
      maxHeight: 812,
      aspectRatio: "375/812",
      border: "16px solid #222",
      borderRadius: 40,
      boxShadow: "0 0 32px 8px #0008, 0 8px 32px #0006",
      position: "relative",
      background: "#fff",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      transition: "width 0.2s, height 0.2s"
    }}>
      {/* Notch */}
      <div style={{
        width: "32%",
        minWidth: 60,
        maxWidth: 120,
        height: 30,
        background: "#222",
        borderRadius: "0 0 20px 20px",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)"
      }} />
      {/* 画面エリア */}
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 1,
        paddingTop: 30,
        overflow: "auto",
        background: "#fff"
      }}>
        {children}
      </div>
    </div>
  </div>
);

export default SmartphoneFrame;
