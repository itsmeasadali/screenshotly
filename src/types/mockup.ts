export interface MockupTemplate {
  id: string;
  name: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
  };
  screenshotPlacement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imagePath: string;
} 