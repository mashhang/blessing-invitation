import GuestInvitation from "./GuestInvitation"; // Your client component
import type { Metadata } from "next";

// This is the correct way to handle Metadata in a Server Component
export const metadata: Metadata = {
  title: "Kaiser Caleb's Baptism Invitation",
  description: "You're invited to the baptism of Kaiser Caleb.",
};

// Define the correct props for an async Server Component page.
// The `params` must be awaited.
type GuestPageProps = {
  params: { slug: string };
};

export default async function GuestPage({ params }: GuestPageProps) {
  // Now you can safely pass the slug to your client component
  // which will handle all the client-side logic.
  return <GuestInvitation slug={params.slug} />;
}
