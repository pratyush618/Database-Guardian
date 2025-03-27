import { DatabaseConnection, DatabaseType } from './databaseUtils';

export type BackupType = 'full' | 'incremental' | 'differential';
export type BackupStatus = 'pending' | 'in_progress' | 'completed' | 'failed';
export type StorageType = 'local' | 'aws_s3' | 'google_cloud' | 'azure_blob';

export interface BackupConfig {
  type: BackupType;
  compress: boolean;
  storageType: StorageType;
  storageLocation: string;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    time?: string; // HH:MM format
    day?: number; // 0-6 for weekly (0 = Sunday), 1-31 for monthly
    customExpression?: string; // For custom cron expressions
  };
}

export interface Backup {
  id: string;
  connectionId: string;
  name: string;
  config: BackupConfig;
  status: BackupStatus;
  startTime: Date;
  endTime?: Date;
  size?: number; // in bytes
  path?: string;
  error?: string;
  logs: BackupLog[];
}

export interface BackupLog {
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
}

// Format file size in human-readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format duration in human-readable format
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min${minutes !== 1 ? 's' : ''} ${remainingSeconds} sec${remainingSeconds !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} min${remainingMinutes !== 1 ? 's' : ''}`;
  }
};

// Mock function to simulate creating a backup
export const createBackup = async (
  connection: DatabaseConnection,
  config: BackupConfig
): Promise<{ success: boolean; backup: Backup; message: string }> => {
  // Generate a unique ID
  const backupId = Math.random().toString(36).substring(2, 15);
  
  // Create a new backup
  const backup: Backup = {
    id: backupId,
    connectionId: connection.id,
    name: `Backup_${connection.name}_${new Date().toISOString().replace(/:/g, '-')}`,
    config,
    status: 'in_progress',
    startTime: new Date(),
    logs: [
      {
        timestamp: new Date(),
        level: 'info',
        message: 'Starting backup process...'
      }
    ]
  };
  
  // Simulate backup process
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // 10% chance of failure for demo purposes
  const failed = Math.random() < 0.1;
  
  if (failed) {
    backup.status = 'failed';
    backup.endTime = new Date();
    backup.error = 'Failed to create backup. Database server connection lost.';
    backup.logs.push({
      timestamp: new Date(),
      level: 'error',
      message: backup.error
    });
    
    return {
      success: false,
      backup,
      message: backup.error
    };
  }
  
  // Success case
  backup.status = 'completed';
  backup.endTime = new Date();
  backup.size = Math.floor(Math.random() * 500 * 1024 * 1024); // Random size up to 500MB
  backup.path = `/backups/${backup.name}.${config.compress ? 'gz' : 'sql'}`;
  
  backup.logs.push(
    {
      timestamp: new Date(backup.startTime.getTime() + 1000),
      level: 'info',
      message: `Connected to ${connection.type} database at ${connection.host}:${connection.port}`
    },
    {
      timestamp: new Date(backup.startTime.getTime() + 2000),
      level: 'info',
      message: `Starting ${config.type} backup of database ${connection.database}`
    },
    {
      timestamp: new Date(backup.startTime.getTime() + 3000),
      level: 'info',
      message: config.compress 
        ? 'Compressing backup data...' 
        : 'Skipping compression as per configuration'
    },
    {
      timestamp: backup.endTime,
      level: 'info',
      message: `Backup completed successfully. Size: ${formatFileSize(backup.size)}`
    }
  );
  
  return {
    success: true,
    backup,
    message: 'Backup created successfully!'
  };
};

// Mock function to simulate restoring a backup
export const restoreBackup = async (
  connection: DatabaseConnection,
  backup: Backup
): Promise<{ success: boolean; message: string }> => {
  // Simulate restore process
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 5000));
  
  // 15% chance of failure for demo purposes
  const failed = Math.random() < 0.15;
  
  if (failed) {
    return {
      success: false,
      message: 'Failed to restore backup. Database server error.'
    };
  }
  
  return {
    success: true,
    message: 'Backup restored successfully!'
  };
};

// Re-export DatabaseConnection from databaseUtils
export type { DatabaseConnection };
