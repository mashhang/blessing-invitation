import GuestInvitation from "./GuestInvitation";
import type { Metadata } from "next";

// This is the correct way to handle Metadata in a Server Component
export const metadata: Metadata = {
  title: "Kaiser Caleb's Baptism Invitation",
  description: "You're invited to the baptism of Kaiser Caleb.",
};

// Define the correct props for a Server Component page
type GuestPageProps = {
  params: {
    slug: string;
  };
};

export default function GuestPage({ params }: GuestPageProps) {
  // Pass the slug to the client component
  return <GuestInvitation slug={params.slug} />;
}
