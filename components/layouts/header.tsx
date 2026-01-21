"use client"
import { Store } from '@/lib/generated/prisma/client'
import DateTimeArea from '../shared/date-time'
import UserButton from '../buttons/user-button'
import LangSwitcher from '../shared/lang-switcher'



function Header({ store }: { store: Store }) {
    return (
        <header className='h-16 border-b flex flex-row items-center px-4'>
            <div className="flex items-center space-x-2">
                <DateTimeArea />
            </div>
            <div className="ms-auto flex items-center space-x-4">
                <LangSwitcher />
                <UserButton storeId={store.id} />
            </div>
        </header>
    )
}

export default Header