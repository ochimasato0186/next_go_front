"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SmartphoneFrame from "../../../components/frame/SmartphoneFrame";
import SmartphoneHeader from "../../../components/frame/SmartphoneHeader";
import StudentBell from "../../../components/student/StudentBell";
import StudentFooter from "../../../components/student/StudentFooter";
import { useNews, getCategoryColor, formatDate } from "../../../hooks/useNews";

export default function StudentBellPage() {
  // カスタムフックでニュースデータを取得
  const { news, loading, error, newNewsCount } = useNews();
  const [showAllNews, setShowAllNews] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <SmartphoneHeader />
        <div style={{ position: 'absolute', top: '25mm', right: '3mm', zIndex: 50 }}>
          <StudentBell count={newNewsCount} />
        </div>

        {/* お知らせタイトル */}
        <div style={{
          background: "#fff",
          padding: "16px 16px 8px 16px",
          marginTop: "calc(60px)"
        }}>
          <h1 style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
            margin: "0",
            textAlign: "center"
          }}>
            お知らせ
          </h1>
        </div>

        {/* 検索ヘッダー */}
        <div style={{
          background: "#fff",
          padding: "8px 16px 16px 16px",
          borderBottom: "1px solid #e5e7eb"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <Link href="/student/home">
              <button style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer"
              }}>
                ✕
              </button>
            </Link>
            <button style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer"
            }}>
              ◀
            </button>
            <div style={{
              background: "#f3f4f6",
              borderRadius: "20px",
              padding: "8px 16px",
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ 
                fontSize: "16px", 
                color: "#6b7280",
                fontFamily: "monospace"
              }}>⌕</span>
              <input
                type="text"
                placeholder="検索"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: "14px"
                }}
              />
            </div>
          </div>
        </div>

        {/* メインコンテンツエリア */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff"
        }}>
          {/* ニュースリスト */}
          <div style={{
            background: "#fff",
            flex: 1,
            overflowY: "auto"
          }}>
          {loading ? (
            <div style={{
              padding: "40px",
              textAlign: "center",
              color: "#6b7280"
            }}>
              <div style={{ fontSize: "14px" }}>読み込み中...</div>
            </div>
          ) : error ? (
            <div style={{
              padding: "40px",
              textAlign: "center",
              color: "#dc2626"
            }}>
              <div style={{ fontSize: "14px" }}>{error}</div>
            </div>
          ) : news.length === 0 ? (
            <div style={{
              padding: "40px",
              textAlign: "center",
              color: "#6b7280"
            }}>
              <div style={{ fontSize: "14px" }}>お知らせはありません</div>
            </div>
          ) : (
            news.map((item, index) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "16px",
                  cursor: "pointer"
                }}
              >
                <div style={{
                  fontSize: "14px",
                  color: "#374151",
                  fontWeight: "500",
                  marginBottom: "4px"
                }}>
                  {item.title}
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{
                    fontSize: "12px",
                    color: "#6b7280"
                  }}>
                    {formatDate(item.date)}
                  </div>
                  {item.isNew && (
                    <span style={{
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}>
                      New
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
          </div>
        </div>

        {/* 戻るボタン */}
        <div style={{
          padding: "16px",
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          position: "relative",
          zIndex: 10
        }}>
          <Link href="/student/home">
            <button style={{
              width: "100%",
              padding: "12px",
              background: "#3182ce",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3182ce";
            }}
            >
              ← ホームに戻る
            </button>
          </Link>
        </div>

        <StudentFooter />
      </SmartphoneFrame>
    </div>
  );
}