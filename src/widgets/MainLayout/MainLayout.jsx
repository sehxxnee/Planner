import React from 'react';
import { NavigationBar } from '../NavigationBar/NavigationBar';

export const MainLayout = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f8f9fa'
    }}>
      <NavigationBar />
      <main style={{ 
        flex: 1, 
        padding: '20px',
        marginTop: '80px',
        maxWidth: '1200px',
        width: '100%',
        margin: '80px auto 0'
      }}>
        {children}
      </main>
    </div>
  );
}; 