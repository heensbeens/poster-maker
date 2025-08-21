'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo } from 'lucide-react';
import { usePosterMakerStore, CanvasElement } from '@/lib/store';
import { CanvasElementRenderer } from '../canvas/CanvasElementRenderer';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { 
    elements, 
    selectedElementId, 
    selectElement, 
    moveElement, 
    undo, 
    redo,
    history 
  } = usePosterMakerStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Deselect if clicking on empty canvas
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  const handleElementMouseDown = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    selectElement(element.id);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElementId) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      moveElement(selectedElementId, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedElementId, dragOffset]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div 
          ref={canvasRef}
          className="relative bg-white border-2 border-gray-300 shadow-lg"
          style={{ width: '800px', height: '600px' }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
        >
          {/* Render all elements */}
          {elements.map((element) => (
            <CanvasElementRenderer
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              onMouseDown={(e) => handleElementMouseDown(e, element)}
            />
          ))}
        </div>
      </div>
      
      {/* Canvas Controls */}
      <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
        >
          <Undo className="w-4 h-4 mr-2" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
        >
          <Redo className="w-4 h-4 mr-2" />
          Redo
        </Button>
      </div>
    </div>
  );
};
