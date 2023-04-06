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
                <SidebarLink closeSide={closeSide} href={route('atur-kelas-siswa')} active={route().current('atur-kelas-siswa')} label='atur kelas siswa' />
                <SidebarLink closeSide={closeSide} href={route('atur-naik-kelas')} active={route().current('atur-naik-kelas')} label='atur naik kelas' />
                <SidebarLink closeSide={closeSide} href={route('atur-pindah-kelas')} active={route().current('atur-pindah-kelas')} label='atur pindah kelas' />
                <SidebarLink closeSide={closeSide} href={route('atur-siswa-pondok')} active={route().current('atur-siswa-pondok')} label='atur siswa pondok' />
                <SidebarLink closeSide={closeSide} href={route('data-siswa')} active={route().current('data-siswa')} label='data siswa' />
                <SidebarLink closeSide={closeSide} href={route('data-siswa-pondok')} active={route().current('data-siswa-pondok')} label='data siswa pondok' />
                <SidebarLink closeSide={closeSide} href={route('tambah-siswa')} active={route().current('tambah-siswa')} label='tambah siswa' />
            </div>
        </div>
    )
}
