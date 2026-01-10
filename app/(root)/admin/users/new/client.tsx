"use client";
import { UserForm } from '@/components/forms/user-form';
import React from 'react'

function NewUserPage() {
    return (
        <div>
            <UserForm mode='create' />
        </div>
    )
}

export default NewUserPage