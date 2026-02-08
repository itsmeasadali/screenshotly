'use client';

import { useState } from 'react';
import { Maximize2, Download, Loader2, AlertCircle } from 'lucide-react';

export default function FullPageScreenshotClient() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [screenshotUrl, setScreenshotUrl] = useState('');

    const handleCapture = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        // Validate URL
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

        setIsLoading(true);
        setError('');
        setScreenshotUrl('');

        try {
            const response = await fetch('/api/screenshot-playground', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: validUrl,
                    device: 'desktop',
                    format: 'png',
                    fullPage: true,
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
            setError(err instanceof Error ? err.message : 'Failed to capture screenshot');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!screenshotUrl) return;

        const link = document.createElement('a');
        link.href = screenshotUrl;
        link.download = `fullpage-screenshot-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6 md:p-8">
            {/* Input Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter website URL (e.g., example.com)"
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
                            onKeyDown={(e) => e.key === 'Enter' && handleCapture()}
                        />
                    </div>
                </div>

                <button
                    onClick={handleCapture}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Capturing...
                        </>
                    ) : (
                        <>
                            <Maximize2 className="w-5 h-5" />
                            Capture Full Page
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-400 mb-6 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Screenshot Preview */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 min-h-[400px] flex items-center justify-center overflow-hidden">
                {screenshotUrl ? (
                    <div className="w-full">
                        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Full Page Screenshot</span>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download PNG
                            </button>
                        </div>
                        <div className="p-4 max-h-[600px] overflow-auto">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={screenshotUrl}
                                alt="Full page screenshot"
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 p-8">
                        <Maximize2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg mb-2">Enter a URL to capture</p>
                        <p className="text-sm">Full-page screenshots include all scrollable content</p>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="mt-6 text-center text-gray-500 text-sm">
                <p>Free tool powered by Screenshotly API • No signup required</p>
            </div>
        </div>
    );
}
