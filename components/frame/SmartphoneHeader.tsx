"use client";
import React, { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "../../styles/SmartpjoneHeader.module.css";

const SmartphoneHeader: React.FC = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; school: string } | null>(null);

  useEffect(() => {
    fetch("/userInfo.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => setUserInfo(data))
      .catch(() => setUserInfo(null));
  }, []);

  return (
    <div className={styles.container} style={{width: "100%", margin: 0, padding: 0}}>
      <header className={styles.header} style={{background: "#3b4a5a"}}>
        <span className={styles.title}>No Look for School</span>
        <button
          className={styles.userButton}
          aria-label="ユーザー情報"
          onClick={() => setUserModalOpen(true)}
        >
          <FaRegCircleUser size={32} color="#fff" />
        </button>
      </header>
      {userModalOpen && (
        <div style={{
          position: "absolute",
          top: 70,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
          >
            <h2 id="user-modal-title" className={styles.modalTitle}>
              ユーザー情報
            </h2>
            {userInfo ? (
              <>
                <div className={styles.modalItem}>メールアドレス：{userInfo.email}</div>
                <div className={styles.modalItem}>ユーザー名：{userInfo.name}</div>
                <div className={styles.modalItem}>学校,所属名：{userInfo.school}</div>
              </>
            ) : (
              <div className={styles.modalItem}>読み込み失敗しました</div>
            )}
            <button className={styles.closeButton} onClick={() => setUserModalOpen(false)}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartphoneHeader;
