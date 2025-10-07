"use client";

import { useState, useEffect, useRef } from "react";
import DesktopFrame from "../../../components/frame/DesktopFrame";
import ToukeiPieChart from "../../../components/maker/toukei";
import MultiLineChart from "../../../components/maker/MultiLineChart";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DatePage() {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [sampleData, setSampleData] = useState<{ label: string; value: number; color: string }[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);
  const [aiComment, setAiComment] = useState<string>("");
  const [isGeneratingComment, setIsGeneratingComment] = useState<boolean>(false);
  
  const tableRef = useRef<HTMLDivElement>(null);
  const fullReportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // chartData.jsonを読み込む
    fetch("/chartData.json")
      .then(res => res.json())
      .then(data => {
        console.log('Loaded data:', data);
        setSampleData(data.pieData || []);
        setDates(data.dates || []);
        setLineData(data.lineData || []);
      })
      .catch(error => {
        console.error("データ読み込みエラー:", error);
        // フォールバックデータ
        setSampleData([
          { label: "カテゴリA", value: 30, color: "#ff6b6b" },
          { label: "カテゴリB", value: 45, color: "#4ecdc4" },
          { label: "カテゴリC", value: 25, color: "#45b7d1" }
        ]);
        setDates(["2024-01", "2024-02", "2024-03", "2024-04", "2024-05"]);
        setLineData([
          { label: "系列1", values: [10, 15, 20, 25, 30] },
          { label: "系列2", values: [5, 10, 15, 20, 25] }
        ]);
      });
  }, []);

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool(e.target.value);
  };

  const generateAiComment = async () => {
    setIsGeneratingComment(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const randomComments = [
        "データ分析結果：\n\n1. 全体的な上昇トレンドが確認されています\n2. 季節性の影響が見られます\n3. 改善の余地があります",
        "統計解析レポート：\n\n• 安定した成長パターンを示しています\n• 週期的な変動が観測されています\n• 継続的な監視が推奨されます"
      ];
      setAiComment(randomComments[Math.floor(Math.random() * randomComments.length)]);
    } catch (error) {
      setAiComment("分析中にエラーが発生しました。再度お試しください。");
    } finally {
      setIsGeneratingComment(false);
    }
  };

  const exportToPDF = async () => {
    if (!fullReportRef.current) return;
    try {
      // グラフの描画を待つための遅延
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pdf = new jsPDF('l', 'mm', 'a4');
      
      // 1ページ目: 円グラフ + 詳細データ + AI分析
      const topSectionRef = tableRef.current;
      if (topSectionRef) {
        const canvas1 = await html2canvas(topSectionRef, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: topSectionRef.scrollWidth + 50,
          height: topSectionRef.scrollHeight + 50,
          scrollX: 0,
          scrollY: 0
        });
        
        const imgData1 = canvas1.toDataURL('image/png');
        const imgWidth = 297;
        const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;
        
        pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, Math.min(imgHeight1, 210));
      }
      
      // 2ページ目: 折れ線グラフ + トレンド分析
      const bottomSection = fullReportRef.current.children[1] as HTMLElement;
      if (bottomSection) {
        pdf.addPage();
        
        const canvas2 = await html2canvas(bottomSection, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: bottomSection.scrollWidth + 100,
          height: bottomSection.scrollHeight + 50,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            const svgs = clonedDoc.querySelectorAll('svg');
            svgs.forEach(svg => {
              svg.style.overflow = 'visible';
              svg.style.width = '100%';
            });
          }
        });
        
        const imgData2 = canvas2.toDataURL('image/png');
        const imgHeight2 = (canvas2.height * 297) / canvas2.width;
        
        pdf.addImage(imgData2, 'PNG', 0, 0, 297, Math.min(imgHeight2, 210));
      }
      
      pdf.save(`統計レポート_${selectedSchool}_${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('PDF出力エラー:', error);
      alert('PDF出力中にエラーが発生しました。');
    }
  };

  const exportToJPEG = async () => {
    if (!fullReportRef.current) return;
    try {
      // グラフの描画を待つための遅延
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const timestamp = new Date().toLocaleDateString();
      
      // 1枚目: 円グラフ + 詳細データ + AI分析
      const topSectionRef = tableRef.current;
      if (topSectionRef) {
        const canvas1 = await html2canvas(topSectionRef, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: topSectionRef.scrollWidth + 50,
          height: topSectionRef.scrollHeight + 50,
          scrollX: 0,
          scrollY: 0
        });
        
        const link1 = document.createElement('a');
        link1.download = `統計レポート_円グラフ_${selectedSchool}_${timestamp}.jpg`;
        link1.href = canvas1.toDataURL('image/jpeg', 0.9);
        link1.click();
      }
      
      // 少し遅延を入れてから2枚目をダウンロード
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 2枚目: 折れ線グラフ + トレンド分析
      const bottomSection = fullReportRef.current.children[1] as HTMLElement;
      if (bottomSection) {
        const canvas2 = await html2canvas(bottomSection, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: bottomSection.scrollWidth + 100,
          height: bottomSection.scrollHeight + 50,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            const svgs = clonedDoc.querySelectorAll('svg');
            svgs.forEach(svg => {
              svg.style.overflow = 'visible';
              svg.style.width = '100%';
            });
          }
        });
        
        const link2 = document.createElement('a');
        link2.download = `統計レポート_折れ線グラフ_${selectedSchool}_${timestamp}.jpg`;
        link2.href = canvas2.toDataURL('image/jpeg', 0.9);
        link2.click();
      }
      
    } catch (error) {
      console.error('JPEG出力エラー:', error);
      alert('JPEG出力中にエラーが発生しました。');
    }
  };

  return (
    <DesktopFrame>
      <div style={{ 
        padding: '0px 24px 8px 24px', 
        minHeight: "110dvh", 
        height: "110dvh", 
        overflowY: "auto", 
        boxSizing: "border-box"
      }}>
        <h1>統計データダッシュボード</h1>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
          padding: "0 20px"
        }}>
          <select 
            value={selectedSchool} 
            onChange={handleSchoolChange}
            style={{
              padding: "10px 16px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "2px solid #d1d5db",
              backgroundColor: "#fff",
              minWidth: "200px"
            }}
          >
            <option value="">学校を選択</option>
            <option value="東京第一高校">東京第一高校</option>
            <option value="大阪中央中学">大阪中央中学</option>
            <option value="名古屋南小学校">名古屋南小学校</option>
          </select>
          
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={exportToPDF} style={{
              padding: "10px 20px",
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
               PDF出力
            </button>
            <button onClick={exportToJPEG} style={{
              padding: "10px 20px",
              backgroundColor: "#059669",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
               JPEG出力
            </button>
          </div>
        </div>

        {/* 全体レポート（円グラフ + 分析データ + 折れ線グラフ）をPDF/JPEG保存用にref適用 */}
        <div ref={fullReportRef} style={{ backgroundColor: "#f8fafc", padding: "20px", margin: "0 20px", borderRadius: "16px" }}>
          {/* 上段: 円グラフとサマリー */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "flex-start", 
            marginBottom: 48
          }}>
            <div ref={tableRef} style={{
              display: "flex", 
              alignItems: "flex-start", 
              justifyContent: "space-between",
              gap: 40, 
              backgroundColor: "#fff",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid #f1f5f9",
              maxWidth: "1200px",
              width: "100%"
            }}>
              <div style={{ 
                flex: "1 1 320px", 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center"
              }}>
                <h3 style={{
                  margin: "0 0 16px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  textAlign: "center"
                }}> データ分布</h3>
                {sampleData.length > 0 ? (
                  <ToukeiPieChart data={sampleData} size={320} />
                ) : (
                  <div style={{color: 'red', padding: '20px'}}>円グラフデータを読み込み中...</div>
                )}
              </div>

              <div style={{ 
                flex: "1 1 280px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <h3 style={{
                  margin: "0 0 16px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  textAlign: "center"
                }}> 詳細データ</h3>
                <table style={{ 
                  borderCollapse: "collapse", 
                  width: "100%",
                  border: "2px solid #e2e8f0",
                  background: "#fff", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th style={{ 
                        padding: "12px 16px", 
                        textAlign: "left", 
                        fontWeight: "bold",
                        color: "#1e293b",
                        fontSize: "14px"
                      }}>区分</th>
                      <th style={{ 
                        padding: "12px 16px", 
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "#1e293b",
                        fontSize: "14px"
                      }}>データ数</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((d, index) => (
                      <tr key={d.label} style={{
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc"
                      }}>
                        <td style={{ 
                          padding: "10px 16px", 
                          color: "#374151", 
                          border: "1px solid #e5e7eb",
                          fontSize: "13px"
                        }}>{d.label}</td>
                        <td style={{ 
                          padding: "10px 16px", 
                          textAlign: "right",
                          color: "#374151", 
                          border: "1px solid #e5e7eb",
                          fontSize: "13px",
                          fontWeight: "500"
                        }}>{d.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ 
                flex: "1 1 320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <h3 style={{
                  margin: "0 0 16px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  textAlign: "center"
                }}> AI分析レポート</h3>
                <div style={{
                  width: "100%",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "2px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#475569"
                    }}> 分析ステータス</div>
                    <button
                      onClick={generateAiComment}
                      disabled={isGeneratingComment}
                      style={{
                        padding: "8px 16px",
                        fontSize: "12px",
                        backgroundColor: isGeneratingComment ? "#94a3b8" : "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: isGeneratingComment ? "not-allowed" : "pointer",
                        fontWeight: "500"
                      }}
                    >
                      {isGeneratingComment ? "分析中..." : "分析実行"}
                    </button>
                  </div>
                  
                  <div style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "18px",
                    minHeight: "250px",
                    border: "1px solid #e2e8f0",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                    overflowY: "auto",
                    maxHeight: "320px"
                  }}>
                    {isGeneratingComment ? (
                      <div style={{ 
                        textAlign: "center", 
                        color: "#6b7280",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "200px"
                      }}>
                        <div style={{ fontSize: "32px", marginBottom: "12px" }}></div>
                        <div>AI分析中...</div>
                        <div style={{ fontSize: "12px", marginTop: "4px" }}>統計データを解析しています</div>
                      </div>
                    ) : aiComment ? (
                      <div>{aiComment}</div>
                    ) : (
                      <div style={{ 
                        textAlign: "center", 
                        color: "#94a3b8",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "200px"
                      }}>
                        <div style={{ fontSize: "32px", marginBottom: "12px" }}></div>
                        <div>AI分析を実行して詳細なレポートを生成</div>
                        <div style={{ fontSize: "12px", marginTop: "8px" }}>「分析実行」ボタンをクリック</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 下段: 折れ線グラフ + トレンド分析 */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "flex-start"
          }}>
            <div style={{
              display: "flex", 
              alignItems: "flex-start", 
              justifyContent: "space-between",
              gap: 30, 
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid #f1f5f9",
              maxWidth: "1200px",
              width: "100%"
            }}>
              <div style={{ 
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "visible",
                minWidth: "600px"
              }}>
                <h3 style={{
                  margin: "0 0 20px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  textAlign: "center"
                }}> 時系列トレンド</h3>
                {dates.length > 0 && lineData.length > 0 ? (
                  <div style={{ overflow: "visible", width: "100%", minWidth: "580px" }}>
                    <MultiLineChart dates={dates} lineData={lineData} width={580} height={390} />
                  </div>
                ) : (
                  <div style={{color: 'red', padding: '20px'}}>折れ線グラフデータを読み込み中...</div>
                )}
              </div>
              
              <div style={{ 
                flex: "0 0 auto", 
                width: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <h3 style={{
                  margin: "0 0 20px 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  textAlign: "center"
                }}> トレンド分析</h3>
                <div style={{
                  width: "100%",
                  backgroundColor: "#fefefe",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "2px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  height: "390px"
                }}>
                  <div style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "10px",
                    padding: "16px",
                    height: "350px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "#374151",
                    overflowY: "auto"
                  }}>
                    <div style={{ marginBottom: "16px" }}>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#1f2937" }}> データ概要</h4>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                         期間: {dates[0]} ～ {dates[dates.length - 1]}<br/>
                         データ系列: {lineData.length}種類<br/>
                         観測点: {dates.length}ポイント
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "16px" }}>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#1f2937" }}> トレンド傾向</h4>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {lineData.length > 0 ? (
                          lineData.map((series, index) => (
                            <div key={index} style={{ marginBottom: "4px" }}>
                               {series.label}: 分析中
                            </div>
                          ))
                        ) : (
                          <div>データを読み込み中...</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#1f2937" }}> 改善提案</h4>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                         定期的なデータ監視体制の構築<br/>
                         トレンド変化の早期発見システム<br/>
                         予測モデルの活用検討<br/>
                         データドリブンな意思決定の促進
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}