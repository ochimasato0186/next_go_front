"use client";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  date: string;
  title: string;
  time: string;
  description: string;
  color: string;
}

interface EventCalendarProps {
  events?: Event[];
  onEventAdd?: (event: Omit<Event, 'id'>) => void;
  onEventEdit?: (eventId: string, updatedEvent: Omit<Event, 'id'>) => void;
  onEventDelete?: (eventId: string) => void;
}

export default function EventCalendar({ events = [], onEventAdd, onEventEdit, onEventDelete }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    time: "",
    description: "",
    color: "#3b82f6"
  });

  // 月の日数を取得
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 月の最初の曜日を取得
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 日付の文字列フォーマット
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // 月を変更
  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  // 日付クリック時の処理（新規追加）
  const handleDateClick = (day: number) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(dateStr);
    setEditingEvent(null);
    setEventForm({ title: "", time: "", description: "", color: "#3b82f6" });
    setShowEventModal(true);
  };

  // イベントクリック時の処理（編集）
  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation(); // 日付クリックイベントを止める
    setEditingEvent(event);
    setSelectedDate(event.date);
    setEventForm({
      title: event.title,
      time: event.time,
      description: event.description,
      color: event.color
    });
    setShowEventModal(true);
  };

  // イベント保存（追加または編集）
  const handleSaveEvent = () => {
    if (eventForm.title && selectedDate) {
      if (editingEvent && onEventEdit) {
        // 編集モード
        onEventEdit(editingEvent.id, {
          date: selectedDate,
          title: eventForm.title,
          time: eventForm.time,
          description: eventForm.description,
          color: eventForm.color
        });
      } else if (onEventAdd) {
        // 新規追加モード
        onEventAdd({
          date: selectedDate,
          title: eventForm.title,
          time: eventForm.time,
          description: eventForm.description,
          color: eventForm.color
        });
      }
      handleCloseModal();
    }
  };

  // イベント削除
  const handleDeleteEvent = () => {
    if (editingEvent && onEventDelete) {
      onEventDelete(editingEvent.id);
      handleCloseModal();
    }
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setEventForm({ title: "", time: "", description: "", color: "#3b82f6" });
  };

  // 特定日のイベントを取得
  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  // カレンダーグリッドを生成
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

    const calendar = [];
    
    // 空のセルを追加（前月の余り）
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} style={{ padding: "8px" }}></div>);
    }
    
    // 日付セルを追加
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day);
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === todayStr;
      
      calendar.push(
        <div
          key={day}
          style={{
            padding: "4px",
            minHeight: "80px",
            border: "1px solid #e5e7eb",
            backgroundColor: isToday ? "#eff6ff" : "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isToday ? "#eff6ff" : "#fff";
          }}
          onClick={() => handleDateClick(day)}
        >
          <div style={{
            fontSize: "14px",
            fontWeight: isToday ? "bold" : "normal",
            color: isToday ? "#1e40af" : "#374151",
            marginBottom: "4px"
          }}>
            {day}
          </div>
          
          {/* イベント表示 */}
          {dayEvents.slice(0, 3).map((event, index) => (
            <div
              key={event.id}
              style={{
                fontSize: "10px",
                padding: "1px 4px",
                marginBottom: "1px",
                backgroundColor: event.color,
                color: "#fff",
                borderRadius: "2px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer"
              }}
              onClick={(e) => handleEventClick(event, e)}
              title={`クリックして編集: ${event.time} ${event.title}`}
            >
              {event.time} {event.title}
            </div>
          ))}
          
          {/* 追加イベント表示 */}
          {dayEvents.length > 3 && (
            <div style={{
              fontSize: "9px",
              color: "#6b7280",
              textAlign: "center"
            }}>
              +{dayEvents.length - 3} more
            </div>
          )}
        </div>
      );
    }
    
    return calendar;
  };

  return (
    <>
      {/* ヘッダー */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "24px",
        background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        padding: "16px 24px",
        borderRadius: "12px",
        color: "#fff"
      }}>
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          margin: 0
        }}>
          📅 カレンダー
        </h1>
        
        {/* 月ナビゲーション */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => changeMonth(-1)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            ←
          </button>
          
          <div style={{ fontSize: "20px", fontWeight: "bold", minWidth: "150px", textAlign: "center" }}>
            {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
          </div>
          
          <button
            onClick={() => changeMonth(1)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* カレンダー */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        border: "1px solid #e2e8f0"
      }}>
        {/* 曜日ヘッダー */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
            <div
              key={day}
              style={{
                padding: "12px 8px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#f8fafc",
                color: index === 0 ? "#dc2626" : index === 6 ? "#2563eb" : "#374151",
                border: "1px solid #e5e7eb"
              }}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* カレンダーグリッド */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {generateCalendar()}
        </div>
      </div>

      {/* イベント追加モーダル */}
      {showEventModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }} onClick={() => setShowEventModal(false)}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            width: "400px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#1f2937" }}>
              {editingEvent ? "予定を編集" : "予定を追加"} - {selectedDate}
            </h2>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500" }}>
                タイトル *
              </label>
              <input
                type="text"
                value={eventForm.title}
                onChange={e => setEventForm({...eventForm, title: e.target.value})}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
                placeholder="予定のタイトルを入力"
              />
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500" }}>
                時間
              </label>
              <input
                type="time"
                value={eventForm.time}
                onChange={e => setEventForm({...eventForm, time: e.target.value})}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500" }}>
                説明
              </label>
              <textarea
                rows={3}
                value={eventForm.description}
                onChange={e => setEventForm({...eventForm, description: e.target.value})}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  resize: "vertical"
                }}
                placeholder="詳細説明（任意）"
              />
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500" }}>
                色
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#6b7280"].map(color => (
                  <button
                    key={color}
                    onClick={() => setEventForm({...eventForm, color})}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      background: color,
                      border: eventForm.color === color ? "3px solid #1f2937" : "1px solid #d1d5db",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              {editingEvent && (
                <button
                  onClick={handleDeleteEvent}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  削除
                </button>
              )}
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "8px 16px",
                  background: "#f3f4f6",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveEvent}
                disabled={!eventForm.title}
                style={{
                  padding: "8px 16px",
                  background: eventForm.title ? "#3b82f6" : "#9ca3af",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: eventForm.title ? "pointer" : "not-allowed",
                  fontSize: "14px"
                }}
              >
                {editingEvent ? "更新" : "追加"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Event型をエクスポート
export type { Event };