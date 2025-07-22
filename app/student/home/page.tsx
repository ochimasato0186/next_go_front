
import Image from "next/image";
import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentFooter from "../../../components/StudentFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <SmartphoneHeader />
        <main className="flex-1 p-4">
          <h1>生徒側ホーム画面</h1>
          <p>ここに先生向けの機能やUIを追加できます。</p>
        </main>
        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}
