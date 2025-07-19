import SmartphoneFrame from "../../components/SmartphoneFrame";
import Link from "next/link";
import SmartphoneHeader from "../../components/SmartphoneHeader";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <SmartphoneHeader />
        <main className="flex-1 p-4">
          <h1>先生用メイン画面</h1>
          <p>ここに先生向けの機能やUIを追加できます。</p>
          <Link href="/teacher/bell">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              通知
            </button>
          </Link>
          <Link href="/teacher/home">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              ホーム
            </button>
          </Link>
          <Link href="/teacher/pdf">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              PDF
            </button>
          </Link>
          <Link href="/teacher/question">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              お問い合わせ
            </button>
          </Link>
          <Link href="/teacher/setting">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              設定
            </button>
          </Link>
        </main>
        <footer className="p-2 bg-gray-100 text-center">
          先生メイン画面フッター
        </footer>
      </SmartphoneFrame>
    </div>
  );
}
