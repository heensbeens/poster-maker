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
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  
  // Split text by lines
  const lines = text.split('\n');
  
  // Calculate width (max line width)
  let maxWidth = 0;
  lines.forEach(line => {
    const metrics = context.measureText(line);
    maxWidth = Math.max(maxWidth, metrics.width);
  });
  
  // Calculate height (line height * number of lines)
  const lineHeight = fontSize * 1.2; // Standard line height
  const totalHeight = lineHeight * lines.length;
  
  return {
    width: Math.max(maxWidth + 8, 50), // Add padding and minimum width
    height: Math.max(totalHeight + 8, 30) // Add padding and minimum height
  };
};

export const getFontFamilyValue = (fontFamily: string): string => {
  const fontMap: { [key: string]: string } = {
    'Inter': 'var(--font-inter), Inter, sans-serif',
    'Roboto': 'var(--font-roboto), Roboto, sans-serif',
    'Arial': 'Arial, sans-serif',
    'Helvetica': 'Helvetica, Arial, sans-serif',
    'Times New Roman': '"Times New Roman", Times, serif',
    'Georgia': 'Georgia, serif',
  };
  
  return fontMap[fontFamily] || fontFamily;
};
