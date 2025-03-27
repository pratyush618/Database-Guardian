
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Database } from 'lucide-react';
import Layout from '../components/Layout';
import DatabaseCard from '../components/DatabaseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  DatabaseConnection, 
  DatabaseType, 
  testDatabaseConnection,
  getDefaultPort
} from '../utils/databaseUtils';
import { BackupConfig } from '../utils/backupUtils';
import BackupModal from '../components/BackupModal';

const Connect = () => {
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<DatabaseConnection | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [connectionToDelete, setConnectionToDelete] = useState<DatabaseConnection | null>(null);
  const [connectionForm, setConnectionForm] = useState({
    name: '',
    type: 'postgresql' as DatabaseType,
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: ''
  });
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    // Simulate loading connections
    const timer = setTimeout(() => {
      const mockConnections: DatabaseConnection[] = [
        {
          id: '1',
          name: 'PostgreSQL Production',
          type: 'postgresql',
          host: 'db.example.com',
          port: 5432,
          username: 'admin',
          password: '********',
          database: 'production_db',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          lastBackupAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'connected'
        },
        {
          id: '2',
          name: 'MySQL Analytics',
          type: 'mysql',
          host: 'analytics.example.com',
          port: 3306,
          username: 'analytics_user',
          password: '********',
          database: 'analytics',
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          lastBackupAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'connected'
        },
        {
          id: '3',
          name: 'MongoDB Users',
          type: 'mongodb',
          host: 'mongo.example.com',
          port: 27017,
          username: 'mongo_admin',
          password: '********',
          database: 'users',
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          lastBackupAt: null,
          status: 'error',
          error: 'Authentication failed'
        }
      ];
      
      setConnections(mockConnections);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConnectionTypeChange = (type: DatabaseType) => {
    setConnectionForm({
      ...connectionForm,
      type,
      port: getDefaultPort(type)
    });
  };

  const handleOpenConnectionModal = (editConnection?: DatabaseConnection) => {
    if (editConnection) {
      setConnectionForm({
        name: editConnection.name,
        type: editConnection.type,
        host: editConnection.host,
        port: editConnection.port,
        username: editConnection.username,
        password: editConnection.password,
        database: editConnection.database
      });
      setIsEditMode(true);
      setSelectedConnection(editConnection);
    } else {
      setConnectionForm({
        name: '',
        type: 'postgresql',
        host: 'localhost',
        port: 5432,
        username: '',
        password: '',
        database: ''
      });
      setIsEditMode(false);
      setSelectedConnection(null);
    }
    
    setTestResult(null);
    setIsConnectionModalOpen(true);
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    
    try {
      const result = await testDatabaseConnection(connectionForm);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'An unexpected error occurred while testing the connection.'
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveConnection = () => {
    // Validate form
    if (!connectionForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Connection name is required",
        variant: "destructive"
      });
      return;
    }
    
    const newConnection: DatabaseConnection = {
      id: isEditMode && selectedConnection ? selectedConnection.id : Date.now().toString(),
      ...connectionForm,
      createdAt: isEditMode && selectedConnection ? selectedConnection.createdAt : new Date(),
      lastBackupAt: isEditMode && selectedConnection ? selectedConnection.lastBackupAt : null,
      status: 'connected'
    };
    
    if (isEditMode && selectedConnection) {
      // Update existing connection
      setConnections(connections.map(conn => 
        conn.id === selectedConnection.id ? newConnection : conn
      ));
      
      toast({
        title: "Connection Updated",
        description: `${newConnection.name} has been updated successfully.`
      });
    } else {
      // Add new connection
      setConnections([...connections, newConnection]);
      
      toast({
        title: "Connection Added",
        description: `${newConnection.name} has been added successfully.`
      });
    }
    
    setIsConnectionModalOpen(false);
  };

  const handleOpenBackupModal = (connection: DatabaseConnection) => {
    setSelectedConnection(connection);
    setIsBackupModalOpen(true);
  };

  const handleCreateBackup = (config: BackupConfig) => {
    // In a real application, this would initiate a backup process
    toast({
      title: "Backup Initiated",
      description: `Backup process for ${selectedConnection?.name} has started.`
    });
    
    setIsBackupModalOpen(false);
  };

  const handleOpenDeleteModal = (connection: DatabaseConnection) => {
    setConnectionToDelete(connection);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConnection = () => {
    if (connectionToDelete) {
      setConnections(connections.filter(conn => conn.id !== connectionToDelete.id));
      
      toast({
        title: "Connection Deleted",
        description: `${connectionToDelete.name} has been deleted.`
      });
      
      setIsDeleteModalOpen(false);
      setConnectionToDelete(null);
    }
  };

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
              Database Connections
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Manage your database connections for backup and restore operations
            </motion.p>
          </div>
          <motion.div 
            className="mt-6 md:mt-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button onClick={() => handleOpenConnectionModal()} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Connection
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-card animate-pulse rounded-xl shadow-sm border"></div>
            ))}
          </div>
        ) : connections.length === 0 ? (
          <motion.div 
            className="text-center py-16 glass-panel"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Database className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Database Connections</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              You haven't added any database connections yet. Add a connection to start backing up your data.
            </p>
            <Button onClick={() => handleOpenConnectionModal()} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Connection
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {connections.map((connection, index) => (
              <motion.div 
                key={connection.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <DatabaseCard 
                  connection={connection}
                  onBackup={() => handleOpenBackupModal(connection)}
                  onEdit={() => handleOpenConnectionModal(connection)}
                  onDelete={() => handleOpenDeleteModal(connection)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Connection Modal */}
        <Dialog open={isConnectionModalOpen} onOpenChange={setIsConnectionModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Connection' : 'Add New Connection'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? 'Update your database connection details'
                  : 'Enter your database connection details to connect to your database'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Connection Name</Label>
                <Input 
                  id="name" 
                  value={connectionForm.name}
                  onChange={e => setConnectionForm({...connectionForm, name: e.target.value})}
                  placeholder="e.g. Production Database"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="type">Database Type</Label>
                <Select 
                  value={connectionForm.type} 
                  onValueChange={(value) => handleConnectionTypeChange(value as DatabaseType)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="host">Host</Label>
                  <Input 
                    id="host" 
                    value={connectionForm.host}
                    onChange={e => setConnectionForm({...connectionForm, host: e.target.value})}
                    placeholder="localhost"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="port">Port</Label>
                  <Input 
                    id="port" 
                    type="number"
                    value={connectionForm.port}
                    onChange={e => setConnectionForm({...connectionForm, port: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="database">Database Name</Label>
                <Input 
                  id="database" 
                  value={connectionForm.database}
                  onChange={e => setConnectionForm({...connectionForm, database: e.target.value})}
                  placeholder="my_database"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={connectionForm.username}
                  onChange={e => setConnectionForm({...connectionForm, username: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={connectionForm.password}
                  onChange={e => setConnectionForm({...connectionForm, password: e.target.value})}
                />
              </div>
              
              {testResult && (
                <div className={`p-3 rounded-md ${
                  testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {testResult.message}
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleTestConnection}
                disabled={testingConnection}
              >
                {testingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
              <Button 
                type="button" 
                onClick={handleSaveConnection}
              >
                {isEditMode ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Connection</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the connection "{connectionToDelete?.name}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConnection}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Backup Modal */}
        {selectedConnection && (
          <BackupModal 
            isOpen={isBackupModalOpen}
            onClose={() => setIsBackupModalOpen(false)}
            connection={selectedConnection}
            onCreateBackup={handleCreateBackup}
          />
        )}
      </motion.div>
    </Layout>
  );
};

export default Connect;
