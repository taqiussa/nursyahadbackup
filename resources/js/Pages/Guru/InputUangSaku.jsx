import React, { useEffect, useState } from 'react'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import { trackPromise } from 'react-promise-tracker'
import Sweet from '@/Components/Sia/Sweet'
import Hapus from '@/Components/Sia/Hapus'
import PrimaryButton from '@/Components/Breeze/PrimaryButton'
import { toast } from 'react-toastify'
import getUangSaku from '@/Functions/getUangSaku'
import moment from 'moment/moment'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Tanggal from '@/Components/Sia/Tanggal'
import getUser from '@/Functions/getUser'
import getUangSaku from '@/Functions/getUangSaku'

const InputUangSaku = ({ initTahun, initSemester }) => {

    const { auth } = usePage().props

    const { data, setData, post, errors } = useForm({
        tahun: initTahun,
        semester: initSemester,
        tanggal: moment(new Date()).format('YYYY-MM-DD'),
        jumlah: '',
        keterangan: '',
        nis: ''
    })

    const [listSiswa, setListSiswa] = useState([])
    const [listUangSaku, setListUangSaku] = useState([])

    const optionsSiswa = listSiswa.map((siswa) => ({
        value: siswa.nis,
        label: `${siswa.name} - ${siswa.siswa?.kelas?.nama}`
    }))

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    async function getDataSiswa() {
        const response = await getUser(data.tahun)
        setListSiswa(response.listSiswa)
    }

    async function getDataUangSaku() {
        const response = await getUangSaku(data.tahun, data.nis)
        setListUangSaku(response.listUangSaku)
    }

    const handleDelete = (id) => {
        Sweet.fire({
            title: 'Anda yakin menghapus?',
            text: "Hapus Uang Saku Siswa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('input-uang-saku.hapus',
                        {
                            id: id
                        }),
                        {
                            onSuccess: (page) => {
                                toast.success('Berhasil Hapus Uang Saku Siswa')
                                setData({
                                    tahun: data.tahun,
                                    semester: data.semester,
                                    tanggal: data.tanggal,
                                    jumlah: data.jumlah,
                                    keterangan: data.keterangan,
                                    nis: data.nis
                                })

                                getDataSiswa()
                                getDataSkor()
                                getDataUangSaku()
                            }
                        })
                }
            })
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('input-uang-saku.simpan'), {
            onSuccess: (page) => {
                toast.success('Berhasil Simpan Uang Saku Siswa')
                setData({
                    tahun: data.tahun,
                    semester: data.semester,
                    tanggal: data.tanggal,
                    jumlah: data.jumlah,
                    keterangan: data.keterangan,
                    nis: data.nis
                })

                getDataSiswa()
                getDataSkor()
                getDataUangSaku()
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


        trackPromise(
            getDataSiswa()
        )

    }, [])

    useEffect(() => {

        if (data.tahun) {

            trackPromise(
                getDataSiswa()
            )

        }
    }, [data.tahun])

    useEffect(() => {

        if (data.nis
            && data.tanggal
        ) {

            trackPromise(
                getDataUangSaku()
            )

        }
        else {
            setListUangSaku([])
        }
    }, [data.nis, data.tanggal])

    return (
        <>
            <Head title='Input Skor' />
            <form onSubmit={submit} className='space-y-5 mt-10 mb-10'>

                <div className="lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0 space-y-3">

                    <Tanggal
                        id="tanggal"
                        name="tanggal"
                        label="Tanggal"
                        value={data.tanggal}
                        message={errors.tanggal}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <SearchableSelect
                        id="nis"
                        name="nis"
                        label="Siswa"
                        options={optionsSiswa}
                        value={data.nis}
                        message={errors.nis}
                        onChange={(e) => setData('nis', e)}
                    />

                    <SearchableSelect
                        id="skorId"
                        name="skorId"
                        label="Skor"
                        options={optionsSkor}
                        value={data.skorId}
                        message={errors.skorId}
                        onChange={(e) => setData('skorId', e)}
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
                                Keterangan
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Skor
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Guru
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUangSaku && listUangSaku.map((data, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {data.skor.keterangan}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {data.skor.skor}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {data.user?.name}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600 inline-flex space-x-3">
                                    {auth.user.id == data.user_id && <Hapus
                                        onClick={() => handleDelete(data.id)}
                                    />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
InputUangSaku.layout = page => <AppLayout children={page} />
export default InputUangSaku