import { BsBell } from "react-icons/bs";

type Props = {
  count?: number;
  color?: string;
};

export default function StudentBell({ count, color = "#222" }: Props) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <BsBell size={32} color={color} />
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
