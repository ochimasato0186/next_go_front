"use client";
import React, { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import styles from "../../styles/DesktopFrame.module.css";
import stylesBtn from "../../styles/button.module.css";

const DesktopFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; school: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/userInfo.json")
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  return (
    <div className={styles.desktopBg}>
      <div className={styles.desktopFrame}>
        {/* ヘッダー */}
        <div className={styles.header} style={{ display: "flex", alignItems: "center", position: "relative" }}>
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
          <button
            style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="ユーザー情報"
            onClick={() => setUserModalOpen(true)}
          >
            <FaRegCircleUser size={56} />
          </button>
        </div>
        {/* ユーザー情報モーダル */}
        {userModalOpen && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }} onClick={() => setUserModalOpen(false)}>
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: "32px 40px",
              minWidth: 320,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              position: "relative"
            }} onClick={e => e.stopPropagation()}>
              <h2 style={{marginBottom: 24, fontSize: 20, textAlign: "center"}}>ユーザー情報</h2>
              {userInfo ? (
                <>
                  <div style={{marginBottom: 12}}>メールアドレス：{userInfo.email}</div>
                  <div style={{marginBottom: 12}}>ユーザー名：{userInfo.name}</div>
                  <div style={{marginBottom: 12}}>学校,所属名：{userInfo.school}</div>
                </>
              ) : (
                <div>読み込み中...</div>
              )}
              <button style={{marginTop: 16, padding: "8px 24px", background: "#3182ce", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto"}} onClick={() => setUserModalOpen(false)}>閉じる</button>
            </div>
          </div>
        )}
        {/* サイドバー＋メインを横並びに */}
        <div className={styles.frameContent}>
          {sidebarOpen && (
            <div className={styles.sidebarLeft}>
              <div className={styles.sidebarContent}>
                {/* サイドバー：ホームボタン */}
                <button
                  className={stylesBtn.sidebarBtn}
                  onClick={() => {
                    router.push("/maker");
                    setSidebarOpen(false);
                  }}
                >
                  ホーム
                </button>
                {/* サイドバー：設定ボタン */}
                <button
                  className={stylesBtn.sidebarBtn}
                  onClick={() => {
                    router.push("/maker/setting");
                    setSidebarOpen(false);
                  }}
                >
                  設定
                </button>
                {/* サイドバー：統計ボタン */}
                <button
                  className={stylesBtn.sidebarBtn}
                  onClick={() => {
                    router.push("/maker/date");
                    setSidebarOpen(false);
                  }}
                >
                  統計
                </button>
                {/* サイドバー：カレンダーボタン */}
                <button
                  className={stylesBtn.sidebarBtn}
                  onClick={() => {
                    router.push("/maker/calendar");
                    setSidebarOpen(false);
                  }}
                >
                  カレンダー
                </button>
                {/* サイドバー：ユーザー情報ボタン */}
                <button
                  className={stylesBtn.sidebarBtn}
                  onClick={() => {
                    router.push("/maker/user");
                    setSidebarOpen(false);
                  }}
                >
                  ユーザー情報
                </button>
                {/* サイドバー：ログアウトボタン */}
                <button
                  className={stylesBtn.sidebarBtn}
                  onClick={() => {
                    router.push("/");
                    setSidebarOpen(false);
                  }}
                >
                  ログアウト
                </button>
              </div>
            </div>
          )}
          <div className={styles.main}>
            {children}
          </div>
        </div>
        {/* フッター */}
        <div className={styles.footer}>© 2025 管理者アプリ</div>
      </div>
    </div>
  );
};

export default DesktopFrame;
