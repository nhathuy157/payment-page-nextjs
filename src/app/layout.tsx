"use client";
import { useEffect, useState } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import dataRef from '@/app/Config/config'; // Import your config file

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [favicon, setFavicon] = useState<string>('/favicon.ico'); // Default favicon

  useEffect(() => {
    const hostname = window.location.hostname;
    const hostnameParts = hostname.split('.');
    console.log('Hostname:', hostname);
    console.log('Hostname Parts:', hostnameParts);
  
    if (hostnameParts[0] === 'donhang' && hostnameParts.length >= 3) {
      const brand = hostnameParts[1];
      console.log('Brand:', brand);
  
      if (dataRef[brand]) {
        setFavicon(dataRef[brand].favicon);
      } else {
        setFavicon(dataRef.default.favicon);
      }
    } else {
      setFavicon(dataRef.default.favicon);
    }
  }, []);
  

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon} /> {/* Set the dynamic favicon */}
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
