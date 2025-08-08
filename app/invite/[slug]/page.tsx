"use client";

import { guests } from "@/app/data/guests";
import RSVPButtons from "@/app/components/RSVPButtons";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";
// Removed `Metadata` import since it's only for Server Components

// Define the correct props type for a Client Component page
type GuestPageProps = {
  params: {
    slug: string;
  };
};

// Use the defined props type
export default function GuestPage({ params }: GuestPageProps) {
  const guest = guests.find((g) => g.slug === params.slug);
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

  return (
    <main
      className="relative min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 pt-10 pb-10 overflow-hidden text-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative elements: clouds and hot air balloons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
        {/* Top-left cloud */}
        <div className="absolute top-[-20px] left-[-40px] text-8xl text-blue-200 opacity-70 z-20">
          ☁️
        </div>
        {/* Top-right hot air balloon */}
        <div className="absolute top-10 right-8 animate-float z-20">
          <svg
            width="60"
            height="90"
            viewBox="0 0 60 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hot-air-balloon"
          >
            <path
              d="M30 0C13.4315 0 0 13.4315 0 30V50H60V30C60 13.4315 46.5685 0 30 0Z"
              fill="#B3D9FF"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <rect x="25" y="50" width="10" height="5" fill="#60A5FA" />
            <path
              d="M25 55L20 80H40L35 55H25Z"
              fill="#FDE047"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <circle cx="30" cy="85" r="5" fill="#60A5FA" />
            <line
              x1="25"
              y1="55"
              x2="20"
              y2="80"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <line
              x1="35"
              y1="55"
              x2="40"
              y2="80"
              stroke="#60A5FA"
              strokeWidth="2"
            />
          </svg>
        </div>
        {/* Bottom-left hot air balloon */}
        <div className="absolute bottom-20 left-10 animate-float-delay z-20">
          <svg
            width="60"
            height="90"
            viewBox="0 0 60 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hot-air-balloon"
          >
            <path
              d="M30 0C13.4315 0 0 13.4315 0 30V50H60V30C60 13.4315 46.5685 0 30 0Z"
              fill="#B3D9FF"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <rect x="25" y="50" width="10" height="5" fill="#60A5FA" />
            <path
              d="M25 55L20 80H40L35 55H25Z"
              fill="#FDE047"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <circle cx="30" cy="85" r="5" fill="#60A5FA" />
            <line
              x1="25"
              y1="55"
              x2="20"
              y2="80"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <line
              x1="35"
              y1="55"
              x2="40"
              y2="80"
              stroke="#60A5FA"
              strokeWidth="2"
            />
          </svg>
        </div>
        {/* Bottom-right cloud */}
        <div className="absolute bottom-[-40px] right-[-60px] text-9xl text-blue-200 opacity-70 z-20">
          ☁️
        </div>
      </div>

      <div className="z-10 bg-white bg-opacity-80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-blue-200 max-w-md w-full">
        {/* Main invitation content */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <p className="text-xl text-blue-700 font-semibold mb-4">
            Join us for the
          </p>
          <h1 className="text-4xl text-blue-900 font-bold mb-2">Baptism of</h1>
          <h2
            className="text-6xl text-blue-700 font-bold italic mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kaiser Caleb
          </h2>
        </motion.div>

        {/* Baby image placeholder */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ ...fadeIn, transition: { delay: 0.2 } }}
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
          variants={{ ...fadeIn, transition: { delay: 0.4 } }}
          className="text-lg text-blue-800 mb-8 space-y-2"
        >
          <p className="font-semibold text-2xl">August 31 | 9 am</p>
          <p>
            Diocesan Shrine of Jesus in the Holy Sepulchre, Landayan, San Pedro,
            Philippines
          </p>
        </motion.div>

        {/* RSVP Buttons, as requested */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ ...fadeIn, transition: { delay: 0.6 } }}
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
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
