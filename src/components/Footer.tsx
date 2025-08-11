import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Mail, Linkedin, Twitter, Github, Youtube, Phone, MessageCircle, BookOpen, Code, Newspaper, FileText, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FooterLink {
  id: number;
  section_name: string;
  link_title: string;
  link_url: string;
  link_icon: string;
  is_external: boolean;
  display_order: number;
  is_active: boolean;
  click_count: number;
}

interface FooterProps {
  variant?: 'default' | 'minimal' | 'dashboard';
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ variant = 'default', className = '' }) => {
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Icon mapping for dynamic icons
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Mail,
      Linkedin,
      Twitter,
      Github,
      Youtube,
      Phone,
      MessageCircle,
      BookOpen,
      Code,
      Newspaper,
      Shield,
      FileText,
      Cookie
    };
    return icons[iconName] || Mail;
  };

  // Load footer content from database
  const loadFooterContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await window.ezsite.apis.tablePage(33683, {
        "PageNo": 1,
        "PageSize": 50,
        "OrderByField": "display_order",
        "IsAsc": true,
        "Filters": [
          {
            "name": "is_active",
            "op": "Equal",
            "value": true
          }
        ]
      });

      if (error) throw error;
      if (data?.List) {
        setFooterLinks(data.List);
      }
    } catch (error) {
      console.error('Error loading footer content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Track footer link clicks
  const handleLinkClick = async (link: FooterLink) => {
    try {
      // Track the click analytics
      await window.ezsite.apis.run({
        path: "trackFooterClick",
        param: [link.id, link.link_title, link.link_url]
      });

      // Update click count in database
      await window.ezsite.apis.tableUpdate(33683, {
        "ID": link.id,
        "click_count": link.click_count + 1
      });

      // Update local state
      setFooterLinks(prev => 
        prev.map(l => 
          l.id === link.id ? { ...l, click_count: l.click_count + 1 } : l
        )
      );
    } catch (error) {
      console.error('Error tracking footer click:', error);
    }
  };

  useEffect(() => {
    if (variant === 'default') {
      loadFooterContent();
    }
  }, [variant]);

  // Get links by section
  const getLinksBySection = (sectionName: string) => {
    return footerLinks
      .filter(link => link.section_name === sectionName)
      .sort((a, b) => a.display_order - b.display_order);
  };

  // Render footer link with analytics
  const renderFooterLink = (link: FooterLink) => {
    const IconComponent = getIcon(link.link_icon);
    const linkProps = {
      className: "text-slate-400 hover:text-cyan-300 text-sm transition-colors flex items-center space-x-2",
      onClick: () => handleLinkClick(link)
    };

    if (link.is_external) {
      return (
        <a
          key={link.id}
          href={link.link_url}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          <IconComponent className="w-4 h-4" />
          <span>{link.link_title}</span>
        </a>
      );
    } else {
      return (
        <Link
          key={link.id}
          to={link.link_url}
          {...linkProps}
        >
          <IconComponent className="w-4 h-4" />
          <span>{link.link_title}</span>
        </Link>
      );
    }
  };

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

  // Default comprehensive footer with dynamic content
  return (
    <footer className={`w-full py-12 mt-16 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 ${className}`}>
      <div className="container mx-auto px-6">
        <Card className="bg-transparent border-none shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
              
              {/* Social Media Links */}
              <div className="flex items-center space-x-4 mt-4">
                {getLinksBySection('social_media').map(link => {
                  const IconComponent = getIcon(link.link_icon);
                  return (
                    <a
                      key={link.id}
                      href={link.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-300 transition-colors p-2 hover:bg-slate-800/50 rounded-full"
                      onClick={() => handleLinkClick(link)}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
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
                  onClick={() => handleLinkClick({ id: 0, section_name: 'navigation', link_title: 'Home', link_url: '/', link_icon: '', is_external: false, display_order: 1, is_active: true, click_count: 0 })}
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                  onClick={() => handleLinkClick({ id: 0, section_name: 'navigation', link_title: 'Dashboard', link_url: '/dashboard', link_icon: '', is_external: false, display_order: 2, is_active: true, click_count: 0 })}
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                  onClick={() => handleLinkClick({ id: 0, section_name: 'navigation', link_title: 'Sign In', link_url: '/login', link_icon: '', is_external: false, display_order: 3, is_active: true, click_count: 0 })}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
                  onClick={() => handleLinkClick({ id: 0, section_name: 'navigation', link_title: 'Get Started', link_url: '/register', link_icon: '', is_external: false, display_order: 4, is_active: true, click_count: 0 })}
                >
                  Get Started
                </Link>
                
                {/* Dynamic Quick Links */}
                {getLinksBySection('quick_links').map(renderFooterLink)}
              </nav>
            </div>

            {/* Contact Methods */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <h4 className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                Contact Us
              </h4>
              <div className="flex flex-col space-y-2">
                {getLinksBySection('contact').map(renderFooterLink)}
                <div className="text-slate-500 text-xs space-y-1 mt-4">
                  <p>Enterprise Security Solutions</p>
                  <p>24/7 Threat Monitoring</p>
                  <p>Global Support Coverage</p>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <h4 className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                Legal & Privacy
              </h4>
              <div className="flex flex-col space-y-2">
                {getLinksBySection('legal').map(renderFooterLink)}
                <div className="text-slate-500 text-xs space-y-1 mt-4">
                  <p>SOC 2 Type II Certified</p>
                  <p>GDPR Compliant</p>
                  <p>ISO 27001 Certified</p>
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