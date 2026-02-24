export const homepageFAQs = [
  {
    question: "What is Screenshotly?",
    answer: "Screenshotly is a RESTful API service that lets developers capture high-quality website screenshots programmatically. Unlike self-hosted tools like Puppeteer, you don't manage Chrome instances or worry about scaling — send a POST request and get back a pixel-perfect image. Key differentiators include AI-powered element removal (strips cookie banners, chat widgets, and popups automatically), built-in device mockups, and multiple output formats including PNG, JPEG, WebP, and PDF.",
  },
  {
    question: "How do I get started with the Screenshot API?",
    answer: "Sign up for a free account to get your API key — no credit card required. You get 100 free screenshots to fully evaluate the service. From there, make a POST request to https://api.screenshotly.app/screenshot with your URL and desired options (device, format, mockup frame). The response contains the screenshot as a binary image you can save or stream directly. Most developers are capturing their first screenshot within 5 minutes of signing up.",
  },
  {
    question: "What formats does the Screenshot API support?",
    answer: "Screenshotly supports PNG (best for UI screenshots where you need transparency or pixel-perfect detail), JPEG (smaller file sizes with adjustable quality from 0-100, ideal for thumbnails and previews), WebP (modern format with superior compression for web delivery), and PDF (full-page document output for reports and archival). You specify the format in your API request body, and you can also control the quality parameter for lossy formats.",
  },
  {
    question: "Can I remove cookie banners and popups automatically?",
    answer: "Yes. Screenshotly uses machine-learning models to detect and remove common overlay elements including cookie consent banners, newsletter signup modals, chat widgets, and ad overlays. The AI detection runs automatically when you enable the cleanup option in your API request. It works across most websites without needing to specify CSS selectors or element IDs — the model identifies obstructive elements by visual pattern and removes them before the final capture.",
  },
  {
    question: "What device mockups are available?",
    answer: "Screenshotly offers professional device frames including browser windows (light and dark Chrome-style frames), iPhone 14 Pro, and MacBook Pro mockups. These are rendered server-side as part of the screenshot — no post-processing needed. Pass the mockup parameter in your API call to wrap your screenshot in the chosen frame. Device mockups are commonly used for app store screenshots, investor decks, marketing landing pages, and social media posts where framed screenshots look more polished than raw captures.",
  },
];
