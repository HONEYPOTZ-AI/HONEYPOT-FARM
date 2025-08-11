import React from 'react';
import { Card } from '@/components/ui/card';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-16 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
      <div className="container mx-auto px-6">
        <Card className="bg-transparent border-none shadow-none">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn.ezsite.ai/AutoDev/59275/3e8c466c-e473-4711-9a16-d4aeaa925ac5.jpg"
                alt="Honeypotz Logo"
                className="h-8 w-auto opacity-90" />

              <span className="text-slate-300 text-sm font-medium">
                Developed by Honeypotz Inc
              </span>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            <p className="text-slate-400 text-xs text-center">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </Card>
      </div>
    </footer>);

};

export default Footer;