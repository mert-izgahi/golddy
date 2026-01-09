"use client";

import React, { useEffect, useState } from 'react'
import ReactQueryProvider from './react-query-provider';
import { Toaster } from '@/components/ui/sonner';

function Providers({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, [hasMounted]);

    if (!hasMounted) {
        return null;
    }
    return (
        <ReactQueryProvider>
            {children}
            <Toaster />
        </ReactQueryProvider>
    )
}

export default Providers