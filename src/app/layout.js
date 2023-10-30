'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from './sidebar';
import { usePathname } from 'next/navigation';
import ModalManager from './post/new/modalManager';
import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const pathname = usePathname();
  const showHeader = pathname === '/users/signup' || pathname === '/users/login' || pathname === '/users/profileimage' ? false : true;
  return (
    <html lang="en">
      <body className={inter.className}>
        {showHeader && <Sidebar openModal={handleOpenModal} />}
        <section className="main">
          {children}
        </section>
        <ModalManager isOpen={modalIsOpen} onClose={handleCloseModal} />
      </body>
    </html>
  );
}
