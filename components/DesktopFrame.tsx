"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/DesktopFrame.module.css";

const DesktopFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.desktopBg}>
      <div className={styles.desktopFrame}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <button
            className={styles.hamburger}
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="メニュー"
          >
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </button>
          <span style={{ margin: "0 auto" }}>No Look for School</span>
        </div>
        {/* サイドバー＋メインを横並びに */}
        <div className={styles.frameContent}>
          {sidebarOpen && (
            <div className={styles.sidebarLeft}>
              <div className={styles.sidebarContent}>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mb-4"
                  onClick={() => {
                    router.push("/maker");
                    setSidebarOpen(false);
                  }}
                >
                  ホーム
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mb-4"
                  onClick={() => {
                    router.push("/maker/setting");
                    setSidebarOpen(false);
                  }}
                >
                  設定
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                  onClick={() => {
                    router.push("/maker/date");
                    setSidebarOpen(false);
                  }}
                >
                  統計
                </button>
              </div>
            </div>
          )}
          <div className={styles.main}>{children}</div>
        </div>
        {/* フッター */}
        <div className={styles.footer}>© 2025 管理者アプリ</div>
      </div>
    </div>
  );
};

export default DesktopFrame;
