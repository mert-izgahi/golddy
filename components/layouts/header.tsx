import { Store } from '@/lib/generated/prisma'
import React from 'react'
import DateTimeArea from '../shared/date-time'
import LangSwitcher from '../shared/lang-switcher'


function Header({ store }: { store: Store }) {
    return (
        <header className='h-16 border-b flex flex-row items-center px-4'>
            <DateTimeArea />
            <div className="ms-auto">
                <LangSwitcher />
            </div>
        </header>
    )
}

export default Header