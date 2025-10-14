"use client";
import React, { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "../../styles/SmartpjoneHeader.module.css";
import { getCurrentUser, User } from "../../lib/userManager";

const SmartphoneHeader: React.FC = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    // 新しいユーザー管理システムから現在のユーザー情報を取得
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserInfo(currentUser);
      return;
    }
    
    // フォールバック1: 従来のlocalStorageから読み込み
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        // 既存データを新しい形式に変換
        const convertedUser: User = {
          id: parsedUserInfo.userId || Date.now().toString(),
          email: parsedUserInfo.email,
          name: parsedUserInfo.name,
          school: parsedUserInfo.school,
          role: parsedUserInfo.role || 'student',
          password: '', // パスワードは表示しない
          createdAt: new Date().toISOString()
        };
        setUserInfo(convertedUser);
        return;
      } catch (error) {
        console.error('Failed to parse stored user info:', error);
      }
    }
    
    // フォールバック2: userInfo.jsonから読み込み
    fetch("/userInfo.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => {
        // 既存データを新しい形式に変換
        const convertedUser: User = {
          id: data.userId || Date.now().toString(),
          email: data.email,
          name: data.name,
          school: data.school,
          role: 'student', // デフォルト
          password: '', // パスワードは表示しない
          createdAt: new Date().toISOString()
        };
        setUserInfo(convertedUser);
      })
      .catch(() => setUserInfo(null));
  }, []);

  return (
    <div className={styles.container} style={{width: "100%", margin: 0, padding: 0}}>
      <header className={styles.header} style={{background: "#3b4a5a"}}>
        <span className={styles.title}>No Look </span>
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
                <div className={styles.modalItem}>学校名：{userInfo.school}</div>
                {userInfo.role && <div className={styles.modalItem}>ロール：{userInfo.role === 'student' ? '生徒' : '教師'}</div>}
                <div className={styles.modalItem}>ユーザーID：{userInfo.id}</div>
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
