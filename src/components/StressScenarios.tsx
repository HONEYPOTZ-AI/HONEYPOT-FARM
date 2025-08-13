import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Play, 
  Pause, 
  Square,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  TrendingUp,
  Plus,
  Eye,
  RefreshCw,
  BarChart3
} from 'lucide-react';

interface StressScenario {
  id: number;
  scenario_name: string;
  description: string;
  scenario_type: string;
  target_systems: string;
  parameters: string;
  status: string;
  start_time: string;
  end_time: string;
  max_cpu_usage: number;
  max_memory_usage: number;
  max_network_usage: number;
  response_time_avg: number;
  failure_points: string;
  recommendations: string;
  user_id: number;
}

const StressScenarios: React.FC = () => {
  const [scenarios, setScenarios] = useState<StressScenario[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreatingScenario, setIsCreatingScenario] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<StressScenario | null>(null);
  const [newScenario, setNewScenario] = useState({
    scenario_name: '',
    description: '',
    scenario_type: 'load_test',
    target_systems: '',
    parameters: ''
  });
  const { toast } = useToast();

  const scenarioTypes = [
    { value: 'load_test', label: 'Load Testing', icon: Activity },
    { value: 'ddos_simulation', label: 'DDoS Simulation', icon: Wifi },
    { value: 'resource_exhaustion', label: 'Resource Exhaustion', icon: Cpu },
    { value: 'network_congestion', label: 'Network Congestion', icon: Wifi },
    { value: 'memory_pressure', label: 'Memory Pressure', icon: HardDrive }
  ];

  const statusColors = {
    scheduled: 'bg-blue-500 text-white',
    running: 'bg-yellow-500 text-black',
    completed: 'bg-green-500 text-white',
    failed: 'bg-red-500 text-white'
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setLoading(true);
    try {
      const { data, error } = await window.ezsite.apis.tablePage(33690, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'start_time',
        IsAsc: false
      });

      if (error) throw error;
      setScenarios(data.List || []);
    } catch (error) {
      console.error('Error loading stress scenarios:', error);
      toast({
        title: 'Error',
        description: 'Failed to load stress scenarios',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createScenario = async () => {
    if (!newScenario.scenario_name.trim() || !newScenario.target_systems.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsCreatingScenario(true);
    try {
      const defaultParameters = JSON.stringify({
        duration: '10',
        concurrent_users: '100',
        ramp_up_time: '30',
        target_rps: '50'
      });

      const { error } = await window.ezsite.apis.tableCreate(33690, {
        ...newScenario,
        parameters: newScenario.parameters || defaultParameters,
        status: 'scheduled',
        start_time: new Date().toISOString(),
        max_cpu_usage: 0,
        max_memory_usage: 0,
        max_network_usage: 0,
        response_time_avg: 0,
        failure_points: '',
        recommendations: '',
        user_id: 1
      });

      if (error) throw error;

      setNewScenario({
        scenario_name: '',
        description: '',
        scenario_type: 'load_test',
        target_systems: '',
        parameters: ''
      });
      
      await loadScenarios();
      
      toast({
        title: 'Success',
        description: 'Stress test scenario created and scheduled'
      });
    } catch (error) {
      console.error('Error creating scenario:', error);
      toast({
        title: 'Error',
        description: 'Failed to create stress scenario',
        variant: 'destructive'
      });
    } finally {
      setIsCreatingScenario(false);
    }
  };

  const startScenario = async (scenarioId: number) => {
    try {
      // Simulate running a stress test
      const mockResults = {
        max_cpu_usage: Math.random() * 95 + 5,
        max_memory_usage: Math.random() * 90 + 10,
        max_network_usage: Math.random() * 1000 + 100,
        response_time_avg: Math.random() * 2000 + 100,
        failure_points: JSON.stringify([
          { time: '00:05:30', description: 'CPU usage exceeded 90%', system: '192.168.1.10' },
          { time: '00:08:15', description: 'Memory usage critical', system: '192.168.1.15' },
          { time: '00:09:45', description: 'Network timeout detected', system: '192.168.1.20' }
        ]),
        recommendations: JSON.stringify([
          'Increase CPU resources on affected systems',
          'Implement load balancing to distribute traffic',
          'Optimize database queries to reduce response time',
          'Configure auto-scaling for peak load periods',
          'Monitor network bandwidth and upgrade if necessary'
        ])
      };

      const { error } = await window.ezsite.apis.tableUpdate(33690, {
        ID: scenarioId,
        status: 'completed',
        end_time: new Date().toISOString(),
        ...mockResults
      });

      if (error) throw error;

      await loadScenarios();
      
      toast({
        title: 'Success',
        description: 'Stress test scenario completed successfully'
      });
    } catch (error) {
      console.error('Error starting scenario:', error);
      toast({
        title: 'Error',
        description: 'Failed to start stress scenario',
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'running':
        return <Play className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getScenarioTypeIcon = (type: string) => {
    const scenarioType = scenarioTypes.find(t => t.value === type);
    if (!scenarioType) return <Zap className="w-4 h-4" />;
    const IconComponent = scenarioType.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const getCompletedScenarios = () => {
    return scenarios.filter(s => s.status === 'completed');
  };

  const getAverageResponseTime = () => {
    const completed = getCompletedScenarios();
    if (completed.length === 0) return 0;
    return completed.reduce((sum, s) => sum + s.response_time_avg, 0) / completed.length;
  };

  return (
    <div className="space-y-6">
      {/* Scenario Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Create Stress Test Scenario
          </CardTitle>
          <CardDescription>
            Design what-if scenarios to test your system's resilience under stress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input
                id="scenario-name"
                value={newScenario.scenario_name}
                onChange={(e) => setNewScenario(prev => ({ ...prev, scenario_name: e.target.value }))}
                placeholder="High Traffic Load Test"
              />
            </div>
            <div>
              <Label htmlFor="scenario-type">Scenario Type</Label>
              <Select
                value={newScenario.scenario_type}
                onValueChange={(value) => setNewScenario(prev => ({ ...prev, scenario_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarioTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="target-systems">Target Systems</Label>
              <Input
                id="target-systems"
                value={newScenario.target_systems}
                onChange={(e) => setNewScenario(prev => ({ ...prev, target_systems: e.target.value }))}
                placeholder="web-server-01, db-server-01"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newScenario.description}
                onChange={(e) => setNewScenario(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Simulate peak holiday traffic"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="parameters">Test Parameters (JSON)</Label>
            <Textarea
              id="parameters"
              value={newScenario.parameters}
              onChange={(e) => setNewScenario(prev => ({ ...prev, parameters: e.target.value }))}
              placeholder='{"duration": "10", "concurrent_users": "100", "ramp_up_time": "30", "target_rps": "50"}'
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={createScenario}
              disabled={isCreatingScenario}
              className="flex items-center gap-2"
            >
              {isCreatingScenario ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isCreatingScenario ? 'Creating...' : 'Create Scenario'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Scenarios</p>
                <p className="text-2xl font-bold">{scenarios.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Running Tests</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {scenarios.filter(s => s.status === 'running').length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {getCompletedScenarios().length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold">
                  {Math.round(getAverageResponseTime())}ms
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenarios Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stress Test Scenarios</CardTitle>
          <CardDescription>
            Manage and monitor your stress testing scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target Systems</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {scenarios.map((scenario, index) => (
                    <motion.tr
                      key={scenario.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{scenario.scenario_name}</div>
                          <div className="text-sm text-gray-500">{scenario.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getScenarioTypeIcon(scenario.scenario_type)}
                          <span className="capitalize">{scenario.scenario_type.replace('_', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm">{scenario.target_systems}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(scenario.status)}
                          <Badge className={statusColors[scenario.status as keyof typeof statusColors]}>
                            {scenario.status.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {scenario.status === 'completed' ? (
                          <div className="text-sm space-y-1">
                            <div>CPU: {Math.round(scenario.max_cpu_usage)}%</div>
                            <div>Mem: {Math.round(scenario.max_memory_usage)}%</div>
                            <div>RT: {Math.round(scenario.response_time_avg)}ms</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(scenario.start_time).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {scenario.status === 'scheduled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => startScenario(scenario.id)}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedScenario(scenario)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Scenario Report: {scenario.scenario_name}</DialogTitle>
                                <DialogDescription>
                                  Detailed stress test results and analysis
                                </DialogDescription>
                              </DialogHeader>
                              {selectedScenario && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Target Systems</Label>
                                      <p className="font-mono text-sm">{selectedScenario.target_systems}</p>
                                    </div>
                                    <div>
                                      <Label>Scenario Type</Label>
                                      <p className="capitalize">{selectedScenario.scenario_type.replace('_', ' ')}</p>
                                    </div>
                                  </div>

                                  {selectedScenario.status === 'completed' && (
                                    <>
                                      <div className="grid grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                          <Cpu className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                          <p className="text-2xl font-bold text-blue-600">{Math.round(selectedScenario.max_cpu_usage)}%</p>
                                          <p className="text-sm text-blue-600">Max CPU Usage</p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                          <HardDrive className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                          <p className="text-2xl font-bold text-green-600">{Math.round(selectedScenario.max_memory_usage)}%</p>
                                          <p className="text-sm text-green-600">Max Memory Usage</p>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                          <Wifi className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                          <p className="text-2xl font-bold text-purple-600">{Math.round(selectedScenario.max_network_usage)}</p>
                                          <p className="text-sm text-purple-600">Max Network (Mbps)</p>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                          <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                          <p className="text-2xl font-bold text-orange-600">{Math.round(selectedScenario.response_time_avg)}</p>
                                          <p className="text-sm text-orange-600">Avg Response (ms)</p>
                                        </div>
                                      </div>

                                      {selectedScenario.failure_points && (
                                        <div className="space-y-4">
                                          <Label>Failure Points</Label>
                                          {JSON.parse(selectedScenario.failure_points).map((failure: any, index: number) => (
                                            <Card key={index} className="p-4 border-l-4 border-red-500">
                                              <div className="flex items-center justify-between mb-2">
                                                <span className="font-mono text-sm">{failure.time}</span>
                                                <Badge variant="outline" className="text-red-600">
                                                  {failure.system}
                                                </Badge>
                                              </div>
                                              <p className="text-sm">{failure.description}</p>
                                            </Card>
                                          ))}
                                        </div>
                                      )}

                                      {selectedScenario.recommendations && (
                                        <div className="space-y-4">
                                          <Label>Recommendations</Label>
                                          <div className="space-y-2">
                                            {JSON.parse(selectedScenario.recommendations).map((rec: string, index: number) => (
                                              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                                                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm">{rec}</p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  )}

                                  {selectedScenario.parameters && (
                                    <div>
                                      <Label>Test Parameters</Label>
                                      <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-sm overflow-x-auto">
                                        {JSON.stringify(JSON.parse(selectedScenario.parameters), null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {scenarios.length === 0 && !loading && (
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No stress scenarios created yet. Create your first scenario to begin testing system resilience.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StressScenarios;