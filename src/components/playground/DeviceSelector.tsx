'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Monitor, Laptop, Tablet, Smartphone } from "lucide-react";

const deviceOptions = [
  { id: 'desktop', name: 'Desktop', icon: Monitor, dimensions: '1920×1080' },
  { id: 'laptop', name: 'Laptop', icon: Laptop, dimensions: '1366×768' },
  { id: 'tablet', name: 'Tablet', icon: Tablet, dimensions: '768×1024' },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, dimensions: '375×812' },
] as const;

type DeviceType = typeof deviceOptions[number]['id'];

interface DeviceSelectorProps {
  device: DeviceType;
  onChange: (device: DeviceType) => void;
}

export const DeviceSelector = ({ device, onChange }: DeviceSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Device Viewport</Label>
      <Select value={device} onValueChange={(value: DeviceType) => onChange(value)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {deviceOptions.map(option => (
            <SelectItem key={option.id} value={option.id}>
              <div className="flex items-center gap-2">
                <option.icon className="w-4 h-4" />
                <span>{option.name}</span>
                <span className="text-muted-foreground text-sm">({option.dimensions})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
