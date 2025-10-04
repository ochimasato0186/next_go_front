// ニュースデータを取得する共通のカスタムフック
"use client";

import { useState, useEffect } from 'react';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: "重要" | "お知らせ" | "メンテナンス" | "アップデート";
  isNew: boolean;
}

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/news.json");
        
        if (!response.ok) {
          throw new Error("ニュースデータの取得に失敗しました");
        }
        
        const newsData: NewsItem[] = await response.json();
        
        // 日付でソート（新しい順）
        const sortedNews = newsData.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setNews(sortedNews);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 新しいニュースの件数を取得
  const newNewsCount = news.filter(item => item.isNew).length;

  return { news, loading, error, newNewsCount };
};

// カテゴリ別スタイル
export const getCategoryColor = (category: string) => {
  switch (category) {
    case "重要":
      return { bg: "#dc2626", color: "#fff" };
    case "お知らせ":
      return { bg: "#2563eb", color: "#fff" };
    case "メンテナンス":
      return { bg: "#f59e0b", color: "#fff" };
    case "アップデート":
      return { bg: "#059669", color: "#fff" };
    default:
      return { bg: "#6b7280", color: "#fff" };
  }
};

// 日付フォーマット
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};