
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, HardDrive, ArrowDownToLine, RotateCcw, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { Backup, formatFileSize, formatDuration } from '../utils/backupUtils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BackupCardProps {
  backup: Backup;
  onRestore: (backup: Backup) => void;
  onDelete: (backup: Backup) => void;
  onDownload: (backup: Backup) => void;
}

const BackupCard: React.FC<BackupCardProps> = ({ 
  backup,
  onRestore,
  onDelete,
  onDownload
}) => {
  const [showLogs, setShowLogs] = React.useState(false);
  
  const duration = backup.endTime 
    ? Math.round((backup.endTime.getTime() - backup.startTime.getTime()) / 1000)
    : null;

  return (
    <>
      <motion.div 
        className="glass-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-start justify-between p-6 border-b border-border/30">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <HardDrive className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{backup.name}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(backup.startTime).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {backup.status === 'completed' && (
              <div className="flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </div>
            )}
            {backup.status === 'pending' && (
              <div className="flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </div>
            )}
            {backup.status === 'in_progress' && (
              <div className="flex items-center px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
                <RotateCcw className="w-3 h-3 mr-1 animate-spin" />
                In Progress
              </div>
            )}
            {backup.status === 'failed' && (
              <div className="flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Failed
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">Type:</span>
              <span className="ml-2 font-medium capitalize">{backup.config.type}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">Compression:</span>
              <span className="ml-2 font-medium">{backup.config.compress ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">Storage:</span>
              <span className="ml-2 font-medium capitalize">{backup.config.storageType.replace('_', ' ')}</span>
            </div>
          </div>
          <div className="space-y-2">
            {backup.size && (
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 font-medium">{formatFileSize(backup.size)}</span>
              </div>
            )}
            {duration !== null && (
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-medium">{formatDuration(duration)}</span>
              </div>
            )}
            {backup.error && (
              <div className="flex items-start text-sm">
                <span className="text-destructive font-medium">Error:</span>
                <span className="ml-2 text-destructive">{backup.error}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-muted/30 border-t border-border/30 flex flex-wrap gap-2 justify-between">
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowLogs(true)}
              className="flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(backup)}
              className="text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDownload(backup)}
              disabled={backup.status !== 'completed'}
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              onClick={() => onRestore(backup)}
              size="sm"
              disabled={backup.status !== 'completed'}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={showLogs} onOpenChange={setShowLogs}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Backup Logs</DialogTitle>
            <DialogDescription>
              Detailed logs for backup <span className="font-medium">{backup.name}</span>
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-80 rounded-md border">
            <div className="p-4 space-y-2">
              {backup.logs.map((log, index) => (
                <div key={index} className="text-sm border-l-2 pl-3 py-1 space-y-1" 
                  style={{ 
                    borderColor: log.level === 'error' 
                      ? 'var(--destructive)' 
                      : log.level === 'warning' 
                        ? '#f59e0b' 
                        : 'var(--primary)' 
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span 
                      className={`ml-2 text-xs font-semibold capitalize rounded-full px-2 py-0.5 ${
                        log.level === 'error' 
                          ? 'bg-red-100 text-red-700' 
                          : log.level === 'warning' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {log.level}
                    </span>
                  </div>
                  <div className={log.level === 'error' ? 'text-destructive' : ''}>
                    {log.message}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button onClick={() => setShowLogs(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BackupCard;
