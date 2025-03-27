import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, RotateCcw, Search } from 'lucide-react';
import Layout from '../components/Layout';
import BackupCard from '../components/BackupCard';
import RestoreModal from '../components/RestoreModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { 
  Backup, 
  BackupStatus, 
  restoreBackup,
  DatabaseConnection 
} from '../utils/backupUtils';

const mockDatabases: DatabaseConnection[] = [
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

const generateMockBackups = (): Backup[] => {
  const statuses: BackupStatus[] = ['completed', 'pending', 'in_progress', 'failed'];
  const backups: Backup[] = [];
  
  for (let i = 0; i < 10; i++) {
    const connectionId = mockDatabases[Math.floor(Math.random() * mockDatabases.length)].id;
    const connection = mockDatabases.find(db => db.id === connectionId)!;
    const status = statuses[Math.floor(Math.random() * (i < 7 ? 1 : statuses.length))];
    const startTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    let endTime = status === 'completed' || status === 'failed' 
      ? new Date(startTime.getTime() + (Math.random() * 60 * 60 * 1000)) 
      : undefined;
    
    const backup: Backup = {
      id: `backup-${i + 1}`,
      connectionId,
      name: `Backup_${connection.name}_${startTime.toISOString().substring(0, 10)}`,
      config: {
        type: Math.random() > 0.3 ? 'full' : (Math.random() > 0.5 ? 'incremental' : 'differential'),
        compress: Math.random() > 0.2,
        storageType: Math.random() > 0.7 ? 'aws_s3' : 'local',
        storageLocation: Math.random() > 0.7 ? 's3://backups/database' : '/var/backups'
      },
      status,
      startTime,
      endTime,
      size: status === 'completed' ? Math.floor(Math.random() * 500 * 1024 * 1024) : undefined,
      path: status === 'completed' ? `/backups/backup-${i + 1}.sql.gz` : undefined,
      error: status === 'failed' ? 'Database connection lost during backup' : undefined,
      logs: [
        {
          timestamp: startTime,
          level: 'info',
          message: 'Starting backup process...'
        },
        {
          timestamp: new Date(startTime.getTime() + 1000),
          level: 'info',
          message: `Connected to ${connection.type} database at ${connection.host}`
        }
      ]
    };
    
    if (status === 'completed') {
      backup.logs.push({
        timestamp: endTime!,
        level: 'info',
        message: 'Backup completed successfully'
      });
    } else if (status === 'failed') {
      backup.logs.push({
        timestamp: endTime!,
        level: 'error',
        message: backup.error!
      });
    }
    
    backups.push(backup);
  }
  
  return backups.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
};

const Backups = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [filteredBackups, setFilteredBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BackupStatus | 'all'>('all');
  const [databaseFilter, setDatabaseFilter] = useState<string>('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [backupToDelete, setBackupToDelete] = useState<Backup | null>(null);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [backupToRestore, setBackupToRestore] = useState<Backup | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockBackups = generateMockBackups();
      setBackups(mockBackups);
      setFilteredBackups(mockBackups);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, databaseFilter, backups]);

  const applyFilters = () => {
    let filtered = [...backups];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(backup => 
        backup.name.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(backup => backup.status === statusFilter);
    }
    
    if (databaseFilter !== 'all') {
      filtered = filtered.filter(backup => backup.connectionId === databaseFilter);
    }
    
    setFilteredBackups(filtered);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDatabaseFilter('all');
    setFilteredBackups(backups);
    setIsFilterModalOpen(false);
  };

  const handleOpenDeleteModal = (backup: Backup) => {
    setBackupToDelete(backup);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteBackup = () => {
    if (backupToDelete) {
      setBackups(backups.filter(b => b.id !== backupToDelete.id));
      setFilteredBackups(filteredBackups.filter(b => b.id !== backupToDelete.id));
      
      toast({
        title: "Backup Deleted",
        description: `${backupToDelete.name} has been deleted.`
      });
      
      setIsDeleteModalOpen(false);
      setBackupToDelete(null);
    }
  };

  const handleOpenRestoreModal = (backup: Backup) => {
    setBackupToRestore(backup);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreBackup = async (backup: Backup, options: any) => {
    const connection = mockDatabases.find(db => db.id === backup.connectionId);
    
    if (connection) {
      toast({
        title: "Restore Started",
        description: `Restoring ${backup.name} to ${connection.name}...`
      });
      
      try {
        const result = await restoreBackup(connection, backup);
        
        if (result.success) {
          toast({
            title: "Restore Completed",
            description: result.message
          });
        } else {
          toast({
            title: "Restore Failed",
            description: result.message,
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Restore Failed",
          description: "An unexpected error occurred during the restore process.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDownloadBackup = (backup: Backup) => {
    toast({
      title: "Download Started",
      description: `Downloading ${backup.name}...`
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${backup.name} has been downloaded.`
      });
    }, 2000);
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
              Backup History
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              View and manage your database backups
            </motion.p>
          </div>
          <motion.div 
            className="w-full md:w-auto mt-6 md:mt-0 flex flex-col sm:flex-row gap-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search backups..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={() => setIsFilterModalOpen(true)} className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-card animate-pulse rounded-xl shadow-sm border"></div>
            ))}
          </div>
        ) : filteredBackups.length === 0 ? (
          <motion.div 
            className="text-center py-16 glass-panel"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RotateCcw className="h-12 w-12 text-muted-foreground/60 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Backups Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {backups.length === 0 
                ? "You haven't created any backups yet."
                : "No backups match your current filters."
              }
            </p>
            {backups.length === 0 ? (
              <Button asChild>
                <a href="/connect">Create Your First Backup</a>
              </Button>
            ) : (
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredBackups.map((backup, index) => (
              <motion.div 
                key={backup.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <BackupCard 
                  backup={backup}
                  onRestore={() => handleOpenRestoreModal(backup)}
                  onDelete={() => handleOpenDeleteModal(backup)}
                  onDownload={() => handleDownloadBackup(backup)}
                />
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Backup</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the backup "{backupToDelete?.name}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteBackup}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Backups</DialogTitle>
              <DialogDescription>
                Filter your backups by status and database
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={statusFilter} 
                  onValueChange={(value) => setStatusFilter(value as any)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="database">Database</Label>
                <Select 
                  value={databaseFilter} 
                  onValueChange={setDatabaseFilter}
                >
                  <SelectTrigger id="database">
                    <SelectValue placeholder="Filter by database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Databases</SelectItem>
                    {mockDatabases.map(db => (
                      <SelectItem key={db.id} value={db.id}>{db.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleResetFilters}>
                Reset
              </Button>
              <Button onClick={() => setIsFilterModalOpen(false)}>
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {backupToRestore && (
          <RestoreModal 
            isOpen={isRestoreModalOpen}
            onClose={() => setIsRestoreModalOpen(false)}
            backup={backupToRestore}
            connection={mockDatabases.find(db => db.id === backupToRestore.connectionId)!}
            onRestore={handleRestoreBackup}
          />
        )}
      </motion.div>
    </Layout>
  );
};

export default Backups;
