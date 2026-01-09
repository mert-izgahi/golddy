"use client";
import { useGetProfileQuery } from '@/hooks/use-profile';
import React from 'react'

function CreateStorePage() {
    const { data: profile, isLoading } = useGetProfileQuery();
    return (
        <div>
            Create Store Page
        </div>
    )
}

export default CreateStorePage