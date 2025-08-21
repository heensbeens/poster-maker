'use client';

import React from 'react';
import { ElementsPanel } from './ElementsPanel';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Header } from './Header';

export const PosterMakerLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden" style={{ width: '1440px', height: '900px' }}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Elements Panel */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 overflow-y-auto">
          <ElementsPanel />
        </div>
        
        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Canvas />
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 bg-gray-100 border-l border-gray-200 overflow-y-auto">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};
