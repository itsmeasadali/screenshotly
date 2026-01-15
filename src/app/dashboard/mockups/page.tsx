import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import MockupManager from "@/components/MockupManager";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { ArrowLeft, Laptop, Smartphone, Monitor, Layout, Eye, Target } from "lucide-react";

export default async function MockupsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <AuthenticatedLayout>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Mockup Templates</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Transform your screenshots into professional presentations with our collection of device mockups
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Enhanced Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Browser Mockups</h3>
            <p className="text-sm text-gray-600 mb-3">Professional browser windows with clean interfaces</p>
            <div className="text-xs text-foreground font-medium">3 Templates</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Devices</h3>
            <p className="text-sm text-gray-600 mb-3">Modern smartphones and mobile device frames</p>
            <div className="text-xs text-foreground font-medium">2 Templates</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Laptop className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Laptops & Tablets</h3>
            <p className="text-sm text-gray-600 mb-3">MacBooks, laptops, and iPad mockups</p>
            <div className="text-xs text-purple-600 font-medium">3 Templates</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi-Device</h3>
            <p className="text-sm text-gray-600 mb-3">Showcase responsive designs across all devices</p>
            <div className="text-xs text-indigo-600 font-medium">1 Template</div>
          </div>
        </div>
        
        {/* Mockup Templates */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse All Templates</h2>
            <MockupManager />
          </div>

          {/* Enhanced Usage Guidelines */}
          <section className="mt-20 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Template Specifications & Guidelines</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 rounded-xl">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Device Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Template Size</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Screenshot Area</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ideal Use Cases</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Monitor className="w-4 h-4 text-foreground" />
                          </div>
                          <span className="font-medium text-gray-900">Browser</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600 bg-gray-50 rounded-lg">1920×1080</td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">1920×1036</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Web apps, SaaS platforms, landing pages</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <span className="px-2 py-1 bg-muted text-foreground text-xs rounded-full">Clean UI</span>
                          <span className="px-2 py-1 bg-muted text-foreground text-xs rounded-full">Light/Dark</span>
                        </div>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-foreground" />
                          </div>
                          <span className="font-medium text-gray-900">Mobile</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600 bg-gray-50 rounded-lg">1080×1920</td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">1000×1760</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Mobile apps, responsive sites, PWAs</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Dynamic Island</span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Premium</span>
                        </div>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Laptop className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-900">Laptop</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600 bg-gray-50 rounded-lg">2560×1600</td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">1980×1230</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Desktop apps, presentations, demos</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Retina</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Professional</span>
                        </div>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Layout className="w-4 h-4 text-indigo-600" />
                          </div>
                          <span className="font-medium text-gray-900">Multi-Device</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600 bg-gray-50 rounded-lg">2560×1440</td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-600">Variable</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Responsive design showcases, portfolios</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">Responsive</span>
                          <span className="px-2 py-1 bg-muted text-foreground text-xs rounded-full">Showcase</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Enhanced Best Practices */}
          <section className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Best Practices & Tips</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Image Quality</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use high-resolution screenshots (2x or higher)</li>
                    <li>• Ensure content is clear and readable</li>
                    <li>• Maintain aspect ratio when resizing</li>
                    <li>• Test with different content types</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Template Selection</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Match template to your content type</li>
                    <li>• Consider your target audience</li>
                    <li>• Use consistent templates across projects</li>
                    <li>• Test different device mockups</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 