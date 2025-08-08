"use client";

import { guests } from "@/app/data/guests";
import RSVPButtons from "@/app/components/RSVPButtons";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

// Define the props for this client component
interface GuestInvitationProps {
  slug: string;
}

export default function GuestInvitation({ slug }: GuestInvitationProps) {
  const guest = guests.find((g) => g.slug === slug);
  if (!guest) return notFound();

  // Load Google Fonts dynamically for the new design
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);
  }, []);

  // Variant for the fade-in animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Create variants for each element with a custom delay
  const fadeInWithDelay = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay } },
  });

  // Data for decorative elements
  const decorations = [
    {
      type: "cloud",
      emoji: "☁️",
      size: "text-8xl",
      top: "-20px",
      left: "-40px",
      opacity: "opacity-70",
      animation: "",
    },
    {
      type: "cloud",
      emoji: "☁️",
      size: "text-6xl",
      top: "30%",
      right: "0%",
      opacity: "opacity-50",
      animation: "animate-float-delay",
    },
    {
      type: "cloud",
      emoji: "☁️",
      size: "text-5xl",
      top: "50%",
      left: "5%",
      opacity: "opacity-60",
      animation: "animate-float-alt",
    },
    {
      type: "cloud",
      emoji: "☁️",
      size: "text-9xl",
      bottom: "-40px",
      right: "-60px",
      opacity: "opacity-70",
      animation: "",
    },
    {
      type: "balloon",
      top: "10%",
      right: "8%",
      animation: "animate-float",
      fill: "#FFD700",
      stroke: "#FFA500",
    },
    {
      type: "balloon",
      bottom: "15%",
      left: "10%",
      animation: "animate-float-delay",
      fill: "#C0C0C0",
      stroke: "#808080",
    },
  ];

  const BalloonSVG = ({ fill, stroke }: { fill?: string; stroke?: string }) => (
    <svg
      width="40"
      height="60"
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="balloon-shadow"
          x="0"
          y="0"
          width="40"
          height="60"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="1"
            dy="1"
            stdDeviation="1"
            floodColor="#000000"
            floodOpacity="0.2"
          />
        </filter>
      </defs>
      <path
        d="M20 5C10.6112 5 3 12.6112 3 22C3 31.3888 10.6112 42.5 20 55C29.3888 42.5 37 31.3888 37 22C37 12.6112 29.3888 5 20 5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
        filter="url(#balloon-shadow)"
      />
      <path d="M20 55L20 60" stroke={stroke} strokeWidth="1" />
    </svg>
  );

  return (
    <main
      className="relative min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 py-8 overflow-hidden text-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative elements: clouds and balloons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
        {decorations.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} ${item.opacity} ${item.animation} z-20`}
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
          >
            {item.type === "cloud" ? (
              item.emoji
            ) : (
              <BalloonSVG fill={item.fill} stroke={item.stroke} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="z-10 bg-white bg-opacity-80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-blue-200 max-w-md w-full">
        {/* Main invitation content */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          {/* Reverting "Join us for the" to a simple, centered text */}
          <p className="text-lg md:text-xl text-blue-700 font-semibold mb-4">
            Join us for the
          </p>
          <h1 className="text-3xl md:text-4xl text-blue-900 font-bold mb-2">
            Baptism of
          </h1>
          <h2
            className="text-5xl md:text-6xl text-blue-700 font-bold italic mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kaiser Caleb
          </h2>
        </motion.div>

        {/* Baby image placeholder */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInWithDelay(0.2)}
          className="relative w-48 h-48 mx-auto mb-8 bg-blue-100 rounded-full border-4 border-blue-200 overflow-hidden shadow-lg"
        >
          <img
            src="/baby.jpg"
            alt="Placeholder for baby photo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Event details */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInWithDelay(0.4)}
          className="text-md md:text-lg text-blue-800 mb-8 space-y-2"
        >
          <p className="font-semibold text-xl md:text-2xl">August 31 | 9 am</p>
          <p>
            Diocesan Shrine of Jesus in the Holy Sepulchre, Landayan, San Pedro,
            Philippines
          </p>
        </motion.div>

        {/* RSVP Buttons, as requested */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInWithDelay(0.6)}
        >
          <RSVPButtons guest={guest} />
        </motion.div>
      </div>

      {/* Custom CSS for decorations and animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(10px) rotate(-2deg);
          }
        }
        @keyframes float-alt {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite;
        }
        .animate-float-alt {
          animation: float-alt 7s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
