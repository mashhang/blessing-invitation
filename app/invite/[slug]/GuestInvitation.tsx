"use client";

import { guests } from "@/app/data/guests";
import RSVPButtons from "@/app/components/RSVPButtons";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Define the props for this client component
interface GuestInvitationProps {
  slug: string;
}

// Define types for the decorations to resolve the TypeScript error
interface CloudDecoration {
  type: "cloud";
  emoji: string;
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  opacity: string;
  animation: string;
}

interface BalloonDecoration {
  type: "balloon";
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  animation: string;
  fill: string;
  stroke: string;
}

interface BearDecoration {
  type: "bear";
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  animation: string;
}

interface GrizzlyWavingDecoration {
  type: "grizzlywaving";
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  animation: string;
}

interface GrizzlyWavingRDecoration {
  type: "grizzlywavingr";
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  animation: string;
}

interface BabyGrizzlyDecoration {
  type: "babygrizzly";
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  animation: string;
}

export default function GuestInvitation({ slug }: GuestInvitationProps) {
  const guest = guests.find((g) => g.slug === slug);
  if (!guest) return notFound();

  const [showReminder, setShowReminder] = useState(false);

  const [rsvpStatus, setRsvpStatus] = useState<"going" | "not_going">(
    "not_going"
  );

  // Load from localStorage on mount
  useEffect(() => {
    const storedStatus = localStorage.getItem(`rsvp-${guest.id}`);
    if (storedStatus === "going" || storedStatus === "not_going") {
      setRsvpStatus(storedStatus);
    }
  }, [guest.id]);

  const handleRSVP = async (response: "going" | "not_going") => {
    setRsvpStatus(response);

    // Save to localStorage
    localStorage.setItem(`rsvp-${guest.id}`, response);

    // Save to Supabase
    const { error } = await supabase.from("rsvps").upsert({
      guest_id: guest.id,
      guest_name: guest.name,
      response: response,
    });
    if (error) console.error("Supabase RSVP error:", error.message);
  };

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
  const decorations: (
    | CloudDecoration
    | BalloonDecoration
    | BearDecoration
    | GrizzlyWavingDecoration
    | GrizzlyWavingRDecoration
    | BabyGrizzlyDecoration
  )[] = [
    {
      type: "cloud",
      emoji: "☁️",
      size: "text-8xl",
      top: "5%",
      left: "-10px",
      opacity: "opacity-70",
      animation: "",
    },
    {
      type: "cloud",
      emoji: "☁️",
      size: "md:text-9xl text-7xl",
      bottom: "12%",
      right: "5%",
      opacity: "opacity-70",
      animation: "",
    },
    {
      type: "balloon",
      top: "8%",
      right: "8%",
      animation: "animate-float",
      fill: "#ffc0cb",
      stroke: "#ff69b4",
    },
    {
      type: "balloon",
      top: "60%",
      left: "8%",
      animation: "animate-float-delay",
      fill: "#ffe4b5",
      stroke: "#daa520",
    },
    {
      type: "grizzlywavingr",
      bottom: "5%",
      left: "5%",
      size: "w-24 h-24",
      animation: "animate-float-alt",
    },
    {
      type: "grizzlywaving",
      top: "24%",
      right: "5%",
      size: "w-16 h-16",
      animation: "animate-float-alt",
    },
    {
      type: "babygrizzly",
      top: "37%",
      left: "20%",
      size: "w-12 h-12",
      animation: "animate-float-alt",
    },
  ];

  const BalloonSVG = ({ fill, stroke }: { fill: string; stroke: string }) => (
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
      className="relative min-h-screen bg-[#F5E6D3] flex flex-col items-center justify-center px-4 pt-10 pb-10 overflow-hidden text-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative elements: clouds, balloons, and bears */}
      <div className="absolute top-0 left-0 lg:w-[60%] lg:ml-90 w-full h-full pointer-events-none overflow-hidden z-20">
        {decorations.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.animation} ${
              item.type === "cloud" ? `${item.size} ${item.opacity}` : ""
            } ${item.type === "grizzlywaving" ? `${item.size}` : ""} ${
              item.type === "grizzlywavingr" ? `${item.size}` : ""
            } ${item.type === "babygrizzly" ? `${item.size}` : ""}`}
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
          >
            {item.type === "cloud" ? (
              item.emoji
            ) : item.type === "balloon" ? (
              <BalloonSVG fill={item.fill} stroke={item.stroke} />
            ) : item.type === "grizzlywaving" ? (
              <img
                src="/grizzlywaving.png"
                alt="Placeholder for baby photo"
                className="md:w-20 md:h-30 w-10 h-20 object-cover"
              />
            ) : item.type === "grizzlywavingr" ? (
              <img
                src="/grizzlywavingr.png"
                alt="Placeholder for baby photo"
                className="md:w-20 md:h-30 w-10 h-20 object-cover"
              />
            ) : item.type === "babygrizzly" ? (
              <img
                src="/babygrizzly.png"
                alt="Placeholder for baby photo"
                className="md:w-full md:h-full scale-120 w-full h-full object-cover"
              />
            ) : (
              <></>
            )}
          </motion.div>
        ))}
      </div>

      <div className="z-10 bg-[#FAF3EA] bg-opacity-80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-[#D3C1AD] max-w-md w-full">
        {/* Main invitation content */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <p className="text-xl text-[#A37B5B] font-semibold mb-4">
            Join us for the
          </p>
          <h1 className="text-4xl text-[#7A5B4C] font-bold mb-2">Baptism of</h1>
          <h2
            className="text-6xl text-[#A37B5B] font-bold italic mb-6"
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
          className="relative w-48 h-48 mx-auto mb-8 bg-[#E9DED1] rounded-full border-4 border-[#D3C1AD] overflow-hidden shadow-lg"
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
          className="text-lg text-[#7A5B4C] mb-8 space-y-2"
        >
          <p className="font-semibold text-2xl">August 31 | 9 am</p>
          <p>📍San Pedro Apostol Parish</p>
          <p>
            Reception: Block 03 Lot 05 Rosa Homes Subdivision, Brgy. Landayan,
            San Pedro, Laguna
          </p>
        </motion.div>

        {/* RSVP Buttons, as requested */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInWithDelay(0.6)}
        >
          {/* passing mock guest data */}
          <RSVPButtons
            guest={guest}
            rsvpStatus={rsvpStatus}
            onRSVP={handleRSVP}
          />
          <button
            onClick={() => setShowReminder(true)}
            className="underline text-gray-400 text-xs mt-4 hover:text-gray-600 transition-colors"
          >
            Reminders
          </button>
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

      {/* Modal Popup */}
      <AnimatePresence>
        {showReminder && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-[90%] text-center z-50"
            >
              <h2 className="text-xl font-semibold mb-4">Reminder</h2>
              <p className="text-gray-700 mb-6 text-sm">
                This invitation is intended to confirm the attendance of guests
                to ensure proper food allocation. Please be advised that guests
                who responded “No” but still choose to attend on the said date
                will be responsible for their own food and expenses. Thank you
                for your understanding.
              </p>
              <button
                onClick={() => setShowReminder(false)}
                className="bg-[#FCC815] text-black px-5 py-2 rounded-lg hover:bg-[#e0b913] transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
