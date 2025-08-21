"use client";

import { useState } from "react";
import { Guest } from "@/app/data/guests";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

type Props = {
  guest: Guest;
  rsvpStatus: "going" | "not_going";
  onRSVP: (status: "going" | "not_going") => Promise<void>;
};

export default function RSVPButtons({ guest, rsvpStatus, onRSVP }: Props) {
  const handleToggle = async () => {
    const newResponse = rsvpStatus === "going" ? "not_going" : "going";

    try {
      await onRSVP(newResponse);

      if (newResponse === "going") {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error("Failed to save RSVP", err);
    }
  };

  const isGoing = rsvpStatus === "going";

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35 }}
    >
      <button
        onClick={handleToggle}
        className={`px-6 py-3 rounded-full font-semibold text-md md:text-lg transition shadow-md hover:shadow-lg duration-300 ${
          isGoing ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {isGoing ? "✅ I'm Going" : "💤 Not Going Yet"}
      </button>
    </motion.div>
  );
}
