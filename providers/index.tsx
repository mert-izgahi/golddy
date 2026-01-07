"use client";

import React from 'react'
import ReactQueryProvider from './react-query-provider';
import { Toaster } from '@/components/ui/sonner';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            {children}
            <Toaster position="top-right" />
        </ReactQueryProvider>
    )
}

export default Providers