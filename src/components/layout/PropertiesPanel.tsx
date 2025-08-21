'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  MoveUp,
  MoveDown,
  Trash2,
  Palette,
  Layers
} from 'lucide-react';
import { usePosterMakerStore } from '@/lib/store';

export const PropertiesPanel: React.FC = () => {
  const { 
    elements, 
    selectedElementId, 
    updateElement, 
    deleteElement, 
    bringForward, 
    sendBackward,
    clearCanvas 
  } = usePosterMakerStore();

  const selectedElement = elements.find(el => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="h-full p-4">
        <div className="text-center text-gray-500 mt-8">
          <p>Select an element to edit its properties</p>
        </div>
        <div className="mt-8">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={clearCanvas}
          >
            Clear Canvas
          </Button>
        </div>
      </div>
    );
  }

  const handleTextChange = (property: string, value: string | number) => {
    updateElement(selectedElement.id, {
      properties: {
        ...selectedElement.properties,
        [property]: value,
      },
    });
  };

  const handlePositionChange = (position: string) => {
    const canvasWidth = 600;
    const canvasHeight = 400;
    const elementWidth = selectedElement.width;
    const elementHeight = selectedElement.height;

    let newX = 0;
    let newY = 0;

    switch (position) {
      case 'top-left':
        newX = 0;
        newY = 0;
        break;
      case 'top-center':
        newX = (canvasWidth - elementWidth) / 2;
        newY = 0;
        break;
      case 'top-right':
        newX = canvasWidth - elementWidth;
        newY = 0;
        break;
      case 'middle-left':
        newX = 0;
        newY = (canvasHeight - elementHeight) / 2;
        break;
      case 'center':
        newX = (canvasWidth - elementWidth) / 2;
        newY = (canvasHeight - elementHeight) / 2;
        break;
      case 'middle-right':
        newX = canvasWidth - elementWidth;
        newY = (canvasHeight - elementHeight) / 2;
        break;
      case 'bottom-left':
        newX = 0;
        newY = canvasHeight - elementHeight;
        break;
      case 'bottom-center':
        newX = (canvasWidth - elementWidth) / 2;
        newY = canvasHeight - elementHeight;
        break;
      case 'bottom-right':
        newX = canvasWidth - elementWidth;
        newY = canvasHeight - elementHeight;
        break;
    }

    updateElement(selectedElement.id, { x: newX, y: newY });
  };

  return (
    <div className="h-full p-4 space-y-6 overflow-y-auto">
      {/* Position Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Position</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'top-left', icon: '↖' },
              { key: 'top-center', icon: '↑' },
              { key: 'top-right', icon: '↗' },
              { key: 'middle-left', icon: '←' },
              { key: 'center', icon: '⊙' },
              { key: 'middle-right', icon: '→' },
              { key: 'bottom-left', icon: '↙' },
              { key: 'bottom-center', icon: '↓' },
              { key: 'bottom-right', icon: '↘' },
            ].map((pos) => (
              <Button
                key={pos.key}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handlePositionChange(pos.key)}
              >
                {pos.icon}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Layer Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Layer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => bringForward(selectedElement.id)}
              className="flex-1"
            >
              <MoveUp className="w-4 h-4 mr-1" />
              Bring Forward
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendBackward(selectedElement.id)}
              className="flex-1"
            >
              <MoveDown className="w-4 h-4 mr-1" />
              Send Backward
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteElement(selectedElement.id)}
            className="w-full text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </CardContent>
      </Card>

      {/* Text Properties Section - Only show for text elements */}
      {selectedElement.type === 'text' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Font and Size */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Font</Label>
                <Select
                  value={selectedElement.properties.fontFamily || 'Inter'}
                  onValueChange={(value) => handleTextChange('fontFamily', value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Size</Label>
                <Select
                  value={String(selectedElement.properties.fontSize || 16)}
                  onValueChange={(value) => handleTextChange('fontSize', parseInt(value))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64].map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text Styling */}
            <div>
              <Label className="text-xs">Style</Label>
              <div className="flex space-x-1 mt-1">
                <Button
                  variant={selectedElement.properties.fontWeight === 'bold' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('fontWeight', 
                    selectedElement.properties.fontWeight === 'bold' ? 'normal' : 'bold'
                  )}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedElement.properties.fontStyle === 'italic' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('fontStyle', 
                    selectedElement.properties.fontStyle === 'italic' ? 'normal' : 'italic'
                  )}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedElement.properties.textDecoration === 'underline' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('textDecoration', 
                    selectedElement.properties.textDecoration === 'underline' ? 'none' : 'underline'
                  )}
                >
                  <Underline className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedElement.properties.textDecoration === 'line-through' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('textDecoration', 
                    selectedElement.properties.textDecoration === 'line-through' ? 'none' : 'line-through'
                  )}
                >
                  <Strikethrough className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Color */}
            <div>
              <Label className="text-xs">Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <div
                  className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: selectedElement.properties.color || '#000000' }}
                  onClick={() => {
                    const color = prompt('Enter color (hex, rgb, or name):', selectedElement.properties.color || '#000000');
                    if (color) handleTextChange('color', color);
                  }}
                />
                <Input
                  value={selectedElement.properties.color || '#000000'}
                  onChange={(e) => handleTextChange('color', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            {/* Text Alignment */}
            <div>
              <Label className="text-xs">Alignment</Label>
              <div className="flex space-x-1 mt-1">
                <Button
                  variant={selectedElement.properties.textAlign === 'left' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('textAlign', 'left')}
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedElement.properties.textAlign === 'center' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('textAlign', 'center')}
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedElement.properties.textAlign === 'right' ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleTextChange('textAlign', 'right')}
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <Label className="text-xs">Text Content</Label>
              <Input
                value={selectedElement.properties.text || ''}
                onChange={(e) => handleTextChange('text', e.target.value)}
                className="h-8 text-xs"
                placeholder="Enter text..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clear Canvas Button */}
      <div className="mt-auto pt-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearCanvas}
        >
          Clear Canvas
        </Button>
      </div>
    </div>
  );
};
