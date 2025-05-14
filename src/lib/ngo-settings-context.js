'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const NGOSettingsContext = createContext();

export function NGOSettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    name: 'Animal Welfare NGO',
    colors: {
      main: '#4CAF50',
      base: '#FFFFFF',
      secondary: '#2196F3',
    },
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/settings');
        
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
          
          // Apply colors as CSS variables
          if (data.colors) {
            document.documentElement.style.setProperty('--color-primary', data.colors.main);
            document.documentElement.style.setProperty('--color-primary-light', adjustColor(data.colors.main, 20));
            document.documentElement.style.setProperty('--color-primary-dark', adjustColor(data.colors.main, -20));
            
            if (data.colors.secondary) {
              document.documentElement.style.setProperty('--color-secondary', data.colors.secondary);
            }
          }
          
          document.title = data.name || 'Animal Welfare NGO';
        }
      } catch (error) {
        console.error('Failed to load NGO settings:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadSettings();
  }, []);
  
  // Helper function to adjust color brightness
  function adjustColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    
    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent * 2.55));
    g = Math.max(0, Math.min(255, g + percent * 2.55));
    b = Math.max(0, Math.min(255, b + percent * 2.55));
    
    // Convert back to hex
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  }
  
  return (
    <NGOSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </NGOSettingsContext.Provider>
  );
}

export function useNGOSettings() {
  return useContext(NGOSettingsContext);
}
