'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UrlInputProps {
  url: string;
  onChange: (url: string) => void;
}

export const UrlInput = ({ url, onChange }: UrlInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="url">Website URL</Label>
      <Input
        id="url"
        type="url"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com"
        className="text-sm"
      />
    </div>
  );
};
