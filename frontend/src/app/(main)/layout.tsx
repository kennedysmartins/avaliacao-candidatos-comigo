
import Breadcrumbs from '@/components/Breadcrumbs';
import NavBar from '@/components/NavBar';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="main-layout">
        <NavBar/>
        <Breadcrumbs/>
      {children}
    </div>
  );
}
