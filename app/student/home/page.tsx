"use client";
import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentBell from "../../../components/StudentBell";
import StudentFooter from "../../../components/StudentFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
  <SmartphoneHeader />
  <div style={{ position: 'absolute', top: '25mm', right: '3mm', zIndex: 50 }}><StudentBell count={3} /></div>
  <div className="flex justify-end pr-4"><StudentBell count={3} /></div>
        <main className="flex flex-col justify-center items-center min-h-screen p-0">
          <h1>生徒側ホーム画面</h1>
          <div className="flex justify-center items-center my-8" style={{ height: "540px" }}>
            <svg width="360" height="540">
              {/* 背景 */}
              <rect x="0" y="0" width="360" height="540" fill="#fff" />

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
            style={{ height: "49px", marginTop: "-26.5px" }}
          />
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
