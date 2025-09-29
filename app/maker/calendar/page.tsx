import DesktopFrame from "../../../components/DesktopFrame";

export default function MakerCalendar() {
  return (
    <DesktopFrame>
      <div style={{ padding: "20px" }}>
        <h1 style={{ 
          fontSize: "28px", 
          fontWeight: "bold", 
          marginBottom: "24px", 
          color: "#2d3748",
          borderBottom: "2px solid #3182ce",
          paddingBottom: "8px"
        }}>
          カレンダー
        </h1>
        
        <div style={{ 
          background: "#fff", 
          borderRadius: "12px", 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          border: "1px solid #e2e8f0"
        }}>
          <p style={{ 
            fontSize: "16px", 
            color: "#4a5568",
            textAlign: "center",
            margin: 0
          }}>
            カレンダー機能を実装予定です。<br />
            ここにスケジュール管理やイベント表示機能を追加できます。
          </p>
        </div>
      </div>
    </DesktopFrame>
  );
}