import React, { useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import Tahun from '@/Components/Sia/Tahun'
import Kelas from '@/Components/Sia/Kelas'
import Sweet from '@/Components/Sia/Sweet'
import { toast } from 'react-toastify'
import Hapus from '@/Components/Sia/Hapus'
import getSiswa from '@/Functions/getSiswa'
import { trackPromise } from 'react-promise-tracker'

const AturSiswaBoyong = ({ initTahun, listKelas }) => {

    const { data, setData, delete: destroy, errors } = useForm({
        tahun: initTahun,
        kelasId: '',
    })

    const [listSiswa, setListSiswa] = useState([])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    async function getDataSiswa() {
        const response = await getSiswa(data.tahun, data.kelasId)
        setListSiswa(response.listSiswa)
    }

    const handleDelete = (nis) => {
        Sweet.fire({
            title: 'Anda yakin?',
            text: "Boyong Siswa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Yakin!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route('atur-siswa-boyong.hapus',
                        {
                            nis: nis,
                            tahun: data.tahun,
                            kelasId: data.kelasId
                        }),
                        {
                            onSuccess: (page) => {
                                toast.success('Berhasil Boyong Siswa')
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
            <Head title='Atur Siswa Boyong' />

            <div className="lg:grid lg:grid-cols-6 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2">

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
                                        onClick={() => handleDelete(siswa.nis)}
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
AturSiswaBoyong.layout = page => <AppLayout children={page} />
export default AturSiswaBoyong