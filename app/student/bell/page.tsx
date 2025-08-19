
import Image from "next/image";
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
        <main className="flex-1 p-4">
          <h1>生徒側通知画面</h1>
          <p>ここに先生向けの機能やUIを追加できます。</p>
        </main>
        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}
