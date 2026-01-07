"use client";
import LangSwitcher from '@/components/shared/lang-switcher'
import Logo from '@/components/shared/logo'
import { useLang } from '@/hooks/use-lang';
import { PropsWithChildren } from 'react'

function layout({ children }: PropsWithChildren) {

    const { lang } = useLang();
    const welcomeMessage = lang === 'en' ? "Welcome to Gold Store Management System" : "مرحباً بك في نظام إدارة متجر الذهب";
    const subtitle = lang === 'en' ? "Please log in to continue." : "يرجى تسجيل الدخول للمتابعة.";
    const contactInfo = lang === 'en' ? "For assistance, contact support@example.com" : "للحصول على المساعدة، اتصل بـ support@example.com";
    return (
        <div className="grid grid-cols-2 gap-0">
            <div className='col-span-4 md:col-span-2 lg:col-span-1 min-h-screen flex flex-col justify-center items-center p-8 bg-neutral-50 border-r'>
                <div className='absolute top-4 right-4'>
                    <LangSwitcher />
                </div>
                <div className='mb-8'>
                    <Logo />
                </div>
                <div className="flex flex-col space-y-2">
                    <h1 className='text-2xl font-bold'>{welcomeMessage}</h1>
                    <p className='text-sm text-neutral-600'>{subtitle}</p>
                </div>
                <div className='w-full'>
                    {children}
                </div>

                <div className='flex items-center justify-start'>
                    <p className='text-xs text-neutral-500'>{contactInfo}</p>
                </div>
            </div>

            <div className='col-span-2 md:col-span-2 bg-teal-900 lg:col-span-1 min-h-screen flex flex-col justify-center items-center p-8 border-r'>
                {/* You can add an image or illustration here for the auth layout */}
                <div className='w-full h-full flex items-center justify-center'>
                    <img src="/auth-illustration.svg" alt="Auth Illustration" className='max-w-full max-h-full object-contain' />
                </div>
            </div>
        </div>
    )
}

export default layout