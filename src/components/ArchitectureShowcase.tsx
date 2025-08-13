import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Cloud, Database, Monitor, Zap, Server } from 'lucide-react';

const ArchitectureShowcase = () => {
  const architectureFeatures = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "TEE Backend",
    description: "Hosted in Trusted Execution Environments for maximum security"
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Thousands of Virtual Honeypots",
    description: "Scalable deception technology across multiple environments"
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud & On-Prem Deployment",
    description: "Flexible deployment across AWS and on-premises infrastructure"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-time Threat Detection",
    description: "Immediate attacker deception and data collection"
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Centralized Dashboard",
    description: "Comprehensive monitoring and analytics platform"
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Threat Intelligence Loop",
    description: "Continuous feedback and intelligence gathering"
  }];


  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjeWFuIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <Badge variant="outline" className="mb-4 text-cyan-300 border-cyan-300">
            Platform Architecture
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">Cybersecurity</span> Infrastructure
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built on cutting-edge technology stack with Trusted Execution Environments and scalable honeypot deployment
          </p>
        </motion.div>

        {/* Architecture Diagrams */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <img
                  src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/59275/a7803c8b-4021-46af-ba06-f251a0cf7308.png"
                  alt="Honeypot Farm Architecture"
                  className="w-full h-auto rounded-lg" />

                <h3 className="text-xl font-semibold text-white mt-4">System Architecture</h3>
                <p className="text-gray-300 mt-2">Complete overview of our cybersecurity SaaS platform infrastructure</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <img
                  src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/59275/2d56734e-4ae4-41ef-ab8d-50f84091d973.png"
                  alt="Honeypot Deployment Architecture"
                  className="w-full h-auto rounded-lg" />

                <h3 className="text-xl font-semibold text-white mt-4">Deployment Strategy</h3>
                <p className="text-gray-300 mt-2">Real-time threat detection with centralized monitoring and analytics</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureFeatures.map((feature, index) =>
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}>

              <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-yellow-500 text-white mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ArchitectureShowcase;