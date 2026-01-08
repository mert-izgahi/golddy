"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Globe2 } from 'lucide-react'
import { useLangStore } from '@/store/lang-store'
function LangSwitcher() {
    const { lang, setLang } = useLangStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} className='px-4 py-2 border rounded'>
                    <Globe2 className='mr-2' />
                    {lang === 'en' ? 'English' : 'العربية'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ar')}>
                    العربية
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LangSwitcher