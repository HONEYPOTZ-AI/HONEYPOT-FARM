import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Activity,
  AlertTriangle,
  Settings,
  LogOut,
  Bell,
  User,
  Menu,
  X } from
'lucide-react';
import { toast } from '@/hooks/use-toast';
import ThreatDataVisualization from '@/components/ThreatDataVisualization';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';

interface UserInfo {
  ID: number;
  Name: string;
  Email: string;
  CreateTime: string;
}

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, error } = await window.ezsite.apis.getUserInfo();

        if (error || !data) {
          // User is not authenticated, redirect to login
          navigate('/login');
          return;
        }

        setUser(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await window.ezsite.apis.logout();

      if (error) {
        throw new Error(error);
      }

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "Failed to log out properly",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />

      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative">
      <ParticleBackground />
      
      {/* Header */}
      <header className="relative z-20 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-cyan-300 hover:text-cyan-200">

                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  HONEYPOT FARM
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-cyan-300 hover:text-cyan-200">

                <Bell className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.Name || user?.Email}</span>
              </div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300">

                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          className="fixed lg:relative lg:translate-x-0 z-30 w-64 h-full bg-slate-900/90 backdrop-blur-md border-r border-cyan-500/30 lg:block">

          <div className="p-6 space-y-6">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10">

                <Activity className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-cyan-200 hover:bg-cyan-500/10">

                <AlertTriangle className="w-4 h-4 mr-3" />
                Threat Analysis
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-cyan-200 hover:bg-cyan-500/10">

                <Shield className="w-4 h-4 mr-3" />
                Honeypots
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-cyan-200 hover:bg-cyan-500/10">

                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </nav>

            <div className="pt-6 border-t border-slate-700">
              <Card className="bg-slate-800/50 border-cyan-500/30">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium text-cyan-300 mb-2">Account Info</h4>
                  <p className="text-xs text-gray-400 mb-1">{user?.Email}</p>
                  <p className="text-xs text-gray-500">
                    Member since {user?.CreateTime ? new Date(user.CreateTime).toLocaleDateString() : 'N/A'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen &&
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)} />

        }

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>

            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-cyan-300 mb-2">
                  Security Dashboard
                </h1>
                <p className="text-gray-400">
                  Monitor and manage your honeypot infrastructure in real-time
                </p>
              </div>

              {/* Threat Data Visualization */}
              <ThreatDataVisualization />

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8">

                <Card className="bg-slate-800/50 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-300">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10">

                        <Shield className="w-4 h-4 mr-2" />
                        Deploy Honeypot
                      </Button>
                      <Button
                        variant="outline"
                        className="border-orange-500/30 text-orange-300 hover:border-orange-400/50 hover:bg-orange-500/10">

                        <AlertTriangle className="w-4 h-4 mr-2" />
                        View Alerts
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500/30 text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/10">

                        <Activity className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>);

};

export default DashboardPage;