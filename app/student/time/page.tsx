
import SmartphoneFrame from "../../../components/SmartphoneFrame";
import SmartphoneHeader from "../../../components/SmartphoneHeader";
import StudentFooter from "../../../components/StudentFooter";
import Calendar from "../../../components/Calendar";
import StudentBell from "../../../components/StudentBell";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
            <SmartphoneHeader />
            <div style={{ position: 'absolute', top: '25mm', right: '3mm', zIndex: 50 }}><StudentBell count={3} /></div>
        <main className="flex-1 p-4 flex flex-col items-center justify-center">
          <div style={{ marginTop: "-210px" }}>
            <Calendar />
          </div>
        </main>
        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}
