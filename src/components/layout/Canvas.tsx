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
    selectedElementIds,
    selectElement, 
    selectMultipleElements,
    toggleElementSelection,
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
    
    // Handle multi-select with Ctrl/Cmd key
    if (e.ctrlKey || e.metaKey) {
      toggleElementSelection(element.id);
    } else {
      // Single select - clear other selections
      selectElement(element.id);
    }
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedElementId, dragOffset, handleMouseMove]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden">
      <div 
        ref={canvasRef}
        id="poster-canvas"
        className="relative"
        style={{ 
          width: '573px',
          height: '668.5px',
          flexShrink: 0,
          background: 'var(--Gray-25, #FCFCFD)',
          boxShadow: '1.317px 1.317px 1.317px 0 rgba(0, 0, 0, 0.08), 0 2.634px 5.269px 0 rgba(44, 43, 42, 0.10)',
          overflow: 'hidden'
        }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
      >
        {/* Render all elements */}
        {elements.map((element) => (
          <CanvasElementRenderer
            key={element.id}
            element={element}
            isSelected={selectedElementIds.includes(element.id)}
            onMouseDown={(e) => handleElementMouseDown(e, element)}
          />
        ))}
      </div>
    </div>
  );
};
