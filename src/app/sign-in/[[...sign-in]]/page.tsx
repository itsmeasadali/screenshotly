import { SignIn } from "@clerk/nextjs";
import GuestLayout from "@/components/layouts/GuestLayout";

export default function SignInPage() {
  return (
    <GuestLayout>
      <div className="flex items-center justify-center py-12">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl"
            }
          }}
        />
      </div>
    </GuestLayout>
  );
} 