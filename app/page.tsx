"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SmartphoneFrame from "../components/frame/SmartphoneFrame";
import RegisterForm from "../components/frame/RegisterForm";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SmartphoneFrame>
        <main className="flex flex-col items-center justify-center min-h-[80vh] w-full">
          <RegisterForm />
          <button
            type="button"
            onClick={() => router.push("/login")}
            style={{
              width: 140,
              padding: "8px 0",
              fontSize: 14,
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
              margin: "16px auto 0 auto",
              display: "block"
            }}
          >
            ログイン画面へ
          </button>
        </main>
      </SmartphoneFrame>
    </div>
  );
}
