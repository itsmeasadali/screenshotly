import { SignUp } from "@clerk/nextjs";
import GuestLayout from "@/components/layouts/GuestLayout";

export default function SignUpPage() {
  return (
    <GuestLayout>
      <div className="flex items-center justify-center py-12">
        <SignUp 
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