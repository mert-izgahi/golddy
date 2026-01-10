import React from 'react'
import Logo from '../shared/logo'
import SignoutButton from '../buttons/sign-out-button'
import LangSwitcher from '../shared/lang-switcher'

function AdminHeader() {
    return (
        <header className='w-full h-16 border-b flex items-center px-4 md:px-6'>
            <Logo />
            <div className="ms-auto flex items-center gap-2 flex-1 justify-end">
                <LangSwitcher />
                <div>
                    <SignoutButton />
                </div>
            </div>
        </header>
    )
}

export default AdminHeader