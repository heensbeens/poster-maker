'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  Square, 
  Circle, 
  Star, 
  Triangle, 
  Upload, 
  Link,
  Palette
} from 'lucide-react';
import { usePosterMakerStore } from '@/lib/store';

// Vector shape components for better visual representation
const RectangleIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <rect x="8" y="13" width="26" height="16" fill="#9CA3AF" rx="2"/>
  </svg>
);

const CircleIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <circle cx="21" cy="21" r="13" fill="#9CA3AF"/>
  </svg>
);

const StarIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <path d="M21 8L24.118 16.764H33.236L26.059 22.472L29.177 31.236L21 25.528L12.823 31.236L15.941 22.472L8.764 16.764H17.882L21 8Z" fill="#9CA3AF"/>
  </svg>
);

const TriangleIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <path d="M21 8L34 32H8L21 8Z" fill="#9CA3AF"/>
  </svg>
);

export const ElementsPanel: React.FC = () => {
  const { addElement } = usePosterMakerStore();

  const handleAddText = (type: 'headline' | 'body') => {
    const text = type === 'headline' ? 'Headline Text' : 'Body Text';
    const fontSize = type === 'headline' ? 24 : 14;
    const fontWeight = type === 'headline' ? 'bold' : 'normal';
    
    // Calculate proper dimensions for the text
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let width = 150;
    let height = 40;
    
    if (context) {
      context.font = `${fontWeight} ${fontSize}px Inter`;
      const metrics = context.measureText(text);
      width = Math.max(metrics.width + 16, 50);
      height = Math.max(fontSize * 1.2 + 16, 30);
    }
    
    addElement({
      type: 'text',
      x: 50,
      y: 50,
      width,
      height,
      rotation: 0,
      zIndex: 1,
      properties: {
        text,
        fontSize,
        fontFamily: 'Inter',
        fontWeight,
        color: '#000000',
        textAlign: 'left',
      },
    });
  };

  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'star' | 'triangle') => {
    addElement({
      type: 'shape',
      x: 50,
      y: 50,
      width: 80,
      height: 80,
      rotation: 0,
      zIndex: 1,
      properties: {
        shapeType,
        fillColor: '#6366f1',
        fillOpacity: 1,
        strokeColor: '#000000',
        strokeWidth: 0,
      },
    });
  };

  const handleAddImage = () => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create object URL for the file
        const imageUrl = URL.createObjectURL(file);
        addElement({
          type: 'image',
          x: 50,
          y: 50,
          width: 150,
          height: 100,
          rotation: 0,
          zIndex: 1,
          properties: {
            imageUrl: imageUrl,
          },
        });
      }
    };
    
    // Trigger file picker
    input.click();
  };

  const handleAddBackgroundColor = (buttonElement: HTMLButtonElement) => {
    // Create a hidden color input element
    const input = document.createElement('input');
    input.type = 'color';
    input.value = '#ffffff';
    input.style.position = 'absolute';
    
    // Position the color picker above the button, touching the Background label
    const rect = buttonElement.getBoundingClientRect();
    input.style.left = `${rect.left}px`;
    input.style.top = `${rect.top - 120}px`; // Higher up to touch the Background label
    input.style.zIndex = '1000';
    
    // Add to body temporarily
    document.body.appendChild(input);
    
    input.onchange = (e) => {
      const color = (e.target as HTMLInputElement).value;
      // Remove existing background first
      const { elements, updateElement, deleteElement } = usePosterMakerStore.getState();
      const existingBackground = elements.find(el => el.type === 'background');
      if (existingBackground) {
        deleteElement(existingBackground.id);
      }
      
      // Add new background
      addElement({
        type: 'background',
        x: 0,
        y: 0,
        width: 573,
        height: 668.5,
        rotation: 0,
        zIndex: 0,
        properties: {
          backgroundColor: color,
        },
      });
      
      // Clean up
      document.body.removeChild(input);
    };
    
    input.onblur = () => {
      // Clean up if user cancels
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
    };
    
    // Trigger color picker
    input.click();
  };

  const handleAddBackgroundImage = () => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create object URL for the file
        const imageUrl = URL.createObjectURL(file);
        
        // Remove existing background first
        const { elements, deleteElement } = usePosterMakerStore.getState();
        const existingBackground = elements.find(el => el.type === 'background');
        if (existingBackground) {
          deleteElement(existingBackground.id);
        }
        
        // Add new background image
        addElement({
          type: 'background',
          x: 0,
          y: 0,
          width: 600,
          height: 400,
          rotation: 0,
          zIndex: 0,
          properties: {
            imageUrl: imageUrl,
          },
        });
      }
    };
    
    // Trigger file picker
    input.click();
  };

  return (
    <div className="flex flex-col w-full h-full justify-between">
      {/* Top sections */}
      <div className="flex flex-col" style={{ gap: '24px' }}>
        {/* Elements Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Elements</h3>
          <div className="space-y-2">
            <button
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => handleAddText('headline')}
            >
              <div className="text-xl font-bold text-gray-900">Headline</div>
            </button>
            <button
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => handleAddText('body')}
            >
              <div className="text-base text-gray-700">Body Text</div>
            </button>
          </div>
        </div>

        {/* Images Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
          <button
            className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            onClick={handleAddImage}
          >
            <Upload className="w-6 h-6 text-gray-500 mb-2" />
            <span className="text-sm text-gray-600">Upload</span>
          </button>
        </div>

        {/* Shapes Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shapes</h3>
          <div 
            className="flex"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              alignSelf: 'stretch'
            }}
          >
            <button
              className="flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
              style={{ width: '42px', height: '42px' }}
              onClick={() => handleAddShape('rectangle')}
            >
              <RectangleIcon />
            </button>
            <button
              className="flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
              style={{ width: '42px', height: '42px' }}
              onClick={() => handleAddShape('circle')}
            >
              <CircleIcon />
            </button>
            <button
              className="flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
              style={{ width: '42px', height: '42px' }}
              onClick={() => handleAddShape('star')}
            >
              <StarIcon />
            </button>
            <button
              className="flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
              style={{ width: '42px', height: '42px' }}
              onClick={() => handleAddShape('triangle')}
            >
              <TriangleIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Background Section - At the bottom */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Background</h3>
        <div 
          style={{
            display: 'flex',
            width: '243px',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '15px'
          }}
        >
          {/* Color Picker Button */}
          <button
            className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            onClick={(e) => handleAddBackgroundColor(e.currentTarget)}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 rounded mb-2" />
            <span className="text-sm text-gray-600">Color</span>
          </button>
          
          {/* Upload Image Button */}
          <button
            className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            onClick={handleAddBackgroundImage}
          >
            <Upload className="w-6 h-6 text-gray-500 mb-2" />
            <span className="text-sm text-gray-600">Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};
