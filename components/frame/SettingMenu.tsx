"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SettingMenu: React.FC = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const menuItems = [
    { label: "アカウント", onClick: () => alert("アカウント") },
    { label: "ヘルプ", onClick: () => alert("ヘルプ") },
    {
      label: "お問い合わせ",
      element: (
        <a href="/student/question">
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: 24,
              border: "1.5px solid #bbb",
              borderRadius: 8,
              background: "#f5f5f5",
              cursor: "pointer",
              color: "#222",
              transition: "background 0.2s, borderColor 0.2s",
              boxSizing: "border-box",
            }}
            onMouseOver={e => {

              e.currentTarget.style.background = '#e0e0e0';
              e.currentTarget.style.borderColor = '#888';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#f5f5f5';
              e.currentTarget.style.borderColor = '#bbb';
            }}
          >
            お問い合わせ
          </button>
        </a>
      )
    },
    { label: "タイトルへ戻る", onClick: () => router.push("/") },
    { label: "ログアウト", onClick: () => setShowConfirm(true) },
  ];

  return (
    <div style={{ maxWidth: 340, margin: "40px auto", padding: 24, position: 'relative' }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ marginBottom: 40 }}>
            {item.element ? item.element : (
              <button
                onClick={item.onClick}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  fontSize: 24,
                  border: "1.5px solid #bbb",
                  borderRadius: 8,
                  background: "#f5f5f5",
                  cursor: "pointer",
                  color: item.label === "ログアウト" ? "#e53935" : "#222",
                  fontWeight: item.label === "ログアウト" ? "bold" : undefined,
                  transition: "background 0.2s, borderColor 0.2s",
                  boxSizing: "border-box",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#e0e0e0';
                  e.currentTarget.style.borderColor = '#888';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#bbb';
                }}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 260, textAlign: 'center', boxShadow: '0 2px 16px #0002' }}>
            <div style={{ fontSize: 18, marginBottom: 24 }}>本当にログアウトしますか？</div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  localStorage.removeItem("schoolInfo");
                  localStorage.removeItem("studentHomeBgColor");
                  setShowConfirm(false);
                  router.push("/login");
                }}
                style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
              >OK</button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ background: '#bbb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
              >キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingMenu;
