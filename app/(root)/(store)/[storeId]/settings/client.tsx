"use client";
import StoreForm from '@/components/forms/store-form';
import { useLangStore } from '@/store/lang-store';
import React from 'react'

interface Props {
    storeId: string
}

function StoreSettingsPage({ storeId }: Props) {
    const { lang } = useLangStore();
    const title = lang === "en" ? "Store Settings" : "اعدادات المتجر";
    const description = lang === "en" ? "Manage your store settings" : "ادارة اعدادات المتجر";
    return (
        <div className="p-4 space-y-6">
            <StoreForm mode="edit" storeId={storeId} />
        </div>
    )
}

export default StoreSettingsPage