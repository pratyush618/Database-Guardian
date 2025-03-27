
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { DatabaseConnection, ConnectionStats, getConnectionStats } from '../utils/databaseUtils';
import { formatFileSize, formatDuration } from '../utils/backupUtils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DatabaseCardProps {
  connection: DatabaseConnection;
  onBackup: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DatabaseCard: React.FC<DatabaseCardProps> = ({ 
  connection,
  onBackup,
  onEdit,
  onDelete
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState<ConnectionStats | null>(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const connectionStats = await getConnectionStats(connection.id);
        setStats(connectionStats);
      } catch (error) {
        console.error("Failed to fetch connection stats:", error);
        toast({
          title: "Error",
          description: "Failed to fetch connection statistics.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [connection.id, toast]);

  const getDatabaseIcon = () => {
    switch (connection.type) {
      case 'mysql':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'postgresql':
        return <Database className="h-5 w-5 text-indigo-500" />;
      case 'mongodb':
        return <Database className="h-5 w-5 text-green-500" />;
      case 'sqlite':
        return <Database className="h-5 w-5 text-yellow-500" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  return (
    <motion.div 
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between p-6 border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            {getDatabaseIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg">{connection.name}</h3>
            <p className="text-sm text-muted-foreground">
              {connection.type} • {connection.host}:{connection.port}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {connection.status === 'connected' && (
            <div className="flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </div>
          )}
          {connection.status === 'disconnected' && (
            <div className="flex items-center px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              Disconnected
            </div>
          )}
          {connection.status === 'error' && (
            <div className="flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              Error
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Server className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">Database:</span>
              <span className="ml-2 font-medium">{connection.database}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">Last backup:</span>
              <span className="ml-2 font-medium">
                {connection.lastBackupAt 
                  ? new Date(connection.lastBackupAt).toLocaleString() 
                  : 'Never'}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {stats ? (
              <>
                <div className="text-sm">
                  <span className="text-muted-foreground">Total backups:</span>
                  <span className="ml-2 font-medium">{stats.totalBackups}</span>
                </div>
                {stats.averageBackupSize > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Avg. size:</span>
                    <span className="ml-2 font-medium">{formatFileSize(stats.averageBackupSize)}</span>
                  </div>
                )}
                {stats.averageBackupTime > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Avg. time:</span>
                    <span className="ml-2 font-medium">{formatDuration(stats.averageBackupTime)}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="h-12 flex items-center justify-center">
                {loading ? (
                  <div className="text-sm text-muted-foreground">Loading stats...</div>
                ) : (
                  <div className="text-sm text-muted-foreground">No statistics available</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-muted/30 border-t border-border/30 flex justify-between">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive">
            Delete
          </Button>
        </div>
        <Button onClick={onBackup} size="sm">
          Backup Now
        </Button>
      </div>
    </motion.div>
  );
};

export default DatabaseCard;
