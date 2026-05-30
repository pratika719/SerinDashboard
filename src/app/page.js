"use client";
import { useState,useEffect} from "react";
import { usePresence } from "../features/presence/hooks/usePresence";
import OnlineUsers from "../features/presence/components/OnlineUsers";
import CursorLayer from "../features/cursor/components/CursorLayer";
import ReactionLayer from "../features/reactions/components/ReactionLayer";
import ReactionPanel from "../features/reactions/components/ReactionPanel";
import DotField from "../features/reactions/components/DotField.jsx";
import ShinyText from "../components/ShinyText";
export default function Home() {

  
  const { users, count, isConnected } = usePresence("landing-page");
// const [hydrated, setHydrated] = useState(false);

// useEffect(() => {
//     setHydrated(true);
// }, []);
  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col items-center justify-center gap-6 overflow-hidden relative">

      <DotField
        dotRadius={1.6}
        dotSpacing={16}
        bulgeStrength={80}
        glowRadius={220}
        sparkle={true}
        waveAmplitude={0}
        cursorRadius={300}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="rgba(168, 85, 247, 0.45)"
        gradientTo="rgba(6, 182, 212, 0.35)"
        glowColor="rgba(20, 10, 40, 0.6)"
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#07070a_95%)] pointer-events-none z-0" />

      <div className="flex flex-col items-center gap-2 z-10">
        <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tight">


          <ShinyText
            text="Serin DashBoard"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#514343ff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </h1>

        <div
          className={`h-1 w-24 rounded-full ${isConnected ? "bg-cyan-500" : "bg-red-500"
            } animate-pulse`}
        />
      </div>

      <p className="text-gray-400 text-xl max-w-md text-center z-10 leading-relaxed font-light">
        Experience the next generation of{" "}
        <span className="text-cyan-400 font-medium">
          real-time collaboration
        </span>.
      </p>

      <div className="z-10">
        <OnlineUsers count={count} users={users} />
      </div>

      <CursorLayer roomId="landing-page" />
      <ReactionLayer />
      <ReactionPanel roomId="landing-page" />
    </main>
  );
}