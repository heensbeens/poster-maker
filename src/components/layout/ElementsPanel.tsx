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

export const ElementsPanel: React.FC = () => {
  const { addElement } = usePosterMakerStore();

  const handleAddText = (type: 'headline' | 'body') => {
    addElement({
      type: 'text',
      x: 50,
      y: 50,
      width: 150,
      height: 40,
      rotation: 0,
      zIndex: 1,
      properties: {
        text: type === 'headline' ? 'Headline Text' : 'Body Text',
        fontSize: type === 'headline' ? 24 : 14,
        fontFamily: 'Inter',
        fontWeight: type === 'headline' ? 'bold' : 'normal',
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
        strokeColor: '#000000',
        strokeWidth: 2,
      },
    });
  };

  const handleAddImage = (fromUrl: boolean = false) => {
    if (fromUrl) {
      const url = prompt('Enter image URL:');
      if (url) {
        addElement({
          type: 'image',
          x: 50,
          y: 50,
          width: 150,
          height: 100,
          rotation: 0,
          zIndex: 1,
          properties: {
            imageUrl: url,
          },
        });
      }
    } else {
      // TODO: Implement file upload
      console.log('File upload not implemented yet');
    }
  };

  const handleAddBackground = (fromUrl: boolean = false) => {
    if (fromUrl) {
      const url = prompt('Enter background image URL:');
      if (url) {
        addElement({
          type: 'background',
          x: 0,
          y: 0,
          width: 600,
          height: 400,
          rotation: 0,
          zIndex: 0,
          properties: {
            imageUrl: url,
          },
        });
      }
    } else {
      addElement({
        type: 'background',
        x: 0,
        y: 0,
        width: 600,
        height: 400,
        rotation: 0,
        zIndex: 0,
        properties: {
          backgroundColor: '#ffffff',
        },
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-6 overflow-y-auto">
      {/* Elements Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleAddText('headline')}
          >
            <Type className="w-4 h-4 mr-2" />
            Headline
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleAddText('body')}
          >
            <Type className="w-4 h-4 mr-2" />
            Body Text
          </Button>
        </CardContent>
      </Card>

      {/* Images Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleAddImage(false)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleAddImage(true)}
          >
            <Link className="w-4 h-4 mr-2" />
            From URL
          </Button>
        </CardContent>
      </Card>

      {/* Shapes Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Shapes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-12"
              onClick={() => handleAddShape('rectangle')}
            >
              <Square className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-12"
              onClick={() => handleAddShape('circle')}
            >
              <Circle className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-12"
              onClick={() => handleAddShape('star')}
            >
              <Star className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-12"
              onClick={() => handleAddShape('triangle')}
            >
              <Triangle className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Background Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleAddBackground(false)}
          >
            <div className="w-4 h-4 mr-2 bg-gray-300 rounded-sm" />
            Solid Color
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleAddBackground(true)}
          >
            <Link className="w-4 h-4 mr-2" />
            From URL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
