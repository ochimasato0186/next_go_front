
"use client";
import SettingMenu from "../../../components/SettingMenu";
import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentBell from "../../../components/student/StudentBell";
import StudentFooter from "../../../components/student/StudentFooter";

export default function Home() {
  return (
  <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
  <SmartphoneHeader />
  <div style={{ position: 'absolute', top: '25mm', right: '3mm', zIndex: 50 }}><StudentBell count={3} /></div>
  <div className="flex justify-end pr-4"><StudentBell count={3} /></div>
        <main className="flex-1 p-4 flex flex-col items-center justify-center" style={{ background: '#dcdcdc' }}>
          <SettingMenu />
        </main>
        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}
