
export type DatabaseType = 'mysql' | 'postgresql' | 'mongodb' | 'sqlite';

export interface DatabaseConnection {
  id: string;
  name: string;
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  createdAt: Date;
  lastBackupAt: Date | null;
  status: 'connected' | 'disconnected' | 'error';
  error?: string;
}

export interface ConnectionStats {
  totalBackups: number;
  lastBackupDate: Date | null;
  totalBackupSize: number; // in bytes
  averageBackupSize: number; // in bytes
  averageBackupTime: number; // in seconds
}

// Mock function to simulate testing a database connection
export const testDatabaseConnection = async (connection: Omit<DatabaseConnection, 'id' | 'createdAt' | 'lastBackupAt' | 'status'>): Promise<{ success: boolean; message: string }> => {
  // This is a mock function that would typically connect to a database
  // In a real implementation, this would attempt to connect to the database
  
  // Simulate connection delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, randomly succeed or fail
  const success = Math.random() > 0.2;
  
  if (success) {
    return { success: true, message: 'Connection successful!' };
  } else {
    return { 
      success: false, 
      message: [
        'Connection failed. Please check your credentials.',
        'Authentication failed.',
        'Database does not exist.',
        'Connection timeout.',
        'Network error.'
      ][Math.floor(Math.random() * 5)]
    };
  }
};

// Get database type specific default port
export const getDefaultPort = (type: DatabaseType): number => {
  switch (type) {
    case 'mysql':
      return 3306;
    case 'postgresql':
      return 5432;
    case 'mongodb':
      return 27017;
    case 'sqlite':
      return 0; // SQLite doesn't use a port
    default:
      return 0;
  }
};

// Get connection stats
export const getConnectionStats = async (connectionId: string): Promise<ConnectionStats> => {
  // This is a mock function that would typically fetch stats from the server
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    totalBackups: Math.floor(Math.random() * 50),
    lastBackupDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    totalBackupSize: Math.floor(Math.random() * 1024 * 1024 * 1024), // Random size up to 1GB
    averageBackupSize: Math.floor(Math.random() * 500 * 1024 * 1024), // Random size up to 500MB
    averageBackupTime: Math.floor(Math.random() * 300), // Random time up to 300 seconds
  };
};
