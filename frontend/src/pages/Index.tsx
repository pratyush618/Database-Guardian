
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Server, Clock, Plus, BarChart3, Activity, HardDrive, Cloud } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [connections, setConnections] = useState(0);
  const [totalBackups, setTotalBackups] = useState(0);
  const [storageUsed, setStorageUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    successRate: 0,
    averageTime: 0,
    backupsToday: 0,
    backupsThisWeek: 0,
    storageUsage: 0
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setConnections(Math.floor(Math.random() * 5) + 1);
      setTotalBackups(Math.floor(Math.random() * 50) + 5);
      setStorageUsed(Math.random() * 0.8);
      setStats({
        successRate: 0.95,
        averageTime: Math.floor(Math.random() * 120) + 30,
        backupsToday: Math.floor(Math.random() * 3),
        backupsThisWeek: Math.floor(Math.random() * 10) + 3,
        storageUsage: Math.random() * 0.7
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <motion.h1 
              className="text-3xl font-semibold tracking-tight"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Database Backup Dashboard
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Monitor and manage all your database backups in one place
            </motion.p>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <Link to="/connect">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Connection
              </Button>
            </Link>
            <Link to="/backups">
              <Button variant="outline" className="gap-2">
                View Backups
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Database Connections</p>
                    {loading ? (
                      <div className="h-9 w-16 bg-muted/30 animate-pulse rounded mt-2" />
                    ) : (
                      <h3 className="text-3xl font-bold mt-1">{connections}</h3>
                    )}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/connect" className="text-sm font-medium text-primary hover:underline">Manage connections →</Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Backups</p>
                    {loading ? (
                      <div className="h-9 w-16 bg-muted/30 animate-pulse rounded mt-2" />
                    ) : (
                      <h3 className="text-3xl font-bold mt-1">{totalBackups}</h3>
                    )}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/backups" className="text-sm font-medium text-primary hover:underline">View backup history →</Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                    {loading ? (
                      <div className="h-9 w-24 bg-muted/30 animate-pulse rounded mt-2" />
                    ) : (
                      <h3 className="text-3xl font-bold mt-1">{Math.round(storageUsed * 100)}%</h3>
                    )}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <HardDrive className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Progress value={storageUsed * 100} className="h-2" />
                  <Link to="/settings" className="text-sm font-medium text-primary hover:underline">Manage storage →</Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest backup operations</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-md border">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-muted/30 animate-pulse rounded-full" />
                          <div>
                            <div className="h-4 w-32 bg-muted/30 animate-pulse rounded mb-2" />
                            <div className="h-3 w-24 bg-muted/30 animate-pulse rounded" />
                          </div>
                        </div>
                        <div className="h-4 w-16 bg-muted/30 animate-pulse rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-md border bg-green-50 border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <p className="font-medium">Postgres_Main Backup</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium">MongoDB_Analytics Backup</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 11:30 PM</p>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Scheduled</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-md border bg-amber-50 border-amber-100">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Cloud className="h-4 w-4 text-amber-700" />
                        </div>
                        <div>
                          <p className="font-medium">MySQL_Users Restore</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Restore</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/backups">View all activity</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Backup Statistics</CardTitle>
                <CardDescription>Overview of your backup operations</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-24 bg-muted/30 animate-pulse rounded" />
                        <div className="h-4 w-32 bg-muted/30 animate-pulse rounded" />
                        <div className="h-2 w-full bg-muted/30 animate-pulse rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-sm font-medium">{Math.round(stats.successRate * 100)}%</span>
                      </div>
                      <Progress value={stats.successRate * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Average Backup Time</span>
                        <span className="text-sm font-medium">{stats.averageTime} sec</span>
                      </div>
                      <Progress value={(stats.averageTime / 300) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Storage Usage</span>
                        <span className="text-sm font-medium">{Math.round(stats.storageUsage * 100)}%</span>
                      </div>
                      <Progress value={stats.storageUsage * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-accent/50 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">Backups Today</div>
                        <div className="text-2xl font-bold mt-1">{stats.backupsToday}</div>
                      </div>
                      <div className="bg-accent/50 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">Backups This Week</div>
                        <div className="text-2xl font-bold mt-1">{stats.backupsThisWeek}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/settings">View detailed statistics</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common operations you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/connect" className="block">
                  <div className="border rounded-lg p-4 h-full hover:bg-accent/50 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Add Database</h3>
                      <p className="text-sm text-muted-foreground">Connect a new database to the backup utility</p>
                    </div>
                  </div>
                </Link>
                <Link to="/backups" className="block">
                  <div className="border rounded-lg p-4 h-full hover:bg-accent/50 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Server className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">Create Backup</h3>
                      <p className="text-sm text-muted-foreground">Start a new manual backup operation</p>
                    </div>
                  </div>
                </Link>
                <Link to="/settings" className="block">
                  <div className="border rounded-lg p-4 h-full hover:bg-accent/50 transition-colors">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">View Reports</h3>
                      <p className="text-sm text-muted-foreground">See detailed reports and statistics</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Index;
