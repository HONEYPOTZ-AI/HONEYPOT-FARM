import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, MapPin, Clock, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreatDetection {
  id: number;
  honeypot_id: string;
  threat_type: string;
  severity_level: 'Critical' | 'High' | 'Medium' | 'Low';
  source_ip: string;
  location: string;
  attack_vector: string;
  detection_time: string;
  status: 'Active' | 'Mitigated' | 'Investigating';
  details: string;
}

interface ThreatStats {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  active: number;
}

const ThreatDataVisualization: React.FC = () => {
  const [threats, setThreats] = useState<ThreatDetection[]>([]);
  const [stats, setStats] = useState<ThreatStats>({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    active: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchThreatData = async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(33675, {
        "PageNo": 1,
        "PageSize": 50,
        "OrderByField": "detection_time",
        "IsAsc": false,
        "Filters": []
      });

      if (error) throw error;

      const threatList = data?.List || [];
      setThreats(threatList);

      // Calculate stats
      const newStats: ThreatStats = {
        total: threatList.length,
        critical: threatList.filter((t: ThreatDetection) => t.severity_level === 'Critical').length,
        high: threatList.filter((t: ThreatDetection) => t.severity_level === 'High').length,
        medium: threatList.filter((t: ThreatDetection) => t.severity_level === 'Medium').length,
        low: threatList.filter((t: ThreatDetection) => t.severity_level === 'Low').length,
        active: threatList.filter((t: ThreatDetection) => t.status === 'Active').length,
      };
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching threat data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreatData();
    const interval = setInterval(fetchThreatData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-400 bg-red-500/10';
      case 'Investigating': return 'text-yellow-400 bg-yellow-500/10';
      case 'Mitigated': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-600 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Threats</p>
                  <p className="text-2xl font-bold text-cyan-300">{stats.total}</p>
                </div>
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-slate-800/50 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Critical</p>
                  <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">High</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.high}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-slate-800/50 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Medium</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.medium}</p>
                </div>
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-green-400">{stats.active}</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Threats */}
      <Card className="bg-slate-800/50 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Recent Threat Detections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {threats.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 text-gray-400"
                >
                  No threats detected. Your honeypots are monitoring for activity.
                </motion.div>
              ) : (
                threats.slice(0, 5).map((threat, index) => (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${getSeverityColor(threat.severity_level)} text-white text-xs`}>
                            {threat.severity_level}
                          </Badge>
                          <Badge className={getStatusColor(threat.status)}>
                            {threat.status}
                          </Badge>
                          <span className="text-sm text-gray-400">#{threat.honeypot_id}</span>
                        </div>
                        <h4 className="font-semibold text-cyan-300 mb-1">{threat.threat_type}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {threat.source_ip} ({threat.location})
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(threat.detection_time).toLocaleString()}
                          </div>
                        </div>
                        {threat.details && (
                          <p className="text-sm text-gray-300 mt-2 line-clamp-2">{threat.details}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatDataVisualization;