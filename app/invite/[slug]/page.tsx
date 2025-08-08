import { guests } from "@/app/data/guests";
import { notFound } from "next/navigation";
import InvitationPage from "@/app/components/InviteCard"; // This will be a client component

export default function GuestPage({ params }: { params: { slug: string } }) {
  const guest = guests.find((g) => g.slug === params.slug);
  if (!guest) return notFound();

  return <InvitationPage guest={guest} />;
}
