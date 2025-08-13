import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Wifi, 
  Server, 
  Monitor, 
  Smartphone, 
  Router,
  Shield,
  Search,
  RefreshCw,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface NetworkAsset {
  id: number;
  asset_name: string;
  ip_address: string;
  mac_address: string;
  device_type: string;
  os_fingerprint: string;
  open_ports: string;
  services: string;
  status: string;
  last_scan: string;
  risk_level: string;
  user_id: number;
}

const NetworkMapper: React.FC = () => {
  const [assets, setAssets] = useState<NetworkAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanRange, setScanRange] = useState('192.168.1.1-254');
  const [selectedAsset, setSelectedAsset] = useState<NetworkAsset | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const deviceIcons = {
    router: Router,
    server: Server,
    workstation: Monitor,
    mobile: Smartphone,
    unknown: Network
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    unknown: 'bg-gray-500'
  };

  const riskColors = {
    critical: 'bg-red-600 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-black',
    low: 'bg-green-500 text-white'
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await window.ezsite.apis.tablePage(33688, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: 'last_scan',
        IsAsc: false
      });

      if (error) throw error;
      setAssets(data.List || []);
    } catch (error) {
      console.error('Error loading network assets:', error);
      toast({
        title: 'Error',
        description: 'Failed to load network assets',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const startNetworkScan = async () => {
    setIsScanning(true);
    try {
      // Simulate network discovery
      const mockAssets = [
        {
          asset_name: `Router-${Math.random().toString(36).substr(2, 6)}`,
          ip_address: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
          mac_address: `00:1A:2B:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}`,
          device_type: 'router',
          os_fingerprint: 'Linux 4.4+ (Router OS)',
          open_ports: '22,80,443,8080',
          services: 'SSH, HTTP, HTTPS, Web Management',
          status: 'online',
          risk_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          user_id: 1
        },
        {
          asset_name: `Server-${Math.random().toString(36).substr(2, 6)}`,
          ip_address: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
          mac_address: `00:2C:3D:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}`,
          device_type: 'server',
          os_fingerprint: 'Windows Server 2019',
          open_ports: '22,80,443,3389,5432',
          services: 'SSH, HTTP, HTTPS, RDP, PostgreSQL',
          status: 'online',
          risk_level: ['medium', 'high', 'critical'][Math.floor(Math.random() * 3)],
          user_id: 1
        },
        {
          asset_name: `Workstation-${Math.random().toString(36).substr(2, 6)}`,
          ip_address: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
          mac_address: `00:3E:4F:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}`,
          device_type: 'workstation',
          os_fingerprint: 'Windows 11',
          open_ports: '445,135,139',
          services: 'SMB, RPC, NetBIOS',
          status: Math.random() > 0.2 ? 'online' : 'offline',
          risk_level: 'low',
          user_id: 1
        }
      ];

      // Add discovered assets to database
      for (const asset of mockAssets) {
        const { error } = await window.ezsite.apis.tableCreate(33688, {
          ...asset,
          last_scan: new Date().toISOString()
        });
        if (error) throw error;
      }

      await loadAssets();
      toast({
        title: 'Success',
        description: `Network scan completed. Discovered ${mockAssets.length} new assets.`
      });
    } catch (error) {
      console.error('Error during network scan:', error);
      toast({
        title: 'Error',
        description: 'Failed to complete network scan',
        variant: 'destructive'
      });
    } finally {
      setIsScanning(false);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    const IconComponent = deviceIcons[deviceType as keyof typeof deviceIcons] || deviceIcons.unknown;
    return <IconComponent className="w-5 h-5" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Scan Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Network Discovery
          </CardTitle>
          <CardDescription>
            Discover and map network assets in your infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="scan-range">IP Range</Label>
              <Input
                id="scan-range"
                value={scanRange}
                onChange={(e) => setScanRange(e.target.value)}
                placeholder="192.168.1.1-254"
                className="max-w-xs"
              />
            </div>
            <Button 
              onClick={startNetworkScan}
              disabled={isScanning}
              className="flex items-center gap-2"
            >
              {isScanning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Button>
            <Button 
              variant="outline" 
              onClick={loadAssets}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold">{assets.length}</p>
              </div>
              <Network className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Online</p>
                <p className="text-2xl font-bold text-green-600">
                  {assets.filter(a => a.status === 'online').length}
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
                <p className="text-sm font-medium text-gray-500">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {assets.filter(a => ['high', 'critical'].includes(a.risk_level)).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Last Scan</p>
                <p className="text-sm font-medium">
                  {assets.length > 0 ? new Date(Math.max(...assets.map(a => new Date(a.last_scan).getTime()))).toLocaleDateString() : 'Never'}
                </p>
              </div>
              <Search className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Discovered Assets</CardTitle>
          <CardDescription>
            Network devices and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {assets.map((asset, index) => (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(asset.device_type)}
                          <span className="font-medium">{asset.asset_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{asset.ip_address}</TableCell>
                      <TableCell className="capitalize">{asset.device_type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(asset.status)}
                          <span className="capitalize">{asset.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={riskColors[asset.risk_level as keyof typeof riskColors]}>
                          {asset.risk_level.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(asset.last_scan).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedAsset(asset)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Asset Details: {asset.asset_name}</DialogTitle>
                              <DialogDescription>
                                Detailed information about this network asset
                              </DialogDescription>
                            </DialogHeader>
                            {selectedAsset && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>IP Address</Label>
                                    <p className="font-mono text-sm">{selectedAsset.ip_address}</p>
                                  </div>
                                  <div>
                                    <Label>MAC Address</Label>
                                    <p className="font-mono text-sm">{selectedAsset.mac_address}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>OS Fingerprint</Label>
                                  <p className="text-sm">{selectedAsset.os_fingerprint}</p>
                                </div>
                                <div>
                                  <Label>Open Ports</Label>
                                  <p className="font-mono text-sm">{selectedAsset.open_ports}</p>
                                </div>
                                <div>
                                  <Label>Services</Label>
                                  <p className="text-sm">{selectedAsset.services}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label>Risk Level:</Label>
                                  <Badge className={riskColors[selectedAsset.risk_level as keyof typeof riskColors]}>
                                    {selectedAsset.risk_level.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {assets.length === 0 && !loading && (
            <div className="text-center py-8">
              <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No network assets discovered yet. Start a network scan to begin mapping your infrastructure.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkMapper;