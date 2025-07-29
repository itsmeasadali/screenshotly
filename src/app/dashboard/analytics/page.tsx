import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import AnalyticsContent from "./AnalyticsContent";

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <AuthenticatedLayout>
      <AnalyticsContent />
    </AuthenticatedLayout>
  );
} 