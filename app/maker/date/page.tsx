"use client";
import { useEffect, useState } from "react";
import DesktopFrame from "../../../components/DesktopFrame";
import ToukeiPieChart from "../../../components/maker/toukei";
import ToukeiLineChart from "../../../components/maker/ToukeiLineChart";
import MultiLineChart from "../../../components/maker/MultiLineChart";

export default function Maker() {

  const [lineData, setLineData] = useState<any[]>([]);
  const [dates, setDates] = useState(["7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7"]);
  const [sampleData, setSampleData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/chartData.json")
      .then((res) => res.json())
      .then((data) => {
        setLineData(data);
        setSampleData(data.map((d: any) => ({ label: d.label, value: d.values[d.values.length - 1] })));
      });
  }, []);


  return (
    <DesktopFrame>
      <div style={{ padding: '0px 24px 8px 24px', minHeight: "110dvh", height: "110dvh", overflowY: "auto", boxSizing: "border-box" }}>
        {/* 折れ線グラフ（上部） */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 64, alignItems: "flex-start" }}>
          <MultiLineChart dates={dates} lineData={lineData} width={720} height={390} />
          <div style={{ width: "4cm", height: "1cm", marginLeft: 32, display: "flex", alignItems: "center" }}>
            <select style={{ width: "100%", height: "100%", fontSize: "1rem", border: "1px solid #222", borderRadius: 6, padding: "0 8px", background: "#fff", color: "#222" }}>
              <option>学校,所属名</option>
              <option>東中学校</option>
              <option>南高校</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>
          {/* 円グラフ（左） */}
          <div style={{ flex: "0 0 auto", marginTop: -40 }}>
            <ToukeiPieChart data={sampleData} size={320} />
          </div>

          {/* 表（右） */}
          <div style={{ flex: "0 0 auto", minWidth: 180 }}>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: 8, border: "2px solid #222" }}>
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: "bold" }}>区分</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: "bold" }}>データ数</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((d) => (
                    <tr key={d.label}>
                      <td style={{ padding: "8px 12px", color: "#333", border: "1px solid #222" }}>{d.label}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", color: "#333", border: "1px solid #222" }}>{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}
