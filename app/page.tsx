import Link from "next/link";
import { guests } from "@/app/data/guests";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Choose Your Invite</h1>
      <ul className="space-y-2">
        {guests.map((guest) => (
          <li key={guest.id}>
            <Link
              href={`/invite/${guest.slug}`}
              className="text-blue-600 underline"
            >
              {guest.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
