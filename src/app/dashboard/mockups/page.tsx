import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import MockupManager from "@/components/MockupManager";
import { ArrowLeft, Laptop, Smartphone, Monitor, Tablet, Layout } from "lucide-react";

export default async function MockupsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link 
            href="/dashboard" 
            className="text-gray-500 hover:text-gray-900 flex items-center"
          >
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Mockup Templates</span>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mockup Templates</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Choose from our collection of professionally designed mockup templates to showcase your screenshots
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Template Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Monitor className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium">Browser</h3>
            <p className="text-sm text-gray-500">Web applications</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Smartphone className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-medium">Mobile</h3>
            <p className="text-sm text-gray-500">Mobile apps</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Laptop className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-medium">Laptop</h3>
            <p className="text-sm text-gray-500">Desktop apps</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Layout className="w-6 h-6 text-indigo-500 mb-2" />
            <h3 className="font-medium">Multi-device</h3>
            <p className="text-sm text-gray-500">Responsive design</p>
          </div>
        </div>
        
        {/* Mockup Templates */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Templates</h2>
            <MockupManager />
          </div>

          {/* Usage Guidelines */}
          <section className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Template Specifications</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screenshot Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Browser</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1920×1080</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1920×1036</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Websites, Web Apps</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mobile</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1080×1920</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1000×1760</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mobile Apps, Responsive Sites</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Laptop</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2560×1600</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1980×1230</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Desktop Apps, Presentations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Image Quality</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Use high-resolution screenshots (2x or higher)</li>
                    <li>Ensure content is clear and readable</li>
                    <li>Maintain aspect ratio when resizing</li>
                    <li>Test with different content types</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Template Selection</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Match template to your content type</li>
                    <li>Consider your target audience</li>
                    <li>Use consistent templates across projects</li>
                    <li>Test different device mockups</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 