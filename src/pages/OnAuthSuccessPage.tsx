import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';

const OnAuthSuccessPage: React.FC = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10">

        <Card className="bg-slate-800/80 border-green-500/30 backdrop-blur-xl shadow-2xl shadow-green-500/10">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">

                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Email Verified Successfully
            </CardTitle>
            <p className="text-gray-400 mt-2">
              Your account has been verified and is ready to use
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}>

              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Welcome to HoneyPot Farm
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                Your cybersecurity platform account is now active. 
                You can start securing your infrastructure with our advanced honeypot technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/30">

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
                <Clock className="w-4 h-4" />
                Redirecting in {countdown} seconds...
              </div>
              <div className="w-full bg-slate-600/30 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: '100%' }}
                  animate={{ width: `${countdown / 5 * 100}%` }}
                  transition={{ duration: 1, ease: 'linear' }} />

              </div>
            </motion.div>

            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3">

              Continue to Sign In
            </Button>

            <p className="text-xs text-gray-500">
              You will be automatically redirected to the login page to access your dashboard.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <Footer variant="minimal" />
    </div>);

};

export default OnAuthSuccessPage;