'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Cloud } from 'lucide-react';
import html2canvas from 'html2canvas';

export const Header: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    if (isDownloading) return; // Prevent multiple downloads
    
    setIsDownloading(true);
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

      // Store original styles for restoration
      const originalStyles: Array<{ element: Element; style: string }> = [];
      const allElements = canvasElement.querySelectorAll('*');
      
      // Store and hide selection elements
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        originalStyles.push({ element: el, style: htmlEl.style.cssText });
        
        // Hide selection borders and resize handles
        if (htmlEl.style.border?.includes('blue') || 
            htmlEl.style.border?.includes('dashed') ||
            htmlEl.classList.contains('resize-handle') ||
            htmlEl.style.cursor?.includes('resize')) {
          htmlEl.style.display = 'none';
        }
        
        // Convert modern color functions to RGB
        const computedStyle = window.getComputedStyle(htmlEl);
        
        // Handle color property
        if (computedStyle.color && (computedStyle.color.includes('lab(') || computedStyle.color.includes('oklch(') || computedStyle.color.includes('lch('))) {
          htmlEl.style.color = '#000000'; // Fallback to black
        }
        
        // Handle backgroundColor property
        if (computedStyle.backgroundColor && (computedStyle.backgroundColor.includes('lab(') || computedStyle.backgroundColor.includes('oklch(') || computedStyle.backgroundColor.includes('lch('))) {
          htmlEl.style.backgroundColor = 'transparent'; // Fallback to transparent
        }
        
        // Handle borderColor property
        if (computedStyle.borderColor && (computedStyle.borderColor.includes('lab(') || computedStyle.borderColor.includes('oklch(') || computedStyle.borderColor.includes('lch('))) {
          htmlEl.style.borderColor = '#000000'; // Fallback to black
        }
      });

      console.log('Hidden selection elements, capturing canvas...');

      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the canvas with html2canvas
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: '#ffffff',
        scale: 3, // Higher quality for better resolution
        useCORS: true,
        allowTaint: true, // Allow tainted canvas for better image handling
        width: 573,
        height: 668.5,
        logging: false,
        ignoreElements: (element) => {
          const htmlElement = element as HTMLElement;
          // Ignore selection elements and resize handles
          return htmlElement.style.display === 'none' || 
                 htmlElement.style.border?.includes('blue') ||
                 htmlElement.style.border?.includes('dashed') ||
                 htmlElement.classList.contains('resize-handle') ||
                 htmlElement.style.cursor?.includes('resize');
        },
        onclone: (clonedDoc) => {
          // Clean up the cloned document
          const allClonedElements = clonedDoc.querySelectorAll('*');
          allClonedElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            
            // Remove any remaining selection styles
            if (htmlEl.style.border?.includes('blue') || 
                htmlEl.style.border?.includes('dashed')) {
              htmlEl.style.border = 'none';
            }
            
            // Handle modern color functions in the cloned document
            const computedStyle = clonedDoc.defaultView?.getComputedStyle(htmlEl);
            if (computedStyle) {
              // Convert modern color functions to safe fallbacks
              if (computedStyle.color && (computedStyle.color.includes('lab(') || computedStyle.color.includes('oklch(') || computedStyle.color.includes('lch('))) {
                htmlEl.style.color = '#000000';
              } else if (computedStyle.color && computedStyle.color !== 'rgba(0, 0, 0, 0)') {
                htmlEl.style.color = computedStyle.color;
              }
              
              if (computedStyle.backgroundColor && (computedStyle.backgroundColor.includes('lab(') || computedStyle.backgroundColor.includes('oklch(') || computedStyle.backgroundColor.includes('lch('))) {
                htmlEl.style.backgroundColor = 'transparent';
              } else if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                htmlEl.style.backgroundColor = computedStyle.backgroundColor;
              }
              
              if (computedStyle.borderColor && (computedStyle.borderColor.includes('lab(') || computedStyle.borderColor.includes('oklch(') || computedStyle.borderColor.includes('lch('))) {
                htmlEl.style.borderColor = '#000000';
              }
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
          link.download = `posterly-design-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpeg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log('Download initiated successfully');
        } else {
          console.error('Failed to create blob');
          alert('Failed to create image. Please try again.');
        }
      }, 'image/jpeg', 0.95); // Higher quality JPEG

    } catch (error) {
      console.error('Error downloading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Download failed: ${errorMessage}`);
    } finally {
      setIsDownloading(false);
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
          disabled={isDownloading}
          className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
          style={{
            display: 'flex',
            padding: '8px 12px',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Download className={`w-4 h-4 ${isDownloading ? 'animate-spin' : ''}`} />
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
      </div>
    </header>
  );
};
