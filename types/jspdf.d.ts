// types/jspdf.d.ts
declare module 'jspdf' {
  export default class jsPDF {
    constructor(options?: {
      orientation?: 'portrait' | 'landscape';
      unit?: 'mm' | 'cm' | 'in' | 'px';
      format?: 'a4' | 'a3' | 'letter' | 'legal';
    });
    
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
    
    text(text: string, x: number, y: number, options?: { align?: 'left' | 'center' | 'right' }): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    splitTextToSize(text: string, maxWidth: number): string[];
    setFontSize(size: number): void;
    setFont(font?: string, style?: 'normal' | 'bold' | 'italic' | 'bolditalic'): void;
    save(filename?: string): void;
    output(format?: string): string | UintArray | Blob;
  }
}