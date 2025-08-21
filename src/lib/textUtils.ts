export const calculateTextDimensions = (
  text: string,
  fontSize: number,
  fontFamily: string,
  fontWeight: string = 'normal'
): { width: number; height: number } => {
  // Create a temporary canvas to measure text
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    return { width: 100, height: 30 };
  }
  
  // Set font properties
  const fontFamilyValue = getFontFamilyValue(fontFamily);
  context.font = `${fontWeight} ${fontSize}px ${fontFamilyValue}`;
  
  // Split text by lines
  const lines = text.split('\n');
  
  // Measure each line and find the maximum width
  let maxWidth = 0;
  lines.forEach(line => {
    const metrics = context.measureText(line);
    maxWidth = Math.max(maxWidth, metrics.width);
  });
  
  // Calculate height based on number of lines and line height
  const lineHeight = fontSize * 1.2; // Standard line height
  const height = lines.length * lineHeight;
  
  return {
    width: Math.max(maxWidth + 8, 50), // Add padding and minimum width
    height: Math.max(height, 30) // Minimum height
  };
};

export const getFontFamilyValue = (fontName: string): string => {
  const fontMap: Record<string, string> = {
    'Inter': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    'Roboto': '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    'Arial': 'Arial, sans-serif',
    'Helvetica': 'Helvetica, Arial, sans-serif',
    'Times New Roman': '"Times New Roman", Times, serif',
    'Georgia': 'Georgia, serif',
    'Courier New': '"Courier New", Courier, monospace',
  };
  
  return fontMap[fontName] || fontName;
};