"use client";
import CreateStoreForm from '@/components/forms/create-store-form';
import { useGetProfileQuery } from '@/hooks/use-profile';
import React from 'react'

function CreateStorePage() {
    const { data: profile, isLoading } = useGetProfileQuery();
    return (
        <div>
            <CreateStoreForm />
        </div>
    )
}

export default CreateStorePage