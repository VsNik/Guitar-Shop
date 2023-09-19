import React from 'react'
import {Header} from './header';
import {Footer} from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="wrapper">

      <Header/>

      <main className="page-content">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
