'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, Download, Loader2, Play, Settings, Film, Clock, Zap } from 'lucide-react';

export default function ScrollingScreenshotPage() {
    const [url, setUrl] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [result, setResult] = useState<{ url: string; format: string } | null>(null);
    const [error, setError] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Options
    const [format, setFormat] = useState<'gif' | 'webm' | 'mp4'>('gif');
    const [duration, setDuration] = useState(5);
    const [scrollSpeed, setScrollSpeed] = useState('medium');
    const [width, setWidth] = useState(1280);
    const [height, setHeight] = useState(800);

    const handleCapture = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        setIsCapturing(true);
        setError('');
        setResult(null);

        // Simulate API call for demo
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Demo result
        setResult({
            url: '/api/demo-scrolling-screenshot',
            format: format,
        });
        setIsCapturing(false);
    };

    const handleDownload = () => {
        if (result) {
            const link = document.createElement('a');
            link.href = result.url;
            link.download = `scrolling-screenshot.${format}`;
            link.click();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <section className="pt-20 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-6">
                        <Film className="w-4 h-4" />
                        Free Scrolling Screenshot Tool
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Capture <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Scrolling Screenshots</span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Create animated GIFs, WebM, or MP4 videos of scrolling webpages. Perfect for demos, presentations, and social media.
                    </p>
                </div>
            </section>

            {/* Tool Section */}
            <section className="pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
                        {/* URL Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Website URL
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Format Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Output Format
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: 'gif', label: 'GIF', desc: 'Animated, universal' },
                                    { value: 'webm', label: 'WebM', desc: 'Smaller, modern' },
                                    { value: 'mp4', label: 'MP4', desc: 'Video format' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setFormat(option.value as typeof format)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${format === option.value
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-slate-600 hover:border-slate-500'
                                            }`}
                                    >
                                        <div className="font-medium text-white">{option.label}</div>
                                        <div className="text-xs text-slate-400">{option.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration & Speed */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Duration
                                </label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value={3}>3 seconds</option>
                                    <option value={5}>5 seconds</option>
                                    <option value={10}>10 seconds</option>
                                    <option value={15}>15 seconds</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    <Zap className="w-4 h-4 inline mr-1" />
                                    Scroll Speed
                                </label>
                                <select
                                    value={scrollSpeed}
                                    onChange={(e) => setScrollSpeed(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="slow">Slow</option>
                                    <option value="medium">Medium</option>
                                    <option value="fast">Fast</option>
                                </select>
                            </div>
                        </div>

                        {/* Advanced Options Toggle */}
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 mb-4"
                        >
                            <Settings className="w-4 h-4" />
                            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                        </button>

                        {/* Advanced Options */}
                        {showAdvanced && (
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-900/30 rounded-xl">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Width (px)
                                    </label>
                                    <input
                                        type="number"
                                        value={width}
                                        onChange={(e) => setWidth(Number(e.target.value))}
                                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Height (px)
                                    </label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Capture Button */}
                        <button
                            onClick={handleCapture}
                            disabled={isCapturing}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2"
                        >
                            {isCapturing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Capturing scrolling animation...
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    Capture Scrolling Screenshot
                                </>
                            )}
                        </button>

                        {/* Result */}
                        {result && (
                            <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-600">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-white">Your Scrolling Screenshot</h3>
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download {format.toUpperCase()}
                                    </button>
                                </div>

                                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                                    <div className="text-center text-slate-400">
                                        <Film className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>Preview would appear here</p>
                                        <p className="text-sm">Format: {format.toUpperCase()} | Duration: {duration}s</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">
                        Why Use Scrolling Screenshots?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Product Demos',
                                description: 'Show your entire landing page or app interface in one animated file.',
                                icon: '🎬',
                            },
                            {
                                title: 'Social Media',
                                description: 'Create eye-catching GIFs for Twitter, LinkedIn, and other platforms.',
                                icon: '📱',
                            },
                            {
                                title: 'Presentations',
                                description: 'Embed scrolling previews in slides and documents.',
                                icon: '📊',
                            },
                            {
                                title: 'Bug Reports',
                                description: 'Capture the full context of issues for your team.',
                                icon: '🐛',
                            },
                            {
                                title: 'Portfolio',
                                description: 'Showcase full website designs in a single file.',
                                icon: '🎨',
                            },
                            {
                                title: 'Documentation',
                                description: 'Create visual guides that show the complete user flow.',
                                icon: '📚',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors"
                            >
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Section */}
            <section className="pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/30 p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Need Scrolling Screenshots at Scale?
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Our API supports automated scrolling screenshot generation with custom scroll paths,
                            timing, and output formats. Perfect for bulk capture and integration into your workflows.
                        </p>

                        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm mb-6">
                            <code className="text-slate-300">{`// Example API call
const response = await fetch('https://api.screenshotly.app/scroll', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    format: 'gif',
    duration: 5,
    scrollSpeed: 'medium',
    viewport: { width: 1280, height: 800 }
  }),
});`}</code>
                        </pre>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/sign-up"
                                className="px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                Get Free API Key
                            </Link>
                            <Link
                                href="/docs"
                                className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Tools */}
            <section className="pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xl font-bold text-white mb-6">More Free Tools</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/tools/website-screenshot"
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4" />
                            Website Screenshot
                        </Link>
                        <Link
                            href="/tools/full-page-screenshot"
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4" />
                            Full Page Screenshot
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
