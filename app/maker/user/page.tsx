"use client";
import DesktopFrame from "../../../components/DesktopFrame";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  grade: string;
  class: string;
  remarks: string;
}

export default function MakerUser() {
  // サンプルデータ（実際の運用では API から取得）
  const [users] = useState<User[]>([
    { id: 1, name: "田中 太郎", grade: "1年", class: "A組", remarks: "学級委員" },
    { id: 2, name: "佐藤 花子", grade: "1年", class: "A組", remarks: "図書委員" },
    { id: 3, name: "山田 次郎", grade: "1年", class: "B組", remarks: "体育委員" },
    { id: 4, name: "鈴木 美咲", grade: "2年", class: "A組", remarks: "生徒会役員" },
    { id: 5, name: "高橋 健太", grade: "2年", class: "B組", remarks: "文化祭実行委員" },
    { id: 6, name: "中村 愛美", grade: "2年", class: "C組", remarks: "放送委員" },
    { id: 7, name: "小林 大輔", grade: "3年", class: "A組", remarks: "部活動部長" },
    { id: 8, name: "加藤 優子", grade: "3年", class: "B組", remarks: "卒業委員" },
    { id: 9, name: "渡辺 雄一", grade: "3年", class: "C組", remarks: "進路委員" },
    { id: 10, name: "松本 理恵", grade: "1年", class: "C組", remarks: "環境委員" }
  ]);

  return (
    <DesktopFrame>
      <div style={{ padding: "20px", maxWidth: "100%", overflow: "auto" }}>
        <h1 style={{ 
          fontSize: "28px", 
          fontWeight: "bold", 
          marginBottom: "24px", 
          color: "#2d3748",
          borderBottom: "2px solid #3182ce",
          paddingBottom: "8px"
        }}>
          グループユーザー情報
        </h1>
        
        <div style={{ 
          background: "#fff", 
          borderRadius: "12px", 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          border: "1px solid #e2e8f0"
        }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            fontSize: "14px"
          }}>
            <thead>
              <tr style={{ 
                background: "linear-gradient(135deg, #3182ce 0%, #2563eb 100%)",
                color: "#fff"
              }}>
                <th style={{ 
                  padding: "16px 12px", 
                  textAlign: "center", 
                  fontWeight: "600",
                  fontSize: "15px",
                  width: "60px"
                }}>
                  No
                </th>
                <th style={{ 
                  padding: "16px 12px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  fontSize: "15px",
                  width: "140px"
                }}>
                  名前
                </th>
                <th style={{ 
                  padding: "16px 12px", 
                  textAlign: "center", 
                  fontWeight: "600",
                  fontSize: "15px",
                  width: "80px"
                }}>
                  学年
                </th>
                <th style={{ 
                  padding: "16px 12px", 
                  textAlign: "center", 
                  fontWeight: "600",
                  fontSize: "15px",
                  width: "80px"
                }}>
                  クラス
                </th>
                <th style={{ 
                  padding: "16px 12px", 
                  textAlign: "left", 
                  fontWeight: "600",
                  fontSize: "15px"
                }}>
                  備考
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user.id} 
                  style={{ 
                    background: index % 2 === 0 ? "#f8fafc" : "#fff",
                    borderBottom: "1px solid #e2e8f0",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e6f3ff";
                    e.currentTarget.style.transform = "scale(1.001)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? "#f8fafc" : "#fff";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <td style={{ 
                    padding: "14px 12px", 
                    textAlign: "center", 
                    fontWeight: "500",
                    color: "#4a5568"
                  }}>
                    {user.id}
                  </td>
                  <td style={{ 
                    padding: "14px 12px", 
                    fontWeight: "500",
                    color: "#2d3748"
                  }}>
                    {user.name}
                  </td>
                  <td style={{ 
                    padding: "14px 12px", 
                    textAlign: "center",
                    color: "#4a5568"
                  }}>
                    <span style={{
                      background: "#e6f3ff",
                      color: "#1e40af",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {user.grade}
                    </span>
                  </td>
                  <td style={{ 
                    padding: "14px 12px", 
                    textAlign: "center",
                    color: "#4a5568"
                  }}>
                    <span style={{
                      background: "#f0fdf4",
                      color: "#166534",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {user.class}
                    </span>
                  </td>
                  <td style={{ 
                    padding: "14px 12px",
                    color: "#4a5568"
                  }}>
                    <span style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "3px 8px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "400"
                    }}>
                      {user.remarks}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ 
          marginTop: "24px", 
          textAlign: "right",
          color: "#6b7280",
          fontSize: "14px"
        }}>
          合計: {users.length} 名のユーザー
        </div>
      </div>
    </DesktopFrame>
  );
}
