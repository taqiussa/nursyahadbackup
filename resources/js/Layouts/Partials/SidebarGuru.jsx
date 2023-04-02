import React from 'react'
import SidebarLink from '@/Components/Sia/SidebarLink'
export default function SidebarGuru({ closeSide }) {
    return (
        <div className='py-1'>
            <div className='text-slate-600 font-bold'>
                Guru
            </div>
            <div>
                <SidebarLink closeSide={closeSide} href={route('dashboard')} active={route().current('dashboard')} label='dashboard' />
            </div>
        </div>
    )
}
