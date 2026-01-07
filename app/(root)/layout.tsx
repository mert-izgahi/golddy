"use client";
import React, { useEffect } from 'react'
import { useLang } from '@/hooks/use-lang'

function layout({ children }: { children: React.ReactNode }) {
    const { lang } = useLang()
    
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