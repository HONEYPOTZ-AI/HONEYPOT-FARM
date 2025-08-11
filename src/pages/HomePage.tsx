import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Monitor, Cloud, Server, AlertTriangle, Database, User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import TestimonialsSection from '@/components/TestimonialsSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative">
      <ParticleBackground />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              HONEYPOT FARM
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-cyan-300 hover:text-cyan-200 transition-colors">Features</a>
              <a href="#architecture" className="text-cyan-300 hover:text-cyan-200 transition-colors">Architecture</a>
              <a href="#testimonials" className="text-cyan-300 hover:text-cyan-200 transition-colors">Testimonials</a>
              <Link to="/admin" className="text-gray-400 hover:text-cyan-300 transition-colors text-sm">Admin</Link>
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <User className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              HONEYPOT FARM
            </span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-cyan-300 mb-8 tracking-wide"
          >
            CYBERSECURITY SAAS PLATFORM
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Deploy thousands of virtual honeypots across cloud and on-premises environments 
            with advanced threat detection and real-time logging capabilities.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 text-lg px-8 py-4">
                View Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
          >
            Platform Architecture
          </motion.h3>
          
          <div className="relative">
            {/* Central Backend */}
            <div className="flex justify-center mb-16">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-2xl transform rotate-12 shadow-2xl shadow-blue-500/30">
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl">
                    <div className="absolute inset-4 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <Database className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-center">
                    <h4 className="text-xl font-bold text-cyan-300 mb-2">BACKEND</h4>
                    <p className="text-sm text-gray-300">HOSTED IN TRUSTED EXECUTION<br />ENVIRONMENTS (TEE)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* User Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Monitor className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-cyan-300 mb-2">User Interface</h4>
                    <p className="text-gray-300 text-sm">(Dashboard)</p>
                    <p className="text-gray-400 text-xs mt-2">Comprehensive monitoring and control interface</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Virtual Honeypots */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/50 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                      <Server className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-orange-300 mb-2">Thousands of</h4>
                    <p className="text-orange-200 text-sm font-semibold">Virtual Honeypots</p>
                    <p className="text-gray-400 text-xs mt-2">Scalable deception technology deployment</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cloud Deployment */}
              <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">Deployment Across</h4>
                  <div className="flex justify-center space-x-2 text-sm">
                    <span className="text-cyan-200">AWS</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-cyan-200">on-prem</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Multi-cloud and hybrid deployment</p>
                </CardContent>
              </Card>

              {/* Threat Detection */}
              <Card className="bg-slate-800/50 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-orange-300 mb-2">Threat Detection</h4>
                  <p className="text-orange-200 text-sm">& Logging System</p>
                  <p className="text-gray-400 text-xs mt-2">Real-time threat analysis and reporting</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Control Panel */}
            <div className="mt-12 flex justify-center">
              <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 w-full max-w-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-cyan-300 mb-2">Admin Control Panel</h4>
                  <p className="text-gray-400 text-xs">Centralized management and configuration</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Platform Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-cyan-300 mb-3">Advanced Threat Detection</h4>
              <p className="text-gray-300">AI-powered threat analysis with real-time alerts and comprehensive attack pattern recognition.</p>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-orange-300 mb-3">Scalable Infrastructure</h4>
              <p className="text-gray-300">Deploy thousands of honeypots across multiple environments with automatic scaling and load balancing.</p>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-cyan-300 mb-3">Multi-Cloud Support</h4>
              <p className="text-gray-300">Seamless deployment across AWS, Azure, GCP, and on-premises infrastructure with unified management.</p>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-orange-300 mb-3">Real-Time Monitoring</h4>
              <p className="text-gray-300">24/7 monitoring with instant notifications and detailed forensic analysis of security incidents.</p>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-cyan-300 mb-3">Secure Backend</h4>
              <p className="text-gray-300">Trusted Execution Environment (TEE) ensures maximum security for your honeypot infrastructure.</p>
            </div>

            <div className="bg-slate-800/30 p-8 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-orange-300 mb-3">Intuitive Dashboard</h4>
              <p className="text-gray-300">User-friendly interface with advanced analytics, reporting, and customizable threat intelligence feeds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
          >
            Ready to Deploy Your Honeypot Farm?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Start protecting your infrastructure with enterprise-grade deception technology
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 text-lg px-8 py-4">
                Contact Sales
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-6 border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            HONEYPOT FARM
          </div>
          <p className="text-gray-400 mb-6">Advanced Cybersecurity SaaS Platform</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-300 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>);

};

export default HomePage;