import { MediaItem } from "../components/admin/MediaManager";
import { MediaService } from "../services/MediaService";

/**
 * Utility functions for migrating data between the old and new media systems
 */
export const MediaMigration = {
  /**
   * Migrate media items from the old system format to the new system format
   * @param oldMediaItems Media items from the old system
   * @returns Media items in the new system format
   */
  migrateMediaItems: async (oldMediaItems: MediaItem[]): Promise<MediaItem[]> => {
    // In a real implementation, this would transform data between formats as needed
    // For now, we're just simulating the migration by adding the items directly to localStorage
    
    const newMediaItems: MediaItem[] = [];
    
    // Update local storage directly (in a real app, this would call APIs)
    const data = localStorage.getItem('mediaItems');
    const existingItems = data ? JSON.parse(data) : [];
    
    // Add the old items to the existing items
    const updatedItems = [...existingItems, ...oldMediaItems];
    localStorage.setItem('mediaItems', JSON.stringify(updatedItems));
    
    // Return the migrated items
    return oldMediaItems;
  },
  
  /**
   * Import all media from the old system to the new system
   * @returns Promise that resolves when migration is complete
   */
  importAllMedia: async (): Promise<{ success: boolean; count: number; message: string }> => {
    try {
      // In a real implementation, this would fetch data from the old system's API/database
      // For demo purposes, we'll use localStorage to simulate the old system storage
      const oldSystemData = localStorage.getItem('legacy_media_items');
      let oldMediaItems: MediaItem[] = [];
      
      if (oldSystemData) {
        oldMediaItems = JSON.parse(oldSystemData);
      } else {
        // No data to migrate
        return { 
          success: true, 
          count: 0, 
          message: "No legacy media found to import" 
        };
      }
      
      const migratedItems = await MediaMigration.migrateMediaItems(oldMediaItems);
      
      return { 
        success: true, 
        count: migratedItems.length, 
        message: `Successfully imported ${migratedItems.length} media items` 
      };
    } catch (error) {
      console.error("Media migration failed:", error);
      return { 
        success: false, 
        count: 0, 
        message: `Migration failed: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  },
  
  /**
   * Check if there are media items in the old system that need migration
   * @returns Promise that resolves to the number of items that can be migrated
   */
  checkForMigratableMedia: async (): Promise<number> => {
    // In a real implementation, this would query the old system's storage
    const oldSystemData = localStorage.getItem('legacy_media_items');
    
    if (oldSystemData) {
      try {
        const oldMediaItems = JSON.parse(oldSystemData);
        return Array.isArray(oldMediaItems) ? oldMediaItems.length : 0;
      } catch {
        return 0;
      }
    }
    
    return 0;
  }
};
