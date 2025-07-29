import { auth } from "@clerk/nextjs/server";
import HomeContent from "@/components/HomeContent";
import GuestLayout from "@/components/layouts/GuestLayout";

export default async function HomePage() {
  const { userId } = await auth();
  return (
    <GuestLayout>
      <HomeContent userId={userId} />
    </GuestLayout>
  );
}
