import React, { useEffect, useState } from 'react'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import { trackPromise } from 'react-promise-tracker'
import Sweet from '@/Components/Sia/Sweet'
import Hapus from '@/Components/Sia/Hapus'
import PrimaryButton from '@/Components/Breeze/PrimaryButton'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import SearchableSelect from '@/Components/Sia/SearchableSelect'
import Tanggal from '@/Components/Sia/Tanggal'
import getUser from '@/Functions/getUser'
import getUangSaku from '@/Functions/getUangSaku'
import InputText from '@/Components/Sia/InputText'
import { bulan, hariTanggal, maskRupiah, rupiah } from '@/Functions/functions'
import Bulan from '@/Components/Sia/Bulan'

const InputUangSaku = ({ initTahun, initSemester }) => {

    const { auth } = usePage().props

    const { data, setData, post, errors } = useForm({
        tahun: initTahun,
        semester: initSemester,
        tanggal: moment(new Date()).format('YYYY-MM-DD'),
        jumlah: '',
        keterangan: '',
        nis: '',
        bulan: moment(new Date()).format('MM')
    })

    const [listSiswa, setListSiswa] = useState([])
    const [listUangSaku, setListUangSaku] = useState([])

    const optionsSiswa = listSiswa.map((siswa) => ({
        value: siswa.nis,
        label: `${siswa.name} - Kelas : ${siswa.siswa?.kelas?.nama}`
    }))

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const handleRupiah = (event) => {
        const value = event.target.value
        setData('jumlah', maskRupiah(value))
    }

    async function getDataSiswa() {
        const response = await getUser(data.tahun)
        setListSiswa(response.listUser)
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
                                    nis: data.nis,
                                    bulan: data.bulan
                                })

                                getDataSiswa()
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
                    nis: data.nis,
                    bulan: data.bulan
                })

                getDataSiswa()
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
            && data.bulan
            && data.tahun
        ) {

            trackPromise(
                getDataUangSaku()
            )

        }
        else {
            setListUangSaku([])
        }
    }, [data.nis, data.tahun, data.bulan])

    return (
        <>
            <Head title='Input Uang Saku' />
            <form onSubmit={submit} className='space-y-5 mt-10 mb-10'>

                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 space-y-3">

                    <Tanggal
                        id="tanggal"
                        name="tanggal"
                        label="Tanggal"
                        value={data.tanggal}
                        message={errors.tanggal}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <Bulan
                        id='bulan'
                        name='bulan'
                        value={data.bulan}
                        message={errors.bulan}
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

                    <InputText
                        id='jumlah'
                        name='jumlah'
                        label='jumlah saku'
                        value={data.jumlah}
                        message={errors.jumlah}
                        handleChange={handleRupiah}
                    />

                    <InputText
                        id='keterangan'
                        name='keterangan'
                        label='keterangan'
                        value={data.keterangan}
                        message={errors.keterangan}
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
                                Tanggal
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Tahun
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Bulan
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Jumlah
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Keterangan
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Bendahara
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUangSaku && listUangSaku.map((saku, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {hariTanggal(saku.tanggal)}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {saku.tahun}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {bulan(saku.tanggal)}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {rupiah(saku.jumlah)}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {saku.keterangan}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {saku.user?.name}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600 inline-flex space-x-3">
                                    <Hapus
                                        onClick={() => handleDelete(saku.id)}
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
InputUangSaku.layout = page => <AppLayout children={page} />
export default InputUangSaku