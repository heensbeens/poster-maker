'use client';

import React from 'react';
import { ElementsPanel } from './ElementsPanel';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Header } from './Header';

export const PosterMakerLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Elements Panel */}
        <div className="w-64 bg-gray-100 border-r border-gray-200">
          <ElementsPanel />
        </div>
        
        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          <Canvas />
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 bg-gray-100 border-l border-gray-200">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};
