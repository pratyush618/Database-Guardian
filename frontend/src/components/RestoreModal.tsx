
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { Backup } from '../utils/backupUtils';
import { DatabaseConnection } from '../utils/databaseUtils';

interface RestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  backup: Backup;
  connection: DatabaseConnection;
  onRestore: (backup: Backup, options: RestoreOptions) => void;
}

interface RestoreOptions {
  dropExisting: boolean;
  selectiveRestore: boolean;
  selectedItems: string[];
}

const RestoreModal: React.FC<RestoreModalProps> = ({
  isOpen,
  onClose,
  backup,
  connection,
  onRestore,
}) => {
  const [dropExisting, setDropExisting] = useState(false);
  const [selectiveRestore, setSelectiveRestore] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  // Example items for selective restore (would come from the actual backup in a real implementation)
  const availableItems = [
    'users', 'products', 'orders', 'categories', 'settings', 'customers', 'inventory'
  ];

  const resetState = () => {
    setDropExisting(false);
    setSelectiveRestore(false);
    setSelectedItems([]);
    setConfirmed(false);
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleRestore = () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    
    setLoading(true);
    
    const options = {
      dropExisting,
      selectiveRestore,
      selectedItems
    };
    
    // Simulate a delay for better UX
    setTimeout(() => {
      onRestore(backup, options);
      setLoading(false);
      handleClose();
    }, 1000);
  };

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Restore Backup</DialogTitle>
          <DialogDescription>
            Restore data from backup to {connection.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {!confirmed ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Restoration Options</h3>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <div className="flex-1">
                    <div className="font-medium">Drop Existing Database</div>
                    <div className="text-xs text-muted-foreground">Replace all existing data</div>
                  </div>
                  <Switch 
                    checked={dropExisting} 
                    onCheckedChange={setDropExisting} 
                  />
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <div className="flex-1">
                    <div className="font-medium">Selective Restore</div>
                    <div className="text-xs text-muted-foreground">Choose specific items to restore</div>
                  </div>
                  <Switch 
                    checked={selectiveRestore} 
                    onCheckedChange={setSelectiveRestore} 
                  />
                </div>

                {selectiveRestore && (
                  <div className="pl-3 pt-3 space-y-3">
                    <Label className="text-sm">Select items to restore:</Label>
                    <div className="grid grid-cols-2 gap-3 pl-1">
                      {availableItems.map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`item-${item}`} 
                            checked={selectedItems.includes(item)}
                            onCheckedChange={() => toggleItem(item)}
                          />
                          <Label htmlFor={`item-${item}`} className="text-sm cursor-pointer">
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-md border p-4 bg-amber-50 text-amber-900">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Caution</h4>
                    <p className="text-sm mt-1">
                      Restoring a backup may overwrite existing data. This process cannot be undone.
                      Make sure you have a recent backup of your current data before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border p-4 bg-destructive/10 text-destructive">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Confirm Restoration</h4>
                    <p className="text-sm mt-1">
                      You are about to restore a backup to the database "{connection.database}".
                      {dropExisting && " All existing data will be replaced."}
                      {selectiveRestore && ` Only selected items (${selectedItems.join(', ')}) will be restored.`}
                      <br /><br />
                      <strong>Are you absolutely sure you want to continue?</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleRestore} 
            variant={confirmed ? "destructive" : "default"}
            disabled={loading || (selectiveRestore && selectedItems.length === 0)}
            className="gap-2"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                Restoring...
              </>
            ) : confirmed ? (
              'Confirm Restore'
            ) : (
              'Continue'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreModal;
