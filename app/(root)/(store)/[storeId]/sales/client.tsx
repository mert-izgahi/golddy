"use client";
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/lang-store'
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface Props {
    storeId: string
}

function SalesPage({ storeId }: Props) {
    const { lang } = useLangStore();
    const title = lang === "en" ? "Sales List" : "قائمة المبيعات";
    const description = lang === "en" ? "Manage and track your daily sales transactions." : "إدارة وتتبع معاملات المبيعات اليومية الخاصة بك.";
    return (
        <div className='p-4'>
            {/* Page Header */}
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <Button asChild className='bg-teal-800 hover:bg-teal-800/80 text-white'>
                    <Link href={`/${storeId}/sales/new`}>
                        <Plus className='mr-2 h-4 w-4' />
                        {lang === "en" ? "New Sale" : "بيع جديد"}
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default SalesPage