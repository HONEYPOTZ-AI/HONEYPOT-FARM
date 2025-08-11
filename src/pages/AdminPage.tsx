import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Shield, Database, Users, AlertTriangle } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const addSampleTestimonials = async () => {
    setLoading(true);
    try {
      const testimonials = [
      {
        company_name: "CyberTech Solutions",
        customer_name: "Sarah Johnson",
        position: "Chief Information Security Officer",
        testimonial_text: "HoneyPot Farm has revolutionized our threat detection capabilities. We've identified and mitigated over 200 potential breaches in just the first month.",
        rating: 5,
        company_logo: "",
        is_featured: true,
        case_study_title: "Preventing Advanced Persistent Threats",
        case_study_summary: "How CyberTech Solutions deployed 500+ honeypots to detect APT attacks, reducing breach attempts by 90%."
      },
      {
        company_name: "SecureBank International",
        customer_name: "Michael Chen",
        position: "Head of Cybersecurity",
        testimonial_text: "The scalable infrastructure and multi-cloud deployment capabilities have streamlined our security operations across 15 data centers.",
        rating: 5,
        company_logo: "",
        is_featured: true,
        case_study_title: "Banking Security at Scale",
        case_study_summary: "Enterprise-grade deception technology across multiple regions, reducing incident response time by 75%."
      },
      {
        company_name: "DataGuard Corporation",
        customer_name: "Emily Rodriguez",
        position: "Senior Security Analyst",
        testimonial_text: "The intuitive dashboard and automated reporting have transformed how we analyze and respond to security incidents.",
        rating: 4,
        company_logo: "",
        is_featured: false,
        case_study_title: "Operational Efficiency Boost",
        case_study_summary: "Reducing manual workload by 60% through intelligent automation and threat visualization."
      }];


      for (const testimonial of testimonials) {
        const { error } = await window.ezsite.apis.tableCreate(33676, testimonial);
        if (error) throw new Error(error);
      }

      toast({
        title: "Success",
        description: "Sample testimonials added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add testimonials: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addSampleThreats = async () => {
    setLoading(true);
    try {
      const threatTypes = ['SSH Brute Force Attack', 'SQL Injection Attempt', 'DDoS Attack', 'Port Scanning'];
      const severityLevels = ['Critical', 'High', 'Medium', 'Low'];
      const statuses = ['Active', 'Investigating', 'Mitigated'];
      const locations = ['Beijing, China', 'Moscow, Russia', 'Mumbai, India', 'São Paulo, Brazil'];

      for (let i = 0; i < 8; i++) {
        const threat = {
          honeypot_id: `HP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          threat_type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          severity_level: severityLevels[Math.floor(Math.random() * severityLevels.length)],
          source_ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          location: locations[Math.floor(Math.random() * locations.length)],
          attack_vector: ['SSH', 'HTTP', 'TCP'][Math.floor(Math.random() * 3)],
          detection_time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          details: "Automated attack detected from suspicious IP address. Pattern analysis indicates coordinated threat activity."
        };

        const { error } = await window.ezsite.apis.tableCreate(33675, threat);
        if (error) throw new Error(error);
      }

      toast({
        title: "Success",
        description: "Sample threat data added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add threat data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative">
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent mb-4">
              Admin Panel
            </h1>
            <p className="text-gray-400">Manage sample data for demonstration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Testimonials Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Add sample customer testimonials and case studies to showcase social proof.
                </p>
                <Button
                  onClick={addSampleTestimonials}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">

                  {loading ?
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" /> :


                  <Database className="w-4 h-4 mr-2" />
                  }
                  Add Sample Testimonials
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Threat Detection Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Generate sample threat detection data to demonstrate dashboard functionality.
                </p>
                <Button
                  onClick={addSampleThreats}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">

                  {loading ?
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" /> :


                  <Database className="w-4 h-4 mr-2" />
                  }
                  Add Sample Threats
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>);

};

export default AdminPage;