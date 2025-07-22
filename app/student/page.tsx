
import Image from "next/image";
import SmartphoneFrame from "../../components/SmartphoneFrame";
import DesktopFrame from "../../components/DesktopFrame";
import Link from "next/link";
import SmartphoneHeader from "../../components/SmartphoneHeader";
import DesktopHeader from "../../components/DesktopHeader";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const content = (
    <>
      <h1>先生用メイン画面</h1>
      <p>ここに先生向けの機能やUIを追加できます。</p>
      <Link href="/student/home">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">ホーム</button>
      </Link>
      <Link href="/student/setting">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">設定</button>
      </Link>
      <Link href="/student/time">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">履歴</button>
      </Link>
      <Link href="/student/bell">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">通知</button>
      </Link>
    </>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SmartphoneFrame>
          <SmartphoneHeader />
          <main className="flex-1 p-4 flex flex-col items-center gap-4">{content}</main>
          <footer className="p-2 bg-gray-100 text-center">生徒メイン画面フッター</footer>
        </SmartphoneFrame>
      </div>
    );
  } else {
    return (
      <DesktopFrame>
        <DesktopHeader />
        <div style={{ padding: 24 }}>{content}</div>
        <footer style={{ textAlign: "center", marginTop: 32, color: "#888" }}>生徒メイン画面フッター</footer>
      </DesktopFrame>
    );
  }
}
