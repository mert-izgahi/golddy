"use client";
import { useLangStore } from '@/store/lang-store';
import React, { useEffect } from 'react'

function layout({ children }: { children: React.ReactNode }) {
    const { lang } = useLangStore()
    
    // Change the direction and lang based on the selected language
    useEffect(() => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang
    }, [lang]);


    return (
        <div>
            {children}
        </div>
    )
}

export default layout