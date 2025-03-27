
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { 
  HardDrive, 
  BellRing, 
  Sliders, 
  CloudCog, 
  Clock, 
  Mail,
  Trash2, 
  Save,
  Users,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useTheme } from 'next-themes';

const Settings = () => {
  // General Settings
  const { setTheme, resolvedTheme } = useTheme();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('5');
  
  // Storage Settings
  const [storageType, setStorageType] = useState('local');
  const [defaultCompression, setDefaultCompression] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState('30');
  const [cleanupEnabled, setCleanupEnabled] = useState(true);
  
  // Notification Settings
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('');
  const [notifyOnSuccess, setNotifyOnSuccess] = useState(false);
  const [notifyOnFailure, setNotifyOnFailure] = useState(true);
  
  // Security Settings
  const [encryptBackups, setEncryptBackups] = useState(false);
  const [passwordAuth, setPasswordAuth] = useState(true);
  
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = (tabName: string) => {
    setLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Settings Saved",
        description: `Your ${tabName} settings have been saved successfully.`
      });
    }, 1000);
  };

    // This effect will check if the theme from useTheme matches the attribute on HTML
  // and force an update if they don't match
  useEffect(() => {
    const root = window.document.documentElement;
    if (resolvedTheme === 'dark' && !root.classList.contains('dark')) {
      root.classList.add('dark');
    } else if (resolvedTheme === 'light' && root.classList.contains('dark')) {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

    const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col mb-8">
          <motion.h1 
            className="text-3xl font-semibold tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Settings
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Configure your database backup utility
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Sliders className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="storage" className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                <span className="hidden sm:inline">Storage</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure general application settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark mode for the application
                        </p>
                      </div>
                      <Switch 
                      checked={resolvedTheme === "dark"}
                      onCheckedChange={toggleTheme}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Refresh</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically refresh dashboard and status
                        </p>
                      </div>
                      <Switch 
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                    </div>
                    
                    {autoRefresh && (
                      <div className="pl-6 pt-2">
                        <Label htmlFor="refresh-interval">Refresh Interval (minutes)</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Select
                            value={refreshInterval}
                            onValueChange={setRefreshInterval}
                          >
                            <SelectTrigger id="refresh-interval" className="w-32">
                              <SelectValue placeholder="Select interval" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 minute</SelectItem>
                              <SelectItem value="5">5 minutes</SelectItem>
                              <SelectItem value="10">10 minutes</SelectItem>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                          <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label>Application Version</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">v1.0.0</Badge>
                        <span className="text-sm text-muted-foreground">Released: June 15, 2023</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('general')}
                      disabled={loading}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="storage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Settings</CardTitle>
                    <CardDescription>
                      Configure storage options for your backups
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="storage-type">Default Storage Type</Label>
                      <Select
                        value={storageType}
                        onValueChange={setStorageType}
                      >
                        <SelectTrigger id="storage-type">
                          <SelectValue placeholder="Select storage type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">
                            <div className="flex items-center">
                              <HardDrive className="w-4 h-4 mr-2" />
                              Local Storage
                            </div>
                          </SelectItem>
                          <SelectItem value="aws_s3">
                            <div className="flex items-center">
                              <CloudCog className="w-4 h-4 mr-2" />
                              AWS S3
                            </div>
                          </SelectItem>
                          <SelectItem value="google_cloud">
                            <div className="flex items-center">
                              <CloudCog className="w-4 h-4 mr-2" />
                              Google Cloud Storage
                            </div>
                          </SelectItem>
                          <SelectItem value="azure_blob">
                            <div className="flex items-center">
                              <CloudCog className="w-4 h-4 mr-2" />
                              Azure Blob Storage
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {storageType === 'local' && (
                      <div className="space-y-3">
                        <Label htmlFor="local-path">Default Local Path</Label>
                        <Input 
                          id="local-path" 
                          placeholder="/var/backups"
                          defaultValue="/var/backups" 
                        />
                      </div>
                    )}
                    
                    {storageType === 'aws_s3' && (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label htmlFor="s3-bucket">S3 Bucket Name</Label>
                          <Input 
                            id="s3-bucket" 
                            placeholder="my-database-backups" 
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="s3-region">AWS Region</Label>
                          <Select defaultValue="us-east-1">
                            <SelectTrigger id="s3-region">
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                              <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                              <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                              <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Default Compression</Label>
                        <p className="text-sm text-muted-foreground">
                          Compress backup files to save storage space
                        </p>
                      </div>
                      <Switch 
                        checked={defaultCompression}
                        onCheckedChange={setDefaultCompression}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Automatic Cleanup</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically remove old backups
                          </p>
                        </div>
                        <Switch 
                          checked={cleanupEnabled}
                          onCheckedChange={setCleanupEnabled}
                        />
                      </div>
                      
                      {cleanupEnabled && (
                        <div className="pl-6 pt-2">
                          <Label htmlFor="retention-period">Retention Period (days)</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <Select
                              value={retentionPeriod}
                              onValueChange={setRetentionPeriod}
                            >
                              <SelectTrigger id="retention-period" className="w-32">
                                <SelectValue placeholder="Select days" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="14">14 days</SelectItem>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="60">60 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="365">1 year</SelectItem>
                              </SelectContent>
                            </Select>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('storage')}
                      disabled={loading}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how you want to be notified about backup events
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive backup status notifications via email
                          </p>
                        </div>
                        <Switch 
                          checked={emailEnabled}
                          onCheckedChange={setEmailEnabled}
                        />
                      </div>
                      
                      {emailEnabled && (
                        <div className="pl-6 pt-2 space-y-3">
                          <div className="space-y-3">
                            <Label htmlFor="email-address">Email Address</Label>
                            <div className="flex items-center gap-4">
                              <Input 
                                id="email-address" 
                                type="email"
                                placeholder="your@email.com"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                              />
                              <Mail className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Slack Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive backup status notifications via Slack
                          </p>
                        </div>
                        <Switch 
                          checked={slackEnabled}
                          onCheckedChange={setSlackEnabled}
                        />
                      </div>
                      
                      {slackEnabled && (
                        <div className="pl-6 pt-2 space-y-3">
                          <div className="space-y-3">
                            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                            <Input 
                              id="slack-webhook" 
                              placeholder="https://hooks.slack.com/services/..."
                              value={slackWebhook}
                              onChange={(e) => setSlackWebhook(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Events</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Backup Success</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when backups complete successfully
                          </p>
                        </div>
                        <Switch 
                          checked={notifyOnSuccess}
                          onCheckedChange={setNotifyOnSuccess}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Backup Failure</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when backups fail
                          </p>
                        </div>
                        <Switch 
                          checked={notifyOnFailure}
                          onCheckedChange={setNotifyOnFailure}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('notification')}
                      disabled={loading}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security options for your backup utility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Encrypt Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Encrypt backup files for enhanced security
                        </p>
                      </div>
                      <Switch 
                        checked={encryptBackups}
                        onCheckedChange={setEncryptBackups}
                      />
                    </div>
                    
                    {encryptBackups && (
                      <div className="pl-6 pt-2 space-y-3">
                        <div className="space-y-3">
                          <Label htmlFor="encryption-key">Encryption Key</Label>
                          <Input 
                            id="encryption-key" 
                            type="password"
                            placeholder="Enter encryption key" 
                          />
                          <p className="text-xs text-muted-foreground">
                            Keep this key safe. If lost, you won't be able to restore encrypted backups.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Password Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Require password to access the application
                          </p>
                        </div>
                        <Switch 
                          checked={passwordAuth}
                          onCheckedChange={setPasswordAuth}
                        />
                      </div>
                      
                      {passwordAuth && (
                        <div className="pl-6 pt-2 space-y-4">
                          <div className="space-y-3">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input 
                              id="current-password" 
                              type="password"
                              placeholder="Enter current password" 
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input 
                              id="new-password" 
                              type="password"
                              placeholder="Enter new password" 
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input 
                              id="confirm-password" 
                              type="password"
                              placeholder="Confirm new password" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="space-y-0.5">
                        <Label>Access Control</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage who can access the application
                        </p>
                      </div>
                      
                      <div className="pl-6 pt-2 space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">User Management</p>
                              <p className="text-xs text-muted-foreground">
                                Add or remove users and set permissions
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleSaveSettings('security')}
                      disabled={loading}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Settings;
