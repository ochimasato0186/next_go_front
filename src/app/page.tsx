"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@/components/Box";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Canvas className="w-full h-3/5">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <button
        className="mt-10 px-6 py-3 bg-white text-black rounded-xl text-lg hover:bg-gray-200 transition"
        onClick={onFinish}
      >
        続ける
      </button>
    </motion.div>
  );
}

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <main className="p-10 text-center text-2xl">
          ✅ これはアプリ本体です！
        </main>
      )}
    </div>
  );
}
