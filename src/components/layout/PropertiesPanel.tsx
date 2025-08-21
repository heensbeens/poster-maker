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
  ArrowUp,
  ArrowDown,
  Trash2,
  CornerLeftUp,
  CornerRightUp,
  ArrowLeft,
  Circle,
  ArrowRight,
  CornerLeftDown,
  CornerRightDown,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { usePosterMakerStore } from '@/lib/store';
import { calculateTextDimensions } from '@/lib/textUtils';

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
      <div style={{ 
        display: 'flex',
        height: '785px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: '1 0 0',
        padding: '24px'
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-gray-500 text-base">Select an element to edit its properties</p>
        </div>
          <Button 
            variant="outline" 
          className="w-full text-gray-700 hover:bg-gray-50"
            onClick={clearCanvas}
          style={{ alignSelf: 'stretch' }}
          >
            Clear Canvas
          </Button>
      </div>
    );
  }

  const handleTextChange = (property: string, value: string | number) => {
    const newProperties = {
        ...selectedElement.properties,
        [property]: value,
    };

    // If font size, font family, or font weight changed, recalculate dimensions
    if (['fontSize', 'fontFamily', 'fontWeight'].includes(property)) {
      const dimensions = calculateTextDimensions(
        newProperties.text || 'Text',
        newProperties.fontSize || 16,
        newProperties.fontFamily || 'Inter',
        newProperties.fontWeight || 'normal'
      );
      
      updateElement(selectedElement.id, {
        properties: newProperties,
        width: dimensions.width,
        height: dimensions.height,
      });
    } else {
      updateElement(selectedElement.id, {
        properties: newProperties,
      });
    }
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
    <div style={{ 
      display: 'flex',
      height: '785px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flex: '1 0 0',
      padding: '24px'
    }}>
      {/* Inner container with all sections */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '41px',
        alignSelf: 'stretch'
      }}>
      {/* Position Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Position</h3>
          <div style={{
            display: 'flex',
            width: '252px',
            height: '40.342px',
            alignItems: 'flex-start',
            flexShrink: 0,
            gap: '2px'
          }}>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => handlePositionChange('top-left')}
            >
              <CornerLeftUp className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => handlePositionChange('center')}
            >
              <Circle className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => handlePositionChange('top-right')}
            >
              <CornerRightUp className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => handlePositionChange('middle-left')}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => handlePositionChange('middle-right')}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => handlePositionChange('bottom-center')}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

      {/* Layer Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-4">Layer</h3>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => bringForward(selectedElement.id)}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              onClick={() => sendBackward(selectedElement.id)}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              style={{
                display: 'flex',
                padding: '9.909px 14.155px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '7.078px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#dc2626'
              }}
              onClick={() => deleteElement(selectedElement.id)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Section */}
      {selectedElement.type === 'text' && (
              <div>
            <h3 className="text-sm font-medium text-gray-600 mb-4">Text</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Font and Size Row */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Select
                  value={selectedElement.properties.fontFamily || 'Inter'}
                  onValueChange={(value) => handleTextChange('fontFamily', value)}
                >
                  <SelectTrigger style={{ 
                    width: '153px', 
                    height: '40px', 
                    padding: '0 8px !important',
                    display: 'flex !important',
                    justifyContent: 'space-between !important',
                    alignItems: 'center !important'
                  }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={String(selectedElement.properties.fontSize || 24)}
                  onValueChange={(value) => handleTextChange('fontSize', parseInt(value))}
                >
                  <SelectTrigger style={{ 
                    width: '83px', 
                    height: '40px', 
                    padding: '0 8px !important',
                    display: 'flex !important',
                    justifyContent: 'space-between !important',
                    alignItems: 'center !important'
                  }}>
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

              {/* Text Styling Row 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <button
                  style={{
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: selectedElement.properties.fontWeight === 'bold' ? '#f3f4f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleTextChange('fontWeight', 
                    selectedElement.properties.fontWeight === 'bold' ? 'normal' : 'bold'
                  )}
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  style={{
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: selectedElement.properties.fontStyle === 'italic' ? '#f3f4f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleTextChange('fontStyle', 
                    selectedElement.properties.fontStyle === 'italic' ? 'normal' : 'italic'
                  )}
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  style={{
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: selectedElement.properties.textDecoration === 'underline' ? '#f3f4f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleTextChange('textDecoration', 
                    selectedElement.properties.textDecoration === 'underline' ? 'none' : 'underline'
                  )}
                >
                  <Underline className="w-4 h-4" />
                </button>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="color"
                  value={selectedElement.properties.color || '#000000'}
                    onChange={(e) => {
                      console.log('Text color changed to:', e.target.value);
                      handleTextChange('color', e.target.value);
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <div 
                    style={{ 
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      backgroundColor: selectedElement.properties.color || '#22c55e',
                      border: '2px solid white',
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                      pointerEvents: 'none'
                    }}
                  ></div>
                </div>
            </div>

              {/* Text Styling Row 2 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <button
                  style={{
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: selectedElement.properties.textAlign === 'left' ? '#f3f4f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleTextChange('textAlign', 'left')}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  style={{
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: selectedElement.properties.textAlign === 'center' ? '#f3f4f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleTextChange('textAlign', 'center')}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  style={{
                    display: 'flex',
                    padding: '9.909px 14.155px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '7.078px',
                    background: selectedElement.properties.textAlign === 'right' ? '#f3f4f6' : 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleTextChange('textAlign', 'right')}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shape Section - For non-text elements */}
        {selectedElement.type === 'shape' && (
            <div>
            <h3 className="text-sm font-medium text-gray-600 mb-4">Shape</h3>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Fill Row */}
              <div style={{
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Color Picker */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="color"
                    value={selectedElement.properties.fillColor || '#6366f1'}
                    onChange={(e) => {
                      updateElement(selectedElement.id, {
                        properties: {
                          ...selectedElement.properties,
                          fillColor: e.target.value,
                        },
                      });
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '32px',
                      height: '32px',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: selectedElement.properties.fillColor || '#6366f1',
                    border: '1px solid #d1d5db',
                    cursor: 'pointer'
                  }}></div>
                </div>

                {/* Opacity Dropdown/Input */}
                <select
                  value={Math.round((selectedElement.properties.fillOpacity !== undefined ? selectedElement.properties.fillOpacity : 1) * 100)}
                  onChange={(e) => {
                    updateElement(selectedElement.id, {
                      properties: {
                        ...selectedElement.properties,
                        fillOpacity: parseInt(e.target.value) / 100,
                      },
                    });
                  }}
                  style={{
                    height: '32px',
                    padding: '0 8px !important',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer',
                    minWidth: '80px',
                    display: 'flex !important',
                    justifyContent: 'space-between !important',
                    alignItems: 'center !important'
                  }}
                >
                  <option value={0}>0%</option>
                  <option value={10}>10%</option>
                  <option value={20}>20%</option>
                  <option value={30}>30%</option>
                  <option value={40}>40%</option>
                  <option value={50}>50%</option>
                  <option value={60}>60%</option>
                  <option value={70}>70%</option>
                  <option value={80}>80%</option>
                  <option value={90}>90%</option>
                  <option value={100}>100%</option>
                </select>
              </div>

              {/* Stroke Row */}
              <div style={{
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Stroke Width with Chevrons */}
                <div style={{
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  {/* Lines Icon */}
                  <div style={{ 
                    padding: '0 8px',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '2px',
                    alignItems: 'center'
                  }}>
                    <div style={{ width: '12px', height: '1px', backgroundColor: '#9ca3af' }}></div>
                    <div style={{ width: '12px', height: '1px', backgroundColor: '#9ca3af' }}></div>
                    <div style={{ width: '12px', height: '1px', backgroundColor: '#9ca3af' }}></div>
                  </div>
                  
                  {/* Width Display */}
                  <span style={{
                    padding: '0 8px',
                    fontSize: '14px',
                    color: '#374151',
                    minWidth: '20px',
                    textAlign: 'center'
                  }}>
                    {selectedElement.properties.strokeWidth || 0}
                  </span>

                  {/* Up/Down Controls */}
                  <div style={{ 
                    height: '32px',
                    padding: '6px 8px',
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <button
                      style={{
                        padding: '0',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1
                      }}
                      onClick={() => {
                        const currentWidth = selectedElement.properties.strokeWidth || 0;
                        if (currentWidth < 10) {
                          updateElement(selectedElement.id, {
                            properties: {
                              ...selectedElement.properties,
                              strokeWidth: currentWidth + 1,
                            },
                          });
                        }
                      }}
                    >
                      <ChevronUp size={10} />
                    </button>
                    <button
                      style={{
                        padding: '0',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1
                      }}
                      onClick={() => {
                        const currentWidth = selectedElement.properties.strokeWidth || 0;
                        if (currentWidth > 0) {
                          updateElement(selectedElement.id, {
                            properties: {
                              ...selectedElement.properties,
                              strokeWidth: currentWidth - 1,
                            },
                          });
                        }
                      }}
                    >
                      <ChevronDown size={10} />
                    </button>
                  </div>
                </div>

                {/* Stroke Color Picker - Only show if stroke width > 0 */}
                {(selectedElement.properties.strokeWidth || 0) > 0 && (
                  <>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="color"
                        value={selectedElement.properties.strokeColor || '#000000'}
                        onChange={(e) => {
                          updateElement(selectedElement.id, {
                            properties: {
                              ...selectedElement.properties,
                              strokeColor: e.target.value,
                            },
                          });
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '32px',
                          height: '32px',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        backgroundColor: selectedElement.properties.strokeColor || '#000000',
                        border: '1px solid #d1d5db',
                        cursor: 'pointer'
                      }}></div>
                    </div>

                    {/* Stroke Opacity */}
                    <select
                      value={100} // For now, stroke opacity is always 100%
                      style={{
                        height: '32px',
                        padding: '0 8px 0 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        color: '#374151',
                        cursor: 'pointer',
                        minWidth: '80px'
                      }}
                    >
                      <option value={0}>0%</option>
                      <option value={10}>10%</option>
                      <option value={20}>20%</option>
                      <option value={30}>30%</option>
                      <option value={40}>40%</option>
                      <option value={50}>50%</option>
                      <option value={60}>60%</option>
                      <option value={70}>70%</option>
                      <option value={80}>80%</option>
                      <option value={90}>90%</option>
                      <option value={100}>100%</option>
                    </select>
                  </>
                )}
              </div>
            </div>
          </div>
      )}
      </div>

      {/* Clear Canvas Button - At the bottom */}
        <Button 
          variant="outline" 
        className="w-full text-gray-700 hover:bg-gray-50"
          onClick={clearCanvas}
        style={{ alignSelf: 'stretch' }}
        >
          Clear Canvas
        </Button>
    </div>
  );
};
