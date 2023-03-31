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
                <SidebarLink closeSide={closeSide} href={route('absensi')} active={route().current('absensi')} label='absensi' />
                <SidebarLink closeSide={closeSide} href={route('input-deskripsi-ekstrakurikuler')} active={route().current('input-deskripsi-ekstrakurikuler')} label='input deskripsi ekstrakurikuler' />
                <SidebarLink closeSide={closeSide} href={route('input-kd')} active={route().current('input-kd')} label='input KD / TP' />
                <SidebarLink closeSide={closeSide} href={route('input-kkm')} active={route().current('input-kkm')} label='input KKM' />
                <SidebarLink closeSide={closeSide} href={route('input-nilai')} active={route().current('input-nilai')} label='input nilai' />
                <SidebarLink closeSide={closeSide} href={route('input-nilai-ekstrakurikuler')} active={route().current('input-nilai-ekstrakurikuler')} label='input nilai ekstrakurikuler' />
                {/* <SidebarLink closeSide={closeSide} href={route('input-nilai-sikap')} active={route().current('input-nilai-sikap')} label='input nilai sikap' /> */}
                <SidebarLink closeSide={closeSide} href={route('input-skor')} active={route().current('input-skor')} label='input skor' />
                <SidebarLink closeSide={closeSide} href={route('pendaftaran-ekstrakurikuler')} active={route().current('pendaftaran-ekstrakurikuler')} label='pendaftaran ekstrakurikuler' />
                <SidebarLink closeSide={closeSide} href={route('print-absensi')} active={route().current('print-absensi')} label='print absensi' />
                <SidebarLink closeSide={closeSide} href={route('upload-nilai')} active={route().current('upload-nilai')} label='upload nilai' />
                {/* <SidebarLink closeSide={closeSide} href={route('upload-nilai-sikap')} active={route().current('upload-nilai-sikap')} label='upload nilai sikap' /> */}
            </div>
            <div className='text-slate-600 font-bold mt-2'>
                Wali Kelas
            </div>
            <div>
                <SidebarLink closeSide={closeSide} href={route('input-catatan')} active={route().current('input-catatan')} label='input catatan' />
                <SidebarLink closeSide={closeSide} href={route('print-rapor')} active={route().current('print-rapor')} label='print rapor' />
                <SidebarLink closeSide={closeSide} href={route('rekap-skor-wali-kelas')} active={route().current('rekap-skor-wali-kelas')} label='rekap skor' />
            </div>
        </div>
    )
}
