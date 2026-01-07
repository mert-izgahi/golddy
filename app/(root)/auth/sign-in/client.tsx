"use client";

import { getSignInSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLang } from '@/hooks/use-lang';
import { useForm } from 'react-hook-form';
import { SignInInput } from '@/lib/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/inputs/password-input';
import { useSignInMutation } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SignInPage() {
    const { lang } = useLang();
    const signInSchema = getSignInSchema(lang);
    const { mutate, isPending } = useSignInMutation();

    const router = useRouter();
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: SignInInput) => {
        await mutate(data, {
            onSuccess: () => {
                form.reset();
                toast.success(lang === 'en' ? 'Signed in successfully!' : 'تم تسجيل الدخول بنجاح!');
                router.refresh();
            },
            onError: (error) => {
                console.error("Sign-in error:", error);
                toast.error(lang === 'en' ? 'Sign-in failed. Please check your credentials.' : 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.');
            },
        });
    };


    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6 p-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{lang === 'en' ? 'Email' : 'البريد الإلكتروني'}</FormLabel>
                                <FormControl>
                                    <Input placeholder={lang === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{lang === 'en' ? 'Password' : 'كلمة المرور'}</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder={lang === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="brand" className="w-full cursor-pointer">
                        {
                            isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        }
                        {lang === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SignInPage