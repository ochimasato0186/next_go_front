"use client";
import React, { useState } from "react";

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay.getDay()).fill(null);

  for (let day = 1; day <= lastDay.getDate(); day++) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

const Calendar: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const matrix = getMonthMatrix(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div
      style={{
        maxWidth: 380,
        margin: "0 auto",
        fontFamily: "sans-serif",
        fontSize: 20,
        padding: 0,
      }}
    >
      {/* 学校名と学年クラス表示（仮のテキスト） */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>サンプル小学校</div>
        <div style={{ fontSize: 16 }}>6年2組</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <button style={{ fontSize: 22, padding: "3px 12px" }} onClick={prevMonth}>{"<"}</button>
        <span style={{ fontWeight: "bold", fontSize: 22 }}>{year}年 {month + 1}月</span>
        <button style={{ fontSize: 22, padding: "3px 12px" }} onClick={nextMonth}>{">"}</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {weekDays.map((d) => (
              <th
                key={d}
                style={{
                  padding: 8,
                  color: d === "日" ? "#e53935" : d === "土" ? "#1e88e5" : "#333",
                  fontSize: 18,
                }}
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td
                  key={j}
                  style={{
                    padding: 10,
                    textAlign: "center",
                    color: j === 0 ? "#e53935" : j === 6 ? "#1e88e5" : "#222",
                    fontWeight: day ? "bold" : undefined,
                    fontSize: 18,
                    background: "transparent",
                    borderRadius: 0,
                  }}
                >
                  {day ? day : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
