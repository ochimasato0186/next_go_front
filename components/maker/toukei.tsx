import React from "react";
import type { PieData, ToukeiPieChartProps } from "../../types/toukei";
const ToukeiPieChart: React.FC<ToukeiPieChartProps> = ({ data, size = 480 }) => {
  // データをvalueの降順（大きい順）にソート
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  // 合計値
  const total = sortedData.reduce((sum, d) => sum + d.value, 0);
  // 円グラフの各セグメントの開始・終了角度を計算
  // 90°（上方向）からスタート
  let startAngle = -Math.PI / 2;
  const colors = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#a855f7", "#14b8a6"];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size/2},${size/2})`}>
        {sortedData.map((d, i) => {
          const angle = (d.value / total) * 2 * Math.PI;
          const endAngle = startAngle + angle;
          // 円弧の座標計算
          const radius = size/2 - 10;
          const x1 = radius * Math.cos(startAngle);
          const y1 = radius * Math.sin(startAngle);
          const x2 = radius * Math.cos(endAngle);
          const y2 = radius * Math.sin(endAngle);
          const largeArcFlag = angle > Math.PI ? 1 : 0;
          const pathData = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
          // セグメントの中央角度
          const midAngle = startAngle + angle / 2;
          const labelRadius = radius * 0.6; // 円の中心からラベルまでの距離
          const labelX = labelRadius * Math.cos(midAngle);
          const labelY = labelRadius * Math.sin(midAngle);
          const seg = (
            <g key={d.label}>
              <path
                d={pathData}
                fill={colors[i % colors.length]}
                stroke="#fff"
                strokeWidth={2}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={18}
                fill="#222"
                fontWeight="bold"
              >
                {d.label}
              </text>
            </g>
          );
          startAngle = endAngle;
          return seg;
        })}
      </g>
      {/* ラベル表示削除済み */}
    </svg>
  );
};

// 仮データ例
// const sampleData = [
//   { label: "A", value: 10 },
//   { label: "B", value: 20 },
//   { label: "C", value: 30 },
//   { label: "D", value: 40 },
// ];
// <ToukeiPieChart data={sampleData} />

export default ToukeiPieChart;
