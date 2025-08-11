import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ParticleBackground from '@/components/ParticleBackground';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      toast({
        title: "Invalid Reset Link",
        description: "This password reset link is invalid or expired",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    setToken(resetToken);
  }, [searchParams, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) return;

    setIsLoading(true);

    try {
      const { error } = await window.ezsite.apis.resetPassword({
        token: token,
        password: formData.password
      });

      if (error) {
        throw new Error(error);
      }

      setResetSuccess(true);
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully"
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Failed to reset password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10">

        <Card className="bg-slate-800/80 border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Set New Password
            </CardTitle>
            <p className="text-gray-400 mt-2">
              {resetSuccess ?
              "Password updated successfully" :
              "Enter your new password below"
              }
            </p>
          </CardHeader>
          
          <CardContent>
            {resetSuccess ?
            <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Password Reset Complete</h3>
                  <p className="text-gray-300 text-sm">
                    Your password has been successfully updated.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Redirecting to login page in 3 seconds...
                  </p>
                </div>
                <Button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">

                  Go to Sign In
                </Button>
              </div> :

            <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cyan-300">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your new password"
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 focus:border-cyan-400 text-white"
                    disabled={isLoading} />

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-cyan-300 transition-colors">

                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-cyan-300">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your new password"
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 focus:border-cyan-400 text-white"
                    disabled={isLoading} />

                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-cyan-300 transition-colors">

                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3"
                disabled={isLoading}>

                  {isLoading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> :


                "Update Password"
                }
                </Button>
              </form>
            }
          </CardContent>
        </Card>
      </motion.div>
    </div>);

};

export default ResetPasswordPage;