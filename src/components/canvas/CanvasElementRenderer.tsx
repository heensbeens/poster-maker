'use client';

import React from 'react';
import { CanvasElement } from '@/lib/store';

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
  const renderElement = () => {
    switch (element.type) {
      case 'text':
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
              fontFamily: element.properties.fontFamily || 'Inter',
              fontWeight: element.properties.fontWeight || 'normal',
              fontStyle: element.properties.fontStyle || 'normal',
              textDecoration: element.properties.textDecoration || 'none',
              color: element.properties.color || '#000000',
              backgroundColor: element.properties.backgroundColor || 'transparent',
              textAlign: (element.properties.textAlign as any) || 'left',
              padding: '4px',
              whiteSpace: 'pre-line',
              lineHeight: '1.2',
            }}
            onMouseDown={onMouseDown}
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
                  border: `${element.properties.strokeWidth || 0}px solid ${element.properties.strokeColor || '#000000'}`,
                }}
              />
            )}
            {element.properties.shapeType === 'rectangle' && (
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: element.properties.fillColor || '#6366f1',
                  border: `${element.properties.strokeWidth || 0}px solid ${element.properties.strokeColor || '#000000'}`,
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
                }}
              />
            )}
            {element.properties.shapeType === 'star' && (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  color: element.properties.fillColor || '#6366f1',
                  fontSize: Math.min(element.width, element.height),
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
      {isSelected && (
        <div
          className="absolute border-2 border-blue-500 border-dashed pointer-events-none"
          style={{
            left: element.x - 2,
            top: element.y - 2,
            width: element.width + 4,
            height: element.height + 4,
            transform: `rotate(${element.rotation}deg)`,
          }}
        />
      )}
    </>
  );
};
