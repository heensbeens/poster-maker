'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Cloud } from 'lucide-react';
import html2canvas from 'html2canvas';

export const Header: React.FC = () => {
  const handleDownload = async () => {
    try {
      console.log('Starting download...');
      
      // Find the canvas container element by ID
      const canvasElement = document.getElementById('poster-canvas') as HTMLElement;
      
      if (!canvasElement) {
        console.error('Canvas element not found');
        alert('Canvas not found. Please try again.');
        return;
      }

      console.log('Canvas element found:', canvasElement);

      // Get all elements in the canvas and temporarily fix problematic CSS
      const allElements = canvasElement.querySelectorAll('*');
      const originalStyles: Array<{ element: Element; style: string }> = [];
      
      // Hide selection elements and fix problematic CSS
      const problematicElements = document.querySelectorAll(
        '[style*="border-2"], [style*="border-blue"], [style*="box-shadow"], .resize-handle, [class*="border-blue"]'
      );
      
      // Store original styles for all elements
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        originalStyles.push({ element: el, style: htmlEl.style.cssText });
        
        // Fix problematic CSS properties
        const computedStyle = window.getComputedStyle(htmlEl);
        
        // Convert modern color functions (lab, oklch, etc.) to RGB if present
        const problematicColorFunctions = ['lab(', 'oklch(', 'lch(', 'color('];
        
        problematicColorFunctions.forEach(colorFunc => {
          if (htmlEl.style.color && htmlEl.style.color.includes(colorFunc)) {
            htmlEl.style.color = '#000000'; // Fallback to black
          }
          if (htmlEl.style.backgroundColor && htmlEl.style.backgroundColor.includes(colorFunc)) {
            htmlEl.style.backgroundColor = 'transparent'; // Fallback to transparent
          }
          if (htmlEl.style.borderColor && htmlEl.style.borderColor.includes(colorFunc)) {
            htmlEl.style.borderColor = '#000000'; // Fallback to black
          }
        });
        
        // Remove CSS custom properties that might use problematic color functions
        const style = htmlEl.style;
        for (let i = 0; i < style.length; i++) {
          const property = style[i];
          const value = style.getPropertyValue(property);
          if (value && problematicColorFunctions.some(func => value.includes(func))) {
            style.removeProperty(property);
          }
        }
        
        // Remove other modern CSS properties that might cause issues
        htmlEl.style.filter = htmlEl.style.filter?.replace(/(lab|oklch|lch|color)\([^)]*\)/g, '') || '';
        htmlEl.style.backdropFilter = '';
      });
      
      // Hide selection elements specifically
      problematicElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.border = 'none';
        htmlEl.style.outline = 'none';
        htmlEl.style.boxShadow = 'none';
        htmlEl.style.display = 'none';
      });

      console.log('Fixed problematic CSS and hidden selection elements, capturing canvas...');

      // Wait a brief moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200));

      // Capture the canvas with html2canvas
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: false,
        width: 573,
        height: 668.5,
        logging: false, // Disable logging to avoid console spam
        ignoreElements: (element) => {
          // Ignore elements with problematic styles
          const htmlElement = element as HTMLElement;
          return htmlElement.style.display === 'none' || 
                 element.classList.contains('resize-handle') ||
                 htmlElement.style.border?.includes('blue');
        },
        onclone: (clonedDoc) => {
          // Additional cleanup on the cloned document
          const allClonedElements = clonedDoc.querySelectorAll('*');
          allClonedElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = clonedDoc.defaultView?.getComputedStyle(htmlEl);
            
            // Replace CSS custom properties with actual values
            if (computedStyle) {
              htmlEl.style.color = computedStyle.color || '#000000';
              htmlEl.style.backgroundColor = computedStyle.backgroundColor || 'transparent';
              htmlEl.style.borderColor = computedStyle.borderColor || '#000000';
            }
          });
        }
      });

      console.log('Canvas captured successfully');

      // Restore original styles
      originalStyles.forEach(({ element, style }) => {
        (element as HTMLElement).style.cssText = style;
      });

      console.log('Restored original styles');

      // Convert to JPEG and download
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('Blob created, starting download...');
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `posterly-design-${new Date().getTime()}.jpeg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log('Download initiated successfully');
        } else {
          console.error('Failed to create blob');
          alert('Failed to create image. Please try again.');
        }
      }, 'image/jpeg', 0.9);

    } catch (error) {
      console.error('Error downloading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Download failed: ${errorMessage}`);
    }
  };

  return (
    <header 
      className="bg-white border-b border-gray-200 flex items-center justify-between w-full"
      style={{ 
        height: '61px',
        padding: '14px 28px',
        flexShrink: 0
      }}
    >
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-gray-900">Posterly</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          onClick={handleDownload}
          className="bg-purple-600 hover:bg-purple-700 text-white"
          style={{
            display: 'flex',
            padding: '8px 12px',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </header>
  );
};
