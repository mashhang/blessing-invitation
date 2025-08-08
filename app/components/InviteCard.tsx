// "use client";

// import { useState } from "react";
// import type { Guest } from "@/app/data/guests";

// type Props = {
//   guest: Guest;
// };

// export default function InviteCard({ guest }: Props) {
//   const [response, setResponse] = useState<"going" | "not_going" | null>(null);

//   const handleResponse = (reply: "going" | "not_going") => {
//     setResponse(reply);
//     // In real app, send to backend here
//     console.log(
//       `${guest.name} is ${reply === "going" ? "going" : "not going"}`
//     );
//   };

//   return (
//     <div className="border rounded-lg p-4 shadow-md w-full max-w-md mx-auto mb-4">
//       <h2 className="text-xl font-bold text-center mb-2">{guest.name}</h2>
//       <div className="flex justify-center gap-4">
//         <button
//           className={`px-4 py-2 rounded font-semibold ${
//             response === "going" ? "bg-green-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleResponse("going")}
//         >
//           ✅ I'm Going
//         </button>
//         <button
//           className={`px-4 py-2 rounded font-semibold ${
//             response === "not_going" ? "bg-red-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleResponse("not_going")}
//         >
//           ❌ Can't Make It
//         </button>
//       </div>
//     </div>
//   );
// }
