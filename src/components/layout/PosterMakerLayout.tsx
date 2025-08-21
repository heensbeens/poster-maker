'use client';

import React from 'react';
import { ElementsPanel } from './ElementsPanel';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Header } from './Header';
import { Button } from '@/components/ui/button';
import { Undo, Redo } from 'lucide-react';
import { usePosterMakerStore } from '@/lib/store';

export const PosterMakerLayout: React.FC = () => {
  const { undo, redo, history } = usePosterMakerStore();
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <div className="relative bg-gray-50 overflow-hidden w-screen h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Elements Panel */}
        <div 
          className="bg-white border-r border-gray-200 flex flex-col overflow-hidden"
          style={{
            display: 'flex',
            width: '300px',
            padding: '24px',
            alignItems: 'flex-start',
            gap: '10px',
            flexShrink: 0
          }}
        >
          <ElementsPanel />
        </div>
        
        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Canvas />
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-hidden flex flex-col">
          <PropertiesPanel />
        </div>
      </div>

      {/* Undo/Redo Controls - Fixed at bottom */}
      <div 
        className="absolute flex items-center justify-center space-x-4"
        style={{
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          style={{
            display: 'flex',
            padding: '8px 12px',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Undo className="w-4 h-4" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          style={{
            display: 'flex',
            padding: '8px 12px',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Redo className="w-4 h-4" />
          Redo
        </Button>
      </div>
    </div>
  );
};
