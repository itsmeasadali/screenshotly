'use client';

import { useState } from 'react';
import { Download, Loader2, Play, Settings, Maximize2, AlertCircle, CheckCircle } from 'lucide-react';

export default function ScrollingScreenshotClient() {
    const [url, setUrl] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
    const [width, setWidth] = useState(1280);
    const [height, setHeight] = useState(800);

    const handleCapture = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        let validUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            validUrl = `https://${url}`;
        }

        try {
            new URL(validUrl);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        setIsCapturing(true);
        setError('');
        setScreenshotUrl(null);

        try {
            const response = await fetch('/api/screenshot-playground', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: validUrl,
                    format,
                    fullPage: true,
                    width,
                    height,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to capture screenshot');
            }

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setScreenshotUrl(objectUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsCapturing(false);
        }
    };

    const handleDownload = () => {
        if (!screenshotUrl) return;
        const link = document.createElement('a');
        link.href = screenshotUrl;
        link.download = `scrolling-screenshot-${Date.now()}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
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
                        onKeyDown={(e) => e.key === 'Enter' && handleCapture()}
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
                        { value: 'png' as const, label: 'PNG', desc: 'Lossless, best quality' },
                        { value: 'jpeg' as const, label: 'JPEG', desc: 'Smaller file size' },
                        { value: 'webp' as const, label: 'WebP', desc: 'Modern, compact' },
                    ].map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setFormat(option.value)}
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
                            Viewport Width (px)
                        </label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            min={320}
                            max={3840}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Viewport Height (px)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            min={240}
                            max={3840}
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Capture Button */}
            <button
                onClick={handleCapture}
                disabled={isCapturing || !url}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2"
            >
                {isCapturing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Capturing full page...
                    </>
                ) : (
                    <>
                        <Play className="w-5 h-5" />
                        Capture Scrolling Screenshot
                    </>
                )}
            </button>

            {/* Result */}
            {screenshotUrl && (
                <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <h3 className="text-lg font-medium text-white">Screenshot Captured</h3>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download {format.toUpperCase()}
                        </button>
                    </div>
                    <div className="max-h-[600px] overflow-auto rounded-lg border border-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={screenshotUrl}
                            alt="Full page scrolling screenshot"
                            className="w-full"
                        />
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!screenshotUrl && !isCapturing && (
                <div className="mt-8 p-8 bg-slate-900/30 border-2 border-dashed border-slate-700 rounded-xl text-center">
                    <Maximize2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Enter a URL to capture the full scrollable page</p>
                </div>
            )}
        </div>
    );
}
