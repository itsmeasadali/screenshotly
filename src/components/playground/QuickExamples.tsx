'use client';

import { Card } from "@/components/ui/card";

interface QuickExample {
  title: string;
  description: string;
  url: string;
  mockup: string;
  device: 'desktop' | 'laptop' | 'tablet' | 'mobile';
  quality: number;
}

const examples: QuickExample[] = [
  {
    title: "GitHub Homepage",
    description: "Desktop • Browser Light",
    url: "https://github.com",
    mockup: "browser-light",
    device: "desktop",
    quality: 90,
  },
  {
    title: "Tailwind CSS",
    description: "Laptop • MacBook Pro",
    url: "https://tailwindcss.com",
    mockup: "macbook-pro",
    device: "laptop",
    quality: 95,
  },
  {
    title: "Stripe Mobile",
    description: "Mobile • iPhone 14 Pro",
    url: "https://stripe.com",
    mockup: "iphone-14",
    device: "mobile",
    quality: 90,
  },
  {
    title: "iPad Pro Showcase",
    description: "Tablet • iPad Pro 12.9\"",
    url: "https://apple.com/ipad-pro",
    mockup: "ipad-pro",
    device: "tablet",
    quality: 95,
  },
];

interface QuickExamplesProps {
  onExampleSelect: (example: QuickExample) => void;
}

export const QuickExamples = ({ onExampleSelect }: QuickExamplesProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-medium text-foreground mb-3">Quick Start Examples</h3>
      <div className="grid grid-cols-1 gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleSelect(example)}
            className="text-left p-2 rounded bg-muted hover:bg-muted/80 text-sm"
          >
            <div className="font-medium">{example.title}</div>
            <div className="text-muted-foreground">{example.description}</div>
          </button>
        ))}
      </div>
    </Card>
  );
};
