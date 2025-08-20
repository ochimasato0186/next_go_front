"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SettingMenu: React.FC = () => {
  const router = useRouter();
  const menuItems = [
    { label: "アカウント", onClick: () => alert("アカウント") },
    { label: "ヘルプ", onClick: () => alert("ヘルプ") },
    { label: "お問い合わせ", element: (
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
              transition: "background 0.2s, border-color 0.2s",
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
    { label: "ログアウト", onClick: () => alert("ログアウト") },
  ];

  // デバッグ用: routerが正しく取得できているか確認
  useEffect(() => {
    console.log("router:", router);
  }, [router]);

  return (
    <div style={{ maxWidth: 340, margin: "40px auto", padding: 24, background: "#dcdcdc" }}>
      {/* <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" }}>設定</h2> */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li key={item.label} style={{ marginBottom: 40 }}>
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
                  fontWeight: item.label === "ログアウト" ? "bold" : undefined,
                  color: item.label === "ログアウト" ? "#e53935" : "#222",
                  transition: "background 0.2s, border-color 0.2s",
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
    </div>
  );
};

export default SettingMenu;
