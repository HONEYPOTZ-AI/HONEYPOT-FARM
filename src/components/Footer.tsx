import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  variant?: 'default' | 'minimal' | 'dashboard';
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ variant = 'default', className = '' }) => {
  // Minimal footer for auth pages and centered layouts
  if (variant === 'minimal') {
    return (
      <footer className={`w-full py-6 mt-auto ${className}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.ezsite.ai/AutoDev/59275/3e8c466c-e473-4711-9a16-d4aeaa925ac5.jpg"
                alt="Honeypotz Logo"
                className="h-8 w-auto opacity-80" 
                loading="lazy" />
              <span className="text-slate-400 text-xs font-medium">
                Honeypotz Inc
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-slate-600"></div>
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Dashboard variant for internal pages
  if (variant === 'dashboard') {
    return (
      <footer className={`w-full py-4 mt-8 border-t border-slate-700/50 ${className}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 text-sm font-medium">
                HoneyPot Farm Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-500 text-xs">
                © {new Date().getFullYear()} Honeypotz Inc
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Default comprehensive footer
  return (
    <footer className={`w-full py-12 mt-16 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 ${className}`}>
      <div className="container mx-auto px-6">
        <Card className="bg-transparent border-none shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://cdn.ezsite.ai/AutoDev/59275/3e8c466c-e473-4711-9a16-d4aeaa925ac5.jpg"
                  alt="Honeypotz Logo"
                  className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity" 
                  loading="lazy" />
                <div>
                  <div className="text-cyan-300 font-bold text-lg">HONEYPOT FARM</div>
                  <div className="text-slate-400 text-xs">by Honeypotz Inc</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm text-center lg:text-left max-w-sm">
                Advanced cybersecurity platform providing scalable honeypot deployment 
                and real-time threat detection across cloud and on-premises environments.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <h4 className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/login" 
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Get Started
                </Link>
              </nav>
            </div>

            {/* Contact & Legal */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <h4 className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex flex-col space-y-2">
                <a 
                  href="mailto:support@honeypotz.com" 
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Support</span>
                </a>
                <div className="text-slate-500 text-xs space-y-1">
                  <p>Enterprise Security Solutions</p>
                  <p>24/7 Threat Monitoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <p className="text-slate-400 text-xs text-center sm:text-left">
                © {new Date().getFullYear()} Honeypotz Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-slate-500 text-xs">Secure • Scalable • Intelligent</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 text-xs">Platform Active</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;