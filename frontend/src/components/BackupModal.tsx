
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatabaseConnection } from '../utils/databaseUtils';
import { BackupConfig, BackupType, StorageType } from '../utils/backupUtils';
import { HardDrive, Database, CloudCog } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  connection: DatabaseConnection;
  onCreateBackup: (config: BackupConfig) => void;
}

const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  connection,
  onCreateBackup,
}) => {
  const [backupType, setBackupType] = useState<BackupType>('full');
  const [compress, setCompress] = useState(true);
  const [storageType, setStorageType] = useState<StorageType>('local');
  const [storageLocation, setStorageLocation] = useState('/backups');
  const [scheduledBackup, setScheduledBackup] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('daily');
  const [time, setTime] = useState('00:00');
  const [day, setDay] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    
    const config: BackupConfig = {
      type: backupType,
      compress,
      storageType,
      storageLocation,
    };
    
    if (scheduledBackup) {
      config.schedule = {
        frequency,
        time,
      };
      
      if (frequency === 'weekly') {
        config.schedule.day = parseInt(day);
      } else if (frequency === 'monthly') {
        config.schedule.day = parseInt(day);
      }
    }
    
    // Simulate a delay for better UX
    setTimeout(() => {
      onCreateBackup(config);
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Backup</DialogTitle>
          <DialogDescription>
            Configure backup settings for {connection.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Backup Type</h3>
              <RadioGroup
                value={backupType}
                onValueChange={(value) => setBackupType(value as BackupType)}
                className="grid grid-cols-1 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="flex flex-1 cursor-pointer items-center">
                    <div>
                      <div className="font-medium">Full Backup</div>
                      <div className="text-xs text-muted-foreground">Complete backup of all data</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="incremental" id="incremental" />
                  <Label htmlFor="incremental" className="flex flex-1 cursor-pointer items-center">
                    <div>
                      <div className="font-medium">Incremental Backup</div>
                      <div className="text-xs text-muted-foreground">Only backup changes since last backup</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent">
                  <RadioGroupItem value="differential" id="differential" />
                  <Label htmlFor="differential" className="flex flex-1 cursor-pointer items-center">
                    <div>
                      <div className="font-medium">Differential Backup</div>
                      <div className="text-xs text-muted-foreground">Backup all changes since last full backup</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Compression</h3>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <div className="flex-1">
                  <div className="font-medium">Compress Backup</div>
                  <div className="text-xs text-muted-foreground">Reduce backup size with compression</div>
                </div>
                <Switch 
                  checked={compress} 
                  onCheckedChange={setCompress} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Storage Location</h3>
              <Select 
                value={storageType} 
                onValueChange={(value) => setStorageType(value as StorageType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select storage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local" className="flex items-center">
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
              
              <div className="pt-2">
                <Label htmlFor="location">Storage Path</Label>
                <Input 
                  id="location" 
                  value={storageLocation} 
                  onChange={(e) => setStorageLocation(e.target.value)} 
                  placeholder={storageType === 'local' ? '/path/to/backups' : 'bucket/folder'}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <div className="flex-1">
                  <div className="font-medium">Schedule Backup</div>
                  <div className="text-xs text-muted-foreground">Set up recurring backup schedule</div>
                </div>
                <Switch 
                  checked={scheduledBackup} 
                  onCheckedChange={setScheduledBackup} 
                />
              </div>

              {scheduledBackup && (
                <div className="space-y-3 p-3 rounded-md border">
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={frequency}
                      onValueChange={(value) => setFrequency(value as any)}
                    >
                      <SelectTrigger id="frequency" className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {frequency === 'weekly' && (
                    <div>
                      <Label htmlFor="day">Day of Week</Label>
                      <Select 
                        value={day} 
                        onValueChange={setDay}
                      >
                        <SelectTrigger id="day" className="mt-1">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Sunday</SelectItem>
                          <SelectItem value="1">Monday</SelectItem>
                          <SelectItem value="2">Tuesday</SelectItem>
                          <SelectItem value="3">Wednesday</SelectItem>
                          <SelectItem value="4">Thursday</SelectItem>
                          <SelectItem value="5">Friday</SelectItem>
                          <SelectItem value="6">Saturday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {frequency === 'monthly' && (
                    <div>
                      <Label htmlFor="day">Day of Month</Label>
                      <Select 
                        value={day} 
                        onValueChange={setDay}
                      >
                        <SelectTrigger id="day" className="mt-1">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(31)].map((_, i) => (
                            <SelectItem key={i} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {frequency === 'custom' && (
                    <div>
                      <Label htmlFor="cron">Cron Expression</Label>
                      <Input 
                        id="cron" 
                        placeholder="0 0 * * *"
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Standard cron format: minute hour day-of-month month day-of-week
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create Backup'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackupModal;
