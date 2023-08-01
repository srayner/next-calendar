
'use client'

import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import TitleBar from './components/title-bar/TitleBar';
import SideBar from './components/side-bar/SideBar';
import Modal from './components/modal/Modal';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const ModalContext = React.createContext();

export default function RootLayout({ children }) {
    
    const [modalState, setModalState] = useState({isOpen: false});

    function openModal(type) {
        setModalState({...modalState, isOpen: true, type});
    }

    function closeModal() {
        setModalState({...modalState, isOpen: false});
    }

    const context = {
        isOpen: modalState.isOpen,
        openModal,
        closeModal
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <ModalContext.Provider value={context}>
                    <TitleBar />
                    <div className={'content-container'}>
                        <SideBar/>
                        <div className={'content'}>{children}</div>
                    </div>
                    <Modal eventType={modalState.type}/>
                </ModalContext.Provider>
            </body>
        </html>
    );
}
