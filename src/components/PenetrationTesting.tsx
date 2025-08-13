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
  Shield, 
  Play, 
  Pause, 
  Square,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Bug,
  Download,
  Plus,
  Eye,
  RefreshCw
} from 'lucide-react';

interface PenetrationTest {
  id: number;
  test_name: string;
  target_scope: string;
  test_type: string;
  status: string;
  start_time: string;
  end_time: string;
  vulnerabilities_found: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  report_data: string;
  user_id: number;
}

const PenetrationTesting: React.FC = () => {
  const [tests, setTests] = useState<PenetrationTest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [selectedTest, setSelectedTest] = useState<PenetrationTest | null>(null);
  const [newTest, setNewTest] = useState({
    test_name: '',
    target_scope: '',
    test_type: 'network'
  });
  const { toast } = useToast();

  const testTypes = [
    { value: 'network', label: 'Network Penetration Test' },
    { value: 'web', label: 'Web Application Test' },
    { value: 'wireless', label: 'Wireless Security Test' },
    { value: 'social', label: 'Social Engineering Test' },
    { value: 'physical', label: 'Physical Security Test' }
  ];

  const statusColors = {
    scheduled: 'bg-blue-500 text-white',
    running: 'bg-yellow-500 text-black',
    completed: 'bg-green-500 text-white',
    failed: 'bg-red-500 text-white'
  };

  const severityColors = {
    critical: 'text-red-600',
    high: 'text-orange-500',
    medium: 'text-yellow-500',
    low: 'text-green-500'
  };

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    try {
      const { data, error } = await window.ezsite.apis.tablePage(33689, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'start_time',
        IsAsc: false
      });

      if (error) throw error;
      setTests(data.List || []);
    } catch (error) {
      console.error('Error loading penetration tests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load penetration tests',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createTest = async () => {
    if (!newTest.test_name.trim() || !newTest.target_scope.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsCreatingTest(true);
    try {
      const { error } = await window.ezsite.apis.tableCreate(33689, {
        ...newTest,
        status: 'scheduled',
        start_time: new Date().toISOString(),
        vulnerabilities_found: 0,
        critical_count: 0,
        high_count: 0,
        medium_count: 0,
        low_count: 0,
        report_data: '',
        user_id: 1
      });

      if (error) throw error;

      setNewTest({ test_name: '', target_scope: '', test_type: 'network' });
      await loadTests();
      
      toast({
        title: 'Success',
        description: 'Penetration test created and scheduled'
      });
    } catch (error) {
      console.error('Error creating test:', error);
      toast({
        title: 'Error',
        description: 'Failed to create penetration test',
        variant: 'destructive'
      });
    } finally {
      setIsCreatingTest(false);
    }
  };

  const startTest = async (testId: number) => {
    try {
      // Simulate running a penetration test
      const mockResults = {
        vulnerabilities_found: Math.floor(Math.random() * 20) + 5,
        critical_count: Math.floor(Math.random() * 3),
        high_count: Math.floor(Math.random() * 5) + 1,
        medium_count: Math.floor(Math.random() * 8) + 2,
        low_count: Math.floor(Math.random() * 10) + 3,
        report_data: JSON.stringify({
          summary: 'Automated penetration test completed',
          findings: [
            {
              title: 'Unpatched Software Vulnerabilities',
              severity: 'high',
              description: 'Multiple systems running outdated software with known vulnerabilities',
              affected_systems: ['192.168.1.10', '192.168.1.15'],
              recommendation: 'Update all systems to latest security patches'
            },
            {
              title: 'Weak Password Policy',
              severity: 'medium',
              description: 'Password complexity requirements insufficient',
              affected_systems: ['Domain Controller'],
              recommendation: 'Implement stronger password policies and multi-factor authentication'
            },
            {
              title: 'Open Ports on Critical Systems',
              severity: 'high',
              description: 'Unnecessary services running on production servers',
              affected_systems: ['192.168.1.5', '192.168.1.8'],
              recommendation: 'Close unnecessary ports and disable unused services'
            }
          ]
        })
      };

      const { error } = await window.ezsite.apis.tableUpdate(33689, {
        ID: testId,
        status: 'completed',
        end_time: new Date().toISOString(),
        ...mockResults
      });

      if (error) throw error;

      await loadTests();
      
      toast({
        title: 'Success',
        description: `Penetration test completed. Found ${mockResults.vulnerabilities_found} vulnerabilities.`
      });
    } catch (error) {
      console.error('Error starting test:', error);
      toast({
        title: 'Error',
        description: 'Failed to start penetration test',
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

  const getTotalVulnerabilities = () => {
    return tests.reduce((sum, test) => sum + test.vulnerabilities_found, 0);
  };

  const getCriticalVulnerabilities = () => {
    return tests.reduce((sum, test) => sum + test.critical_count, 0);
  };

  return (
    <div className="space-y-6">
      {/* Test Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Create Penetration Test
          </CardTitle>
          <CardDescription>
            Schedule automated penetration testing for your infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="test-name">Test Name</Label>
              <Input
                id="test-name"
                value={newTest.test_name}
                onChange={(e) => setNewTest(prev => ({ ...prev, test_name: e.target.value }))}
                placeholder="Network Security Assessment"
              />
            </div>
            <div>
              <Label htmlFor="target-scope">Target Scope</Label>
              <Input
                id="target-scope"
                value={newTest.target_scope}
                onChange={(e) => setNewTest(prev => ({ ...prev, target_scope: e.target.value }))}
                placeholder="192.168.1.0/24"
              />
            </div>
            <div>
              <Label htmlFor="test-type">Test Type</Label>
              <Select
                value={newTest.test_type}
                onValueChange={(value) => setNewTest(prev => ({ ...prev, test_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {testTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={createTest}
              disabled={isCreatingTest}
              className="flex items-center gap-2"
            >
              {isCreatingTest ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isCreatingTest ? 'Creating...' : 'Create Test'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tests</p>
                <p className="text-2xl font-bold">{tests.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Tests</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tests.filter(t => t.status === 'running').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Vulnerabilities</p>
                <p className="text-2xl font-bold text-red-600">
                  {getTotalVulnerabilities()}
                </p>
              </div>
              <Bug className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Critical Issues</p>
                <p className="text-2xl font-bold text-red-700">
                  {getCriticalVulnerabilities()}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Penetration Tests</CardTitle>
          <CardDescription>
            Manage and monitor your penetration testing activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Target Scope</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vulnerabilities</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {tests.map((test, index) => (
                    <motion.tr
                      key={test.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell>
                        <div className="font-medium">{test.test_name}</div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm">{test.target_scope}</code>
                      </TableCell>
                      <TableCell className="capitalize">{test.test_type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.status)}
                          <Badge className={statusColors[test.status as keyof typeof statusColors]}>
                            {test.status.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {test.vulnerabilities_found > 0 ? (
                          <div className="flex items-center gap-1 text-sm">
                            <span className={severityColors.critical}>{test.critical_count}C</span>
                            <span className={severityColors.high}>{test.high_count}H</span>
                            <span className={severityColors.medium}>{test.medium_count}M</span>
                            <span className={severityColors.low}>{test.low_count}L</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(test.start_time).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {test.status === 'scheduled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => startTest(test.id)}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedTest(test)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Test Report: {test.test_name}</DialogTitle>
                                <DialogDescription>
                                  Detailed penetration test results and findings
                                </DialogDescription>
                              </DialogHeader>
                              {selectedTest && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Target Scope</Label>
                                      <p className="font-mono text-sm">{selectedTest.target_scope}</p>
                                    </div>
                                    <div>
                                      <Label>Test Type</Label>
                                      <p className="capitalize">{selectedTest.test_type}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                      <p className="text-2xl font-bold text-red-600">{selectedTest.critical_count}</p>
                                      <p className="text-sm text-red-600">Critical</p>
                                    </div>
                                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                                      <p className="text-2xl font-bold text-orange-600">{selectedTest.high_count}</p>
                                      <p className="text-sm text-orange-600">High</p>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                      <p className="text-2xl font-bold text-yellow-600">{selectedTest.medium_count}</p>
                                      <p className="text-sm text-yellow-600">Medium</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                      <p className="text-2xl font-bold text-green-600">{selectedTest.low_count}</p>
                                      <p className="text-sm text-green-600">Low</p>
                                    </div>
                                  </div>

                                  {selectedTest.report_data && (
                                    <div className="space-y-4">
                                      <Label>Findings</Label>
                                      {JSON.parse(selectedTest.report_data).findings?.map((finding: any, index: number) => (
                                        <Card key={index} className="p-4">
                                          <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold">{finding.title}</h4>
                                            <Badge className={`${severityColors[finding.severity as keyof typeof severityColors]} border`} variant="outline">
                                              {finding.severity.toUpperCase()}
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
                                          <p className="text-xs text-gray-500 mb-2">
                                            <strong>Affected Systems:</strong> {finding.affected_systems?.join(', ')}
                                          </p>
                                          <p className="text-xs text-blue-600">
                                            <strong>Recommendation:</strong> {finding.recommendation}
                                          </p>
                                        </Card>
                                      ))}
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
          
          {tests.length === 0 && !loading && (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No penetration tests created yet. Create your first test to begin security assessment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PenetrationTesting;