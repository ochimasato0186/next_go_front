import SmartphoneFrame from "../../../components/SmartphoneFrame";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <header className="p-2 bg-gray-100 text-center font-bold">
          履歴画面ヘッダー
        </header>
        <main className="flex-1 p-4">
          <h1>生徒側履歴画面</h1>
          <p>ここに先生向けの機能やUIを追加できます。</p>
        </main>
        <footer className="p-2 bg-gray-100 text-center">
          履歴画面フッター
        </footer>
      </SmartphoneFrame>
    </div>
  );
}
