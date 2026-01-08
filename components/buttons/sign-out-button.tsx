"use client";

import { useSignOutMutation } from '@/hooks/use-auth';
import { useLangStore } from '@/store/lang-store';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function SignoutButton() {
    const { lang } = useLangStore();
    const { mutate: signOut, isPending } = useSignOutMutation();
    const router = useRouter();
    const handleSignOut = async() => {
        await signOut();
        router.refresh();
        router.push('/auth/sign-in');
    }
    return (
        <Button type='button' variant='destructive' className='w-full flex items-center justify-center gap-2 cursor-pointer' onClick={handleSignOut} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {lang === "en" ? "Sign Out" : lang === "ar" ? "تسجيل الخروج" : "Sign Out"}
        </Button>
    )
}

export default SignoutButton