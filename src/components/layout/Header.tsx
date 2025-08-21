'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Cloud } from 'lucide-react';

export const Header: React.FC = () => {
  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download clicked');
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-900">Editor / Flyer</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          onClick={handleDownload}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </header>
  );
};
