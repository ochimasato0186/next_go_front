"use client";
import DesktopFrame from "../../components/frame/DesktopFrame";
import { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: "重要" | "お知らせ" | "メンテナンス" | "アップデート";
  isNew: boolean;
}

interface EmotionData {
  id: number;
  emotion: string;
  yesterdayResult: number;
  todayResult: number;
  change: number;
  count: number;
}

export default function Maker() {
  // ニュースデータの状態管理
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllNews, setShowAllNews] = useState(false); // 全件表示フラグ
  
  // 感情データの状態管理
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [emotionLoading, setEmotionLoading] = useState(true);
  const [emotionError, setEmotionError] = useState<string | null>(null);

  // JSONファイルからニュースデータを取得
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
        setError(null);
      } catch (err) {
        console.error("ニュース取得エラー:", err);
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // JSONファイルから感情データを取得
  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        setEmotionLoading(true);
        const response = await fetch("/hyou.json");
        
        if (!response.ok) {
          throw new Error("感情データの取得に失敗しました");
        }
        
        const data: EmotionData[] = await response.json();
        setEmotionData(data);
        setEmotionError(null);
      } catch (err) {
        console.error("感情データ取得エラー:", err);
        setEmotionError(err instanceof Error ? err.message : "不明なエラーが発生しました");
      } finally {
        setEmotionLoading(false);
      }
    };

    fetchEmotionData();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "重要": return { bg: "#fee2e2", color: "#dc2626", border: "#fca5a5" };
      case "メンテナンス": return { bg: "#fef3c7", color: "#d97706", border: "#fcd34d" };
      case "アップデート": return { bg: "#dbeafe", color: "#2563eb", border: "#93c5fd" };
      case "お知らせ": return { bg: "#d1fae5", color: "#059669", border: "#6ee7b7" };
      default: return { bg: "#f3f4f6", color: "#374151", border: "#d1d5db" };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DesktopFrame>
      <div style={{ 
        padding: "16px"
      }}>
        {/* ヘッダーセクション */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "20px"
        }}>
          <div>
            <h1 style={{ 
              fontSize: "24px", 
              fontWeight: "bold", 
              color: "#1f2937",
              margin: "0 0 4px 0"
            }}>
              管理者ダッシュボード
            </h1>
            <p style={{ 
              color: "#6b7280", 
              fontSize: "14px",
              margin: 0
            }}>
              システム管理とお知らせの確認
            </p>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "500",
            boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
          }}>
            {formatDate(new Date().toISOString())}
          </div>
        </div>

        {/* ニュースセクション */}
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          marginBottom: "16px"
        }}>
          {/* ニュースヘッダー */}
          <div style={{
            background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
            padding: "8px 12px"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "14px" }}>📢</span>
                <h2 style={{ 
                  fontSize: "14px", 
                  fontWeight: "bold", 
                  color: "#fff",
                  margin: 0
                }}>
                  最新ニュース
                </h2>
              </div>
              <div style={{
                background: "#dc2626",
                color: "#fff",
                padding: "1px 6px",
                borderRadius: "10px",
                fontSize: "9px",
                fontWeight: "600"
              }}>
                {loading ? "-" : news.filter(item => item.isNew).length}
              </div>
            </div>
          </div>

          {/* ニュースリスト */}
          <div style={{ 
            maxHeight: showAllNews ? "400px" : "180px", 
            overflowY: "auto",
            transition: "max-height 0.3s ease"
          }}>
            {loading ? (
              // ローディング状態
              <div style={{ 
                padding: "40px", 
                textAlign: "center", 
                color: "#6b7280" 
              }}>
                <div style={{ marginBottom: "8px" }}>📰</div>
                <div style={{ fontSize: "12px" }}>ニュースを読み込み中...</div>
              </div>
            ) : error ? (
              // エラー状態
              <div style={{ 
                padding: "40px", 
                textAlign: "center", 
                color: "#dc2626" 
              }}>
                <div style={{ marginBottom: "8px" }}>⚠️</div>
                <div style={{ fontSize: "12px" }}>{error}</div>
              </div>
            ) : news.length === 0 ? (
              // データなし状態
              <div style={{ 
                padding: "40px", 
                textAlign: "center", 
                color: "#6b7280" 
              }}>
                <div style={{ marginBottom: "8px" }}>📋</div>
                <div style={{ fontSize: "12px" }}>ニュースはありません</div>
              </div>
            ) : (
              // ニュース表示（表示件数を動的に変更）
              (showAllNews ? news : news.slice(0, 3)).map((item, index, currentArray) => {
                const categoryStyle = getCategoryColor(item.category);
                return (
                  <div 
                    key={item.id}
                    style={{
                      borderBottom: index < currentArray.length - 1 ? "1px solid #f3f4f6" : "none",
                      padding: "8px 12px",
                      transition: "background 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                      {/* NEW バッジ */}
                      {item.isNew && (
                        <div style={{
                          background: "#ef4444",
                          color: "#fff",
                          fontSize: "7px",
                          fontWeight: "bold",
                          padding: "1px 4px",
                          borderRadius: "6px",
                          flexShrink: 0,
                          marginTop: "1px"
                        }}>
                          NEW
                        </div>
                      )}
                      
                      {/* コンテンツ */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                          {/* カテゴリバッジ */}
                          <span style={{
                            background: categoryStyle.bg,
                            color: categoryStyle.color,
                            padding: "1px 6px",
                            borderRadius: "8px",
                            fontSize: "9px",
                            fontWeight: "600"
                          }}>
                            {item.category}
                          </span>
                          
                          {/* 日付 */}
                          <span style={{
                            color: "#6b7280",
                            fontSize: "9px"
                          }}>
                            {formatDate(item.date)}
                          </span>
                        </div>
                        
                        {/* タイトル */}
                        <h3 style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: "0 0 2px 0",
                          lineHeight: "1.3"
                        }}>
                          {item.title}
                        </h3>
                        
                        {/* 内容 */}
                        <p style={{
                          fontSize: "10px",
                          color: "#4b5563",
                          margin: 0,
                          lineHeight: "1.3",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: showAllNews ? 3 : 1, // 全件表示時は3行まで
                          WebkitBoxOrient: "vertical"
                        }}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* フッター */}
          <div style={{
            background: "#f9fafb",
            padding: "6px 12px",
            textAlign: "center",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            {/* 件数表示 */}
            <div style={{
              fontSize: "10px",
              color: "#6b7280"
            }}>
              {loading ? "読み込み中..." : 
               showAllNews ? `全 ${news.length} 件` : 
               `${Math.min(3, news.length)} / ${news.length} 件`}
            </div>
            
            {/* 切り替えボタン */}
            <button 
              disabled={loading || news.length <= 3}
              style={{
                background: (loading || news.length <= 3) ? "#9ca3af" : "#3b82f6",
                color: "#fff",
                border: "none",
                padding: "4px 12px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: "500",
                cursor: (loading || news.length <= 3) ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
              onClick={() => setShowAllNews(!showAllNews)}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "#2563eb";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = "#3b82f6";
                }
              }}
            >
              {showAllNews ? "折りたたむ" : "すべて見る"}
            </button>
          </div>
        </div>

        {/* 感情データセクション */}
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          marginTop: "19px", // 5mm ≈ 19px
          marginBottom: "20px" // 下部に余白を追加
        }}>
          {/* 感情データヘッダー */}
          <div style={{
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            padding: "8px 12px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "14px" }}>📊</span>
              <h2 style={{ 
                fontSize: "14px", 
                fontWeight: "bold", 
                color: "#fff",
                margin: 0
              }}>
                感情分析データ
              </h2>
            </div>
          </div>

          {/* 感情データテーブル */}
          <div style={{ 
            overflowX: "auto",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch" // iOS向けのスムーズスクロール
          }}>
            {emotionLoading ? (
              // ローディング状態
              <div style={{ 
                padding: "40px", 
                textAlign: "center", 
                color: "#6b7280" 
              }}>
                <div style={{ marginBottom: "8px" }}>📊</div>
                <div style={{ fontSize: "12px" }}>感情データを読み込み中...</div>
              </div>
            ) : emotionError ? (
              // エラー状態
              <div style={{ 
                padding: "40px", 
                textAlign: "center", 
                color: "#dc2626" 
              }}>
                <div style={{ marginBottom: "8px" }}>⚠️</div>
                <div style={{ fontSize: "12px" }}>{emotionError}</div>
              </div>
            ) : emotionData.length === 0 ? (
              // データなし状態
              <div style={{ 
                padding: "40px", 
                textAlign: "center", 
                color: "#6b7280" 
              }}>
                <div style={{ marginBottom: "8px" }}>📋</div>
                <div style={{ fontSize: "12px" }}>感情データはありません</div>
              </div>
            ) : (
              <table style={{ 
                width: "100%", 
                borderCollapse: "collapse",
                fontSize: "11px"
              }}>
                <thead>
                  <tr style={{ 
                    background: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0"
                  }}>
                    <th style={{ 
                      padding: "8px 6px", 
                      textAlign: "left", 
                      fontWeight: "600",
                      color: "#374151",
                      minWidth: "80px"
                    }}>
                      感情
                    </th>
                    <th style={{ 
                      padding: "8px 6px", 
                      textAlign: "center", 
                      fontWeight: "600",
                      color: "#374151",
                      minWidth: "60px"
                    }}>
                      前日
                    </th>
                    <th style={{ 
                      padding: "8px 6px", 
                      textAlign: "center", 
                      fontWeight: "600",
                      color: "#374151",
                      minWidth: "60px"
                    }}>
                      本日
                    </th>
                    <th style={{ 
                      padding: "8px 6px", 
                      textAlign: "center", 
                      fontWeight: "600",
                      color: "#374151",
                      minWidth: "50px"
                    }}>
                      増減値
                    </th>
                    <th style={{ 
                      padding: "8px 6px", 
                      textAlign: "center", 
                      fontWeight: "600",
                      color: "#374151",
                      minWidth: "50px"
                    }}>
                      人数
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emotionData.map((item, index) => (
                    <tr 
                      key={item.id}
                      style={{ 
                        background: index % 2 === 0 ? "#fff" : "#f8fafc",
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e0f2fe";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#f8fafc";
                      }}
                    >
                      {/* 感情 */}
                      <td style={{ 
                        padding: "8px 6px",
                        fontWeight: "500",
                        color: "#1f2937"
                      }}>
                        {item.emotion}
                      </td>
                      
                      {/* 前日の結果 */}
                      <td style={{ 
                        padding: "8px 6px", 
                        textAlign: "center",
                        color: "#4b5563"
                      }}>
                        {item.yesterdayResult}
                      </td>
                      
                      {/* 本日の結果 */}
                      <td style={{ 
                        padding: "8px 6px", 
                        textAlign: "center",
                        fontWeight: "600",
                        color: "#1f2937"
                      }}>
                        {item.todayResult}
                      </td>
                      
                      {/* 増減値 */}
                      <td style={{ 
                        padding: "8px 6px", 
                        textAlign: "center",
                        fontWeight: "600"
                      }}>
                        <span style={{
                          color: item.change > 0 ? "#059669" : item.change < 0 ? "#dc2626" : "#6b7280",
                          background: item.change > 0 ? "#ecfdf5" : item.change < 0 ? "#fef2f2" : "#f3f4f6",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontSize: "10px"
                        }}>
                          {item.change > 0 ? "+" : ""}{item.change}
                        </span>
                      </td>
                      
                      {/* 人数 */}
                      <td style={{ 
                        padding: "8px 6px", 
                        textAlign: "center",
                        color: "#4b5563"
                      }}>
                        <span style={{
                          background: "#dbeafe",
                          color: "#1e40af",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontSize: "10px",
                          fontWeight: "500"
                        }}>
                          {item.count}名
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}
