import DesktopFrame from "../../../components/DesktopFrame";
import ToukeiPieChart from "../../../components/toukei";

export default function Maker() {
  // 仮データ（ABCDの4区切り）
  const sampleData = [
    { label: "喜", value: 10 },
    { label: "怒", value: 20 },
    { label: "哀", value: 30 },
    { label: "楽", value: 40 },
  ];
  return (
    <DesktopFrame>
      <div style={{marginTop: 32, display: "flex", alignItems: "flex-start", gap: 48}}>
        {/* 円グラフ（左寄せ＆大きく） */}
        <div style={{flex: "0 0 auto"}}>
          <ToukeiPieChart data={sampleData} size={320} />
        </div>
        {/* データ数の表（右側） */}
        <div style={{flex: "0 0 auto", minWidth: 180}}>
          <table style={{borderCollapse: "collapse", width: "100%", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 8}}>
            <thead>
              <tr style={{background: "#f3f4f6"}}>
                <th style={{padding: "8px 12px", textAlign: "left", fontWeight: "bold"}}>区分</th>
                <th style={{padding: "8px 12px", textAlign: "right", fontWeight: "bold"}}>データ数</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((d, i) => (
                <tr key={d.label}>
                  <td style={{padding: "8px 12px", color: "#333"}}>{d.label}</td>
                  <td style={{padding: "8px 12px", textAlign: "right", color: "#333"}}>{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DesktopFrame>
  );
}
