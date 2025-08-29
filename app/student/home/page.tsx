"use client";

import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentBell from "../../../components/StudentBell";
import StudentFooter from "../../../components/StudentFooter";
import { useEffect, useState } from "react";

export default function Home() {

  const [bgColor, setBgColor] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(true);

  // 色選択後はshowSelector=false、再レンダリング時は毎回trueに戻る

  const handleColorSelect = (color: string) => {
    setBgColor(color);
    localStorage.setItem("studentHomeBgColor", color);
    setShowSelector(false);
  };

  // 色リスト
  const colorList = [
    { name: "赤", value: "#e53935" },
    { name: "青", value: "#1976d2" },
    { name: "ピンク", value: "#ec407a" },
    { name: "黄色", value: "#ffd600" },
    { name: "緑", value: "#43a047" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <SmartphoneHeader />
        <div style={{ position: 'absolute', top: '25mm', right: '3mm', zIndex: 50 }}><StudentBell count={3} /></div>
        <div className="flex justify-end pr-4"><StudentBell count={3} /></div>
  <main className="flex flex-col justify-center items-center min-h-screen p-0" style={{ background: bgColor || '#fff', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {showSelector ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%',
              minHeight: '320px',
              minWidth: '100%',
              position: 'absolute',
              top: 'calc(50% - 2cm)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>背景色を選んでください</h2>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                {colorList.map(c => (
                  <button
                    key={c.value}
                    onClick={() => handleColorSelect(c.value)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: c.value,
                      border: '2px solid #888',
                      cursor: 'pointer',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={c.name}
                  />
                ))}
              </div>
              <div style={{ fontSize: 15, color: '#888' }}>※後から設定画面で変更できます</div>
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center my-8" style={{ height: "540px", width: "100%", background: bgColor || '#fff', borderRadius: 16, marginTop: '-4cm' }}>
                <svg width="360" height="540">
                  {/* 背景 */}
                  <rect x="0" y="0" width="360" height="540" fill={bgColor || '#fff'} />
                  {/* グループ化して一斉にアニメーション */}
                  <g className="floating-group">
                    {/* 頭 */}
                    <circle cx="180" cy="120" r="60" fill="#ffffff" stroke="#000" strokeWidth="9" />
                    {/* 体 */}
                    <ellipse cx="180" cy="330" rx="56" ry="150" fill="#ffffff" stroke="#000" strokeWidth="9" />
                    {/* 右手 */}
                    <ellipse
                      cx="258.54"
                      cy="239.54"
                      rx="36"
                      ry="72"
                      fill="#ffffff"
                      stroke="#000"
                      strokeWidth="9"
                      transform="rotate(-225 258.54 239.54)"
                    />
                    {/* 左手 */}
                    <ellipse
                      cx="101.46"
                      cy="239.54"
                      rx="36"
                      ry="72"
                      fill="#ffffff"
                      stroke="#000"
                      strokeWidth="9"
                      transform="rotate(225 101.46 239.54)"
                    />
                  </g>
                </svg>
              </div>
              {/* テキストボックス：横256px, 縦49px、0.7cm（26.5px）上に移動 */}
              <input
                type="text"
                placeholder="入力する"
                className="border border-gray-400 rounded px-4 w-64"
                style={{ height: "49px", marginTop: "-26.5px", background: bgColor || '#fff' }}
              />
            </>
          )}
        </main>
        <StudentFooter />
      </SmartphoneFrame>

      <style jsx>{`
        .floating-group {
          animation: floatUpDown 2.5s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes floatUpDown {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-24px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
