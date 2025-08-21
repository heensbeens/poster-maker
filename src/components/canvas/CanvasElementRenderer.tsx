'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CanvasElement, usePosterMakerStore } from '@/lib/store';
import { calculateTextDimensions, getFontFamilyValue } from '@/lib/textUtils';

interface CanvasElementRendererProps {
  element: CanvasElement;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export const CanvasElementRenderer: React.FC<CanvasElementRendererProps> = ({
  element,
  isSelected,
  onMouseDown,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isResizing, setIsResizing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { updateElement } = usePosterMakerStore();

  const handleResizeMouseDown = (e: React.MouseEvent, direction: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e') => {
    e.stopPropagation();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width;
    const startHeight = element.height;
    const startElementX = element.x;
    const startElementY = element.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startElementX;
      let newY = startElementY;

      const minWidth = element.type === 'text' ? 50 : 20;
      const minHeight = element.type === 'text' ? 30 : 20;

      // Handle horizontal resizing
      if (direction.includes('w')) {
        newWidth = Math.max(minWidth, startWidth - deltaX);
        newX = startElementX + (startWidth - newWidth);
      } else if (direction.includes('e')) {
        newWidth = Math.max(minWidth, startWidth + deltaX);
      }

      // Handle vertical resizing
      if (direction.includes('n')) {
        newHeight = Math.max(minHeight, startHeight - deltaY);
        newY = startElementY + (startHeight - newHeight);
      } else if (direction.includes('s')) {
        newHeight = Math.max(minHeight, startHeight + deltaY);
      }

      updateElement(element.id, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTextDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === 'text') {
      setIsEditing(true);
      setEditValue(element.properties.text || '');
    }
  };

  const handleTextChange = (value: string) => {
    setEditValue(value);
    
    // Only update the text content, not dimensions during editing
    updateElement(element.id, {
      properties: {
        ...element.properties,
        text: value,
      },
    });
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    
    // Update text content
    updateElement(element.id, {
      properties: {
        ...element.properties,
        text: editValue,
      },
    });
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      // Ctrl+Enter saves and exits
      e.preventDefault();
      handleTextBlur();
    } else if (e.key === 'Enter') {
      // Regular Enter creates new line
      // Let the default behavior happen
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(element.properties.text || '');
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        const fontFamily = getFontFamilyValue(element.properties.fontFamily || 'Inter');
        
        if (isEditing) {
          return (
            <textarea
              ref={textareaRef}
              className="absolute border-none outline-none bg-transparent"
                          style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
              fontSize: element.properties.fontSize || 16,
              fontFamily: fontFamily,
              fontWeight: element.properties.fontWeight || 'normal',
              fontStyle: element.properties.fontStyle || 'normal',
              textDecoration: element.properties.textDecoration || 'none',
              color: element.properties.color || '#000000',
              backgroundColor: element.properties.backgroundColor || 'transparent',
              textAlign: (element.properties.textAlign as any) || 'left',
              padding: '4px',
              lineHeight: '1.2',
              overflow: 'hidden',
              resize: 'none',
              wordWrap: 'break-word',
            }}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleTextBlur}
              onKeyDown={handleTextKeyDown}
            />
          );
        }

        return (
          <div
            className="absolute cursor-move select-none"
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
              fontSize: element.properties.fontSize || 16,
              fontFamily: fontFamily,
              fontWeight: element.properties.fontWeight || 'normal',
              fontStyle: element.properties.fontStyle || 'normal',
              textDecoration: element.properties.textDecoration || 'none',
              color: element.properties.color || '#000000',
              backgroundColor: element.properties.backgroundColor || 'transparent',
              textAlign: (element.properties.textAlign as any) || 'left',
              padding: '4px',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.2',
              overflow: 'hidden',
              wordWrap: 'break-word',
            }}
            onMouseDown={onMouseDown}
            onDoubleClick={handleTextDoubleClick}
          >
            {element.properties.text || 'Text'}
          </div>
        );

      case 'shape':
        return (
          <div
            className="absolute cursor-move"
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
            }}
            onMouseDown={onMouseDown}
          >
            {element.properties.shapeType === 'circle' && (
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: element.properties.fillColor || '#6366f1',
                  opacity: element.properties.fillOpacity !== undefined ? element.properties.fillOpacity : 1,
                  border: (element.properties.strokeWidth || 0) > 0
                    ? `${element.properties.strokeWidth}px solid ${element.properties.strokeColor || '#000000'}`
                    : 'none',
                }}
              />
            )}
            {element.properties.shapeType === 'rectangle' && (
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: element.properties.fillColor || '#6366f1',
                  opacity: element.properties.fillOpacity !== undefined ? element.properties.fillOpacity : 1,
                  border: (element.properties.strokeWidth || 0) > 0
                    ? `${element.properties.strokeWidth}px solid ${element.properties.strokeColor || '#000000'}`
                    : 'none',
                }}
              />
            )}
            {element.properties.shapeType === 'triangle' && (
              <div
                className="w-full h-full"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${element.width / 2}px solid transparent`,
                  borderRight: `${element.width / 2}px solid transparent`,
                  borderBottom: `${element.height}px solid ${element.properties.fillColor || '#6366f1'}`,
                  opacity: element.properties.fillOpacity !== undefined ? element.properties.fillOpacity : 1,
                }}
              />
            )}
            {element.properties.shapeType === 'star' && (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  color: element.properties.fillColor || '#6366f1',
                  fontSize: Math.min(element.width, element.height),
                  opacity: element.properties.fillOpacity !== undefined ? element.properties.fillOpacity : 1,
                  textShadow: (element.properties.strokeWidth || 0) > 0
                    ? `${element.properties.strokeWidth}px 0 ${element.properties.strokeColor || '#000000'}, 
                       0 ${element.properties.strokeWidth}px ${element.properties.strokeColor || '#000000'}, 
                       -${element.properties.strokeWidth}px 0 ${element.properties.strokeColor || '#000000'}, 
                       0 -${element.properties.strokeWidth}px ${element.properties.strokeColor || '#000000'}`
                    : 'none',
                }}
              >
                ★
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div
            className="absolute cursor-move"
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
            }}
            onMouseDown={onMouseDown}
          >
            {element.properties.imageUrl && (
              <img
                src={element.properties.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>
        );

      case 'background':
        return (
          <div
            className="absolute"
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              backgroundColor: element.properties.backgroundColor || '#ffffff',
              backgroundImage: element.properties.imageUrl ? `url(${element.properties.imageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderElement()}
      {isSelected && !isEditing && (
        <>
          {/* Selection border */}
          <div
            className="absolute border border-blue-500 border-dashed pointer-events-none"
            style={{
              left: element.x - 1,
              top: element.y - 1,
              width: element.width + 2,
              height: element.height + 2,
              transform: `rotate(${element.rotation}deg)`,
            }}
          />
          
          {/* Resize handles for text and shape elements */}
          {(element.type === 'text' || element.type === 'shape') && (
            <>
              {/* Corner resize handles */}
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-nw-resize"
                style={{
                  left: element.x - 4,
                  top: element.y - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
              />
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-ne-resize"
                style={{
                  left: element.x + element.width - 4,
                  top: element.y - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
              />
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-sw-resize"
                style={{
                  left: element.x - 4,
                  top: element.y + element.height - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
              />
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-se-resize"
                style={{
                  left: element.x + element.width - 4,
                  top: element.y + element.height - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
              />
              
              {/* Edge resize handles */}
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-n-resize"
                style={{
                  left: element.x + element.width / 2 - 4,
                  top: element.y - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
              />
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-s-resize"
                style={{
                  left: element.x + element.width / 2 - 4,
                  top: element.y + element.height - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 's')}
              />
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-w-resize"
                style={{
                  left: element.x - 4,
                  top: element.y + element.height / 2 - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
              />
              <div
                className="absolute w-2 h-2 bg-blue-500 border border-white cursor-e-resize"
                style={{
                  left: element.x + element.width - 4,
                  top: element.y + element.height / 2 - 4,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
