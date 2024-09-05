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
    // Get the current hostname (e.g., "aothun247.vn")
    const hostname = window.location.hostname;

    // Extract the brand based on the hostname (e.g., "aothun247")
    const brand = hostname.split('.')[1];

    // Check if the brand exists in the config
    if (dataRef[brand]) {
      setFavicon(dataRef[brand].favicon);
    } else {
      // Set the default favicon if no brand is found
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
