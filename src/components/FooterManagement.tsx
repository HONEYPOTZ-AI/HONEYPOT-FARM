
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, BarChart3, Eye, EyeOff, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterLink {
  id?: number;
  section_name: string;
  link_title: string;
  link_url: string;
  link_icon: string;
  is_external: boolean;
  display_order: number;
  is_active: boolean;
  click_count: number;
  created_by: number;
}

const FooterManagement: React.FC = () => {
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [analytics, setAnalytics] = useState<{[key: string]: number;}>({});
  const { toast } = useToast();

  const sections = ['social_media', 'quick_links', 'contact', 'legal'];
  const icons = [
  'Mail', 'Linkedin', 'Twitter', 'Github', 'Youtube', 'Phone', 'MessageCircle',
  'BookOpen', 'Code', 'Newspaper', 'Shield', 'FileText', 'Cookie', 'Globe',
  'Users', 'Settings', 'Help', 'Info', 'Home', 'Search'];


  // Initialize empty form
  const getEmptyForm = (): FooterLink => ({
    section_name: 'quick_links',
    link_title: '',
    link_url: '',
    link_icon: 'Mail',
    is_external: false,
    display_order: 1,
    is_active: true,
    click_count: 0,
    created_by: 1
  });

  // Load footer links
  const loadFooterLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await window.ezsite.apis.tablePage(33683, {
        "PageNo": 1,
        "PageSize": 100,
        "OrderByField": "section_name",
        "IsAsc": true
      });

      if (error) throw error;
      if (data?.List) {
        setFooterLinks(data.List);
        // Calculate analytics summary
        const analyticsData = data.List.reduce((acc: any, link: FooterLink) => {
          acc[link.section_name] = (acc[link.section_name] || 0) + link.click_count;
          return acc;
        }, {});
        setAnalytics(analyticsData);
      }
    } catch (error) {
      toast({
        title: "Error Loading Links",
        description: error instanceof Error ? error.message : "Failed to load footer links",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize footer content
  const initializeFooterContent = async () => {
    try {
      setLoading(true);
      const { data } = await window.ezsite.apis.run({
        path: "setupFooterContent",
        param: []
      });

      if (data?.data) {
        // Insert each footer link
        for (const link of data.data) {
          await window.ezsite.apis.tableCreate(33683, link);
        }

        toast({
          title: "Footer Content Initialized",
          description: `Successfully created ${data.data.length} footer links`
        });

        await loadFooterLinks();
      }
    } catch (error) {
      toast({
        title: "Initialization Error",
        description: error instanceof Error ? error.message : "Failed to initialize footer content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Save footer link
  const saveFooterLink = async (link: FooterLink) => {
    try {
      setLoading(true);
      let response;

      if (link.id) {
        response = await window.ezsite.apis.tableUpdate(33683, link);
      } else {
        response = await window.ezsite.apis.tableCreate(33683, link);
      }

      if (response.error) throw response.error;

      toast({
        title: "Link Saved",
        description: `Footer link "${link.link_title}" has been saved successfully`
      });

      setIsDialogOpen(false);
      setEditingLink(null);
      await loadFooterLinks();
    } catch (error) {
      toast({
        title: "Save Error",
        description: error instanceof Error ? error.message : "Failed to save footer link",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete footer link
  const deleteFooterLink = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await window.ezsite.apis.tableDelete(33683, { "ID": id });
      if (error) throw error;

      toast({
        title: "Link Deleted",
        description: "Footer link has been removed successfully"
      });

      await loadFooterLinks();
    } catch (error) {
      toast({
        title: "Delete Error",
        description: error instanceof Error ? error.message : "Failed to delete footer link",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle link active status
  const toggleLinkStatus = async (link: FooterLink) => {
    try {
      const { error } = await window.ezsite.apis.tableUpdate(33683, {
        ...link,
        is_active: !link.is_active
      });
      if (error) throw error;
      await loadFooterLinks();
    } catch (error) {
      toast({
        title: "Update Error",
        description: error instanceof Error ? error.message : "Failed to update link status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadFooterLinks();
  }, []);

  // Get links by section
  const getLinksBySection = (sectionName: string) => {
    return footerLinks.filter((link) => link.section_name === sectionName).
    sort((a, b) => a.display_order - b.display_order);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Footer Management</h2>
          <p className="text-slate-400">Manage footer links, social media, and contact information</p>
        </div>
        <div className="flex items-center space-x-2">
          {footerLinks.length === 0 &&
          <Button
            onClick={initializeFooterContent}
            disabled={loading}
            variant="outline">

              Initialize Content
            </Button>
          }
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingLink(getEmptyForm())}>
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </DialogTrigger>
            <FooterLinkDialog
              link={editingLink}
              onSave={saveFooterLink}
              sections={sections}
              icons={icons}
              isLoading={loading} />

          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="links">Manage Links</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-6">
          {sections.map((section) =>
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="capitalize text-white">
                        {section.replace('_', ' ')}
                      </CardTitle>
                      <CardDescription>
                        {getLinksBySection(section).length} links • {analytics[section] || 0} total clicks
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {getLinksBySection(section).filter((l) => l.is_active).length} active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getLinksBySection(section).map((link) =>
                    <TableRow key={link.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <span>{link.link_title}</span>
                              {link.is_external && <ExternalLink className="w-3 h-3 text-slate-400" />}
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm">
                            {link.link_url.length > 30 ? `${link.link_url.slice(0, 30)}...` : link.link_url}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{link.display_order}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="w-3 h-3 text-cyan-400" />
                              <span className="text-sm">{link.click_count}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLinkStatus(link)}>

                              {link.is_active ?
                          <Eye className="w-4 h-4 text-green-400" /> :

                          <EyeOff className="w-4 h-4 text-slate-400" />
                          }
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingLink(link);
                              setIsDialogOpen(true);
                            }}>

                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Footer Link</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{link.link_title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                  onClick={() => link.id && deleteFooterLink(link.id)}
                                  className="bg-red-600 hover:bg-red-700">

                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Footer Link Analytics</CardTitle>
              <CardDescription>
                Click tracking and engagement metrics for footer links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sections.map((section) =>
                <div key={section} className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-400 capitalize mb-2">
                      {section.replace('_', ' ')}
                    </h4>
                    <div className="text-2xl font-bold text-white mb-1">
                      {analytics[section] || 0}
                    </div>
                    <p className="text-xs text-slate-500">Total clicks</p>
                    <div className="mt-2 text-xs text-slate-400">
                      {getLinksBySection(section).length} links
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Top Performing Links</h4>
                <div className="space-y-2">
                  {footerLinks.
                  sort((a, b) => b.click_count - a.click_count).
                  slice(0, 5).
                  map((link) =>
                  <div key={link.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{link.link_title}</span>
                          <span className="text-slate-400 text-sm ml-2">({link.section_name})</span>
                        </div>
                        <Badge variant="secondary">{link.click_count} clicks</Badge>
                      </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);

};

// Footer Link Dialog Component
const FooterLinkDialog: React.FC<{
  link: FooterLink | null;
  onSave: (link: FooterLink) => void;
  sections: string[];
  icons: string[];
  isLoading: boolean;
}> = ({ link, onSave, sections, icons, isLoading }) => {
  const [formData, setFormData] = useState<FooterLink>(link || {
    section_name: 'quick_links',
    link_title: '',
    link_url: '',
    link_icon: 'Mail',
    is_external: false,
    display_order: 1,
    is_active: true,
    click_count: 0,
    created_by: 1
  });

  useEffect(() => {
    if (link) {
      setFormData(link);
    }
  }, [link]);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{link?.id ? 'Edit' : 'Add'} Footer Link</DialogTitle>
        <DialogDescription>
          {link?.id ? 'Update the footer link details' : 'Create a new footer link'}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="section">Section</Label>
          <Select
            value={formData.section_name}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, section_name: value }))}>

            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sections.map((section) =>
              <SelectItem key={section} value={section} className="capitalize">
                  {section.replace('_', ' ')}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="title">Link Title</Label>
          <Input
            id="title"
            value={formData.link_title}
            onChange={(e) => setFormData((prev) => ({ ...prev, link_title: e.target.value }))}
            placeholder="e.g., Contact Support" />

        </div>

        <div>
          <Label htmlFor="url">Link URL</Label>
          <Input
            id="url"
            value={formData.link_url}
            onChange={(e) => setFormData((prev) => ({ ...prev, link_url: e.target.value }))}
            placeholder="e.g., https://example.com or /contact" />

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={formData.link_icon}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, link_icon: value }))}>

              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {icons.map((icon) =>
                <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) }))}
              min="1" />

          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="external"
              checked={formData.is_external}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_external: checked }))} />

            <Label htmlFor="external">External Link</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))} />

            <Label htmlFor="active">Active</Label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={() => onSave(formData)}
          disabled={isLoading || !formData.link_title || !formData.link_url}>

          {isLoading ? 'Saving...' : 'Save Link'}
        </Button>
      </DialogFooter>
    </DialogContent>);

};

export default FooterManagement;