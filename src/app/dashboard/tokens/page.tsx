import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApiKeyManager from "@/components/ApiKeyManager";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";

export default async function TokensPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto py-8 px-4">
      <nav className="flex mb-4 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">API Tokens</span>
      </nav>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">API Tokens</h1>
        <Link
          href="/dashboard"
          className="px-4 py-2 text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Manage API Tokens</h2>
          <p className="text-muted-foreground mb-6">
            Create and manage your API tokens to authenticate requests to the Screenshotly API.
            Each token has its own rate limits and permissions.
          </p>
          <ApiKeyManager />
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Token Usage Guidelines</h2>
          <div className="prose max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Best Practices</h3>
              <ul className="space-y-2">
                <li>Never share your API tokens or commit them to version control</li>
                <li>Use different tokens for development and production environments</li>
                <li>Rotate tokens regularly for enhanced security</li>
                <li>Set appropriate expiration dates for tokens</li>
                <li>Monitor token usage and revoke any compromised tokens immediately</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-4">Rate Limits</h3>
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests/Hour</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concurrent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">Free</td>
                    <td className="px-6 py-4">100</td>
                    <td className="px-6 py-4">2</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-6 py-4 font-medium">Pro</td>
                    <td className="px-6 py-4 font-medium">1,000</td>
                    <td className="px-6 py-4 font-medium">5</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Enterprise</td>
                    <td className="px-6 py-4">10,000</td>
                    <td className="px-6 py-4">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 