
"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/SmartpjoneHeader.module.css";
import { FaHome } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<any>> = {
  FaHome,
  FaCalendarDays,
  IoMdSettings,
};

const StudentFooter: React.FC = () => {
  const [items, setItems] = useState<Array<{ icon: string; href: string }>>([]);

  useEffect(() => {
    fetch("/icon.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <footer className={styles.studentFooter}>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {items.map((item, idx) => {
          const Icon = iconMap[item.icon];
          // 左・中央・右の配置を維持
          let justify: "flex-start" | "center" | "flex-end" = "center";
          let pad = {};
          if (idx === 0) { justify = "flex-start"; pad = { paddingLeft: "1.5cm" }; }
          if (idx === 1) { justify = "center"; pad = {}; }
          if (idx === 2) { justify = "flex-end"; pad = { paddingRight: "1.5cm" }; }
          return (
            <div key={item.icon} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: justify, height: "100%", ...pad }}>
              <Link href={item.href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "1.5cm", height: "1.5cm" }}>
                {Icon && <Icon color="#fff" size={57} style={{ width: "1.5cm", height: "1.5cm" }} />}
              </Link>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default StudentFooter;
