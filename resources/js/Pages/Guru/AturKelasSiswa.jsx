import React, { useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import Tahun from '@/Components/Sia/Tahun'
import Kelas from '@/Components/Sia/Kelas'
import Siswa from '@/Components/Sia/Siswa'
import Sweet from '@/Components/Sia/Sweet'
import PrimaryButton from '@/Components/Breeze/PrimaryButton'
import { toast } from 'react-toastify'
import Hapus from '@/Components/Sia/Hapus'
import getSiswa from '@/Functions/getSiswa'
import { trackPromise } from 'react-promise-tracker'

const AturKelasSiswa = ({ initTahun, listKelas, listSiswaBelum }) => {

    const { data, setData, post, delete: destroy, errors } = useForm({
        tahun: initTahun,
        kelasId: '',
        nis: ''
    })

    const [listSiswa, setListSiswa] = useState([])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    async function getDataSiswa() {
        const response = await getSiswa(data.tahun, data.kelasId)
        setListSiswa(response.listSiswa)
    }

    const handleDelete = (id) => {
        Sweet.fire({
            title: 'Anda yakin menghapus?',
            text: "Hapus Siswa Kelas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route('atur-kelas-siswa.hapus',
                        {
                            id: id
                        }),
                        {
                            onSuccess: (page) => {
                                toast.success('Berhasil Hapus Siswa Kelas')
                                setData({
                                    tahun: data.tahun,
                                    kelasId: data.kelasId,
                                })

                                getDataSiswa()
                                
                            }
                        })
                }
            })
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('atur-kelas-siswa.simpan'), {
            onSuccess: (page) => {
                toast.success('Berhasil Atur Kelas Siswa')
                setData({
                    tahun: data.tahun,
                    kelasId: data.kelasId,
                })

                getDataSiswa()

            },
            onError: (error) => {
                Sweet.fire({
                    title: 'Gagal!',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'Kembali'
                })
            }
        })
    }

    useEffect(() => {

        if (data.tahun && data.kelasId
        ) {

            trackPromise(

                getDataSiswa()

            )

        }
        else {
            setListSiswa([])
        }
    }, [data.tahun, data.kelasId])

    return (
        <>
            <Head title='Atur Kelas Siswa' />
            <form onSubmit={submit} className='space-y-5 mt-10 mb-10'>

                <div className="lg:grid lg:grid-cols-6 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2">
                    <div className="lg:col-span-2">

                        <Siswa
                            id="nis"
                            name="nis"
                            value={data.nis}
                            message={errors.nis}
                            listSiswa={listSiswaBelum}
                            handleChange={onHandleChange}
                        />

                    </div>

                    <Tahun
                        id="tahun"
                        name="tahun"
                        value={data.tahun}
                        message={errors.tahun}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <Kelas
                        id="kelasId"
                        name="kelasId"
                        value={data.kelasId}
                        message={errors.kelasId}
                        isFocused={true}
                        listKelas={listKelas}
                        handleChange={onHandleChange}
                    />

                </div>
                <div className="flex justify-end">
                    <PrimaryButton onClick={submit}>
                        Simpan
                    </PrimaryButton>
                </div>
            </form>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-600">
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            <th scope='col' className="py-3 px-2">
                                No
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Nama
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSiswa && listSiswa.map((siswa, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {siswa.user?.name}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    <Hapus
                                        onClick={() => handleDelete(siswa.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
AturKelasSiswa.layout = page => <AppLayout children={page} />
export default AturKelasSiswa