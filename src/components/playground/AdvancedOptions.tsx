'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock, ScanSearch } from "lucide-react";

const formatOptions = [
  { id: 'png', name: 'PNG', icon: ScanSearch, description: 'Best for screenshots with transparency' },
  { id: 'jpeg', name: 'JPEG', icon: ScanSearch, description: 'Smaller file size, adjustable quality' },
  { id: 'pdf', name: 'PDF', icon: ScanSearch, description: 'Document format (mockups not available)' },
] as const;

type FormatType = typeof formatOptions[number]['id'];

interface AIRemovalConfig {
  enabled: boolean;
  types: string[];
  confidence: number;
}

interface AdvancedOptionsProps {
  format: FormatType;
  quality: number;
  delay: number;
  fullPage: boolean;
  aiRemoval: AIRemovalConfig;
  isSignedIn: boolean;
  onFormatChange: (format: FormatType) => void;
  onQualityChange: (quality: number) => void;
  onDelayChange: (delay: number) => void;
  onFullPageChange: (fullPage: boolean) => void;
  onAiRemovalChange: (aiRemoval: AIRemovalConfig) => void;
}

export const AdvancedOptions = ({
  format,
  quality,
  delay,
  fullPage,
  aiRemoval,
  isSignedIn,
  onFormatChange,
  onQualityChange,
  onDelayChange,
  onFullPageChange,
  onAiRemovalChange,
}: AdvancedOptionsProps) => {
  const renderProFeatureTooltip = (children: React.ReactNode, feature: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="opacity-50 cursor-not-allowed">
            {children}
            <Lock className="w-4 h-4 inline-block ml-2" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{feature} is only available with authentication</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-6">
      {/* Format Selection */}
      <div className="space-y-2">
        <Label>Output Format</Label>
        <Select value={format} onValueChange={(value: FormatType) => onFormatChange(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map(option => (
              <SelectItem key={option.id} value={option.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{option.name}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-sm text-foreground">Advanced Options</h4>
        
        {/* JPEG Quality */}
        {format === 'jpeg' && (
          <div className="space-y-2">
            <Label>JPEG Quality: {quality}%</Label>
            <Input
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => onQualityChange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Delay */}
        <div className="space-y-2">
          <Label>Capture Delay: {delay}ms</Label>
          <Input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={delay}
            onChange={(e) => onDelayChange(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Wait for dynamic content and animations to load
          </p>
        </div>

        {/* Full Page Option */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="full-page">Capture full page</Label>
            <p className="text-xs text-muted-foreground">Capture entire scrollable content</p>
          </div>
          <Switch
            id="full-page"
            checked={fullPage}
            onCheckedChange={onFullPageChange}
          />
        </div>

        {/* AI Element Removal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <Label>AI Element Removal</Label>
              <p className="text-xs text-muted-foreground">
                {isSignedIn ? 'Remove ads, banners, and popups' : 'Requires authentication'}
              </p>
            </div>
            {isSignedIn ? (
              <Switch
                checked={aiRemoval.enabled}
                onCheckedChange={(enabled) => onAiRemovalChange({ ...aiRemoval, enabled })}
              />
            ) : (
              renderProFeatureTooltip(
                <Switch checked={false} disabled={true} />,
                "AI Element Removal requires authentication"
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
