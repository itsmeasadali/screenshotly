'use client';

import { Users, Camera, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: "5K+", label: "Developers" },
  { icon: Camera, value: "1M+", label: "Screenshots" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime" }
];

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <stat.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground">{stat.value}</div>
          <div className="text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
