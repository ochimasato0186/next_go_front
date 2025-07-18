// types/toukei.ts
// 円グラフ用データ型定義
export type PieData = {
  label: string;
  value: number;
};

export type ToukeiPieChartProps = {
  data: PieData[];
  size?: number;
};
