'use client';

import { useEffect, useState } from 'react';
import MaintenancePage from './MaintenancePage';

export default function ClientScreenCheck({ children }: { children: React.ReactNode }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Show nothing during SSR
  if (!isMounted) return null;
  
  // Show maintenance page if width > 500px
  if (windowWidth > 500) {
    return <MaintenancePage />;
  }
  
  return <>{children}</>;
}
