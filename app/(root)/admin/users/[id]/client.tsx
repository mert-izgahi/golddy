"use client";
import { UserForm } from '@/components/forms/user-form';

function EditUserPage({ userId }: { userId: string }) {
    return (
        <div>
            <UserForm mode='edit' userId={userId} />
        </div>
    )
}

export default EditUserPage