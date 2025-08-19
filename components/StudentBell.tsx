import { BsBell } from "react-icons/bs";

export default function StudentBell({ count }: { count?: number }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <BsBell size={32} />
      {count && count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            background: "#e53935",
            color: "#fff",
            borderRadius: "50%",
            padding: "2px 7px",
            fontSize: 12,
            fontWeight: "bold",
            minWidth: 20,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
