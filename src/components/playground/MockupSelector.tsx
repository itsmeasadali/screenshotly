'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MockupOption } from "@/hooks/useMockupData";

interface MockupSelectorProps {
  mockup: string;
  mockupOptions: MockupOption[];
  suggestedDevice: 'desktop' | 'laptop' | 'tablet' | 'mobile';
  currentDevice: 'desktop' | 'laptop' | 'tablet' | 'mobile';
  onMockupChange: (mockup: string) => void;
  onDeviceChange: (device: 'desktop' | 'laptop' | 'tablet' | 'mobile') => void;
}

export const MockupSelector = ({ 
  mockup, 
  mockupOptions, 
  suggestedDevice, 
  currentDevice,
  onMockupChange,
  onDeviceChange 
}: MockupSelectorProps) => {
  const selectedMockup = mockupOptions.find(m => m.id === mockup);
  const showSuggestion = mockup !== 'none' && currentDevice !== suggestedDevice;

  return (
    <div className="space-y-2">
      <Label>Device Mockup</Label>
      <Select value={mockup} onValueChange={onMockupChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {mockupOptions.map(option => (
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
      
      {/* Smart suggestions */}
      {showSuggestion && (
        <div className="flex items-start gap-2 p-3 bg-muted border rounded-lg">
          <div className="w-4 h-4 text-muted-foreground mt-0.5">💡</div>
          <div className="text-sm">
            <p className="text-foreground font-medium">Viewport Suggestion</p>
            <p className="text-muted-foreground mt-1">
              For best results with {selectedMockup?.name}, 
              consider using <strong>{suggestedDevice}</strong> viewport.
            </p>
            <button
              onClick={() => onDeviceChange(suggestedDevice)}
              className="text-primary hover:text-foreground underline text-sm mt-1"
            >
              Apply suggestion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
