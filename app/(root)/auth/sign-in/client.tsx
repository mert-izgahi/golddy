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

function SignInPage() {
    const { lang } = useLang();
    const signInSchema = getSignInSchema(lang);
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: SignInInput) => {
        console.log(data);
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
                        {lang === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SignInPage