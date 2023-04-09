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
import InputText from '@/Components/Sia/InputText'
import { bulan, hariTanggal, maskRupiah, penjumlahan, rupiah, switchBulan } from '@/Functions/functions'
import getPengeluaranSiswa from '@/Functions/getPengeluaranSiswa'
import Bulan from '@/Components/Sia/Bulan'
import getUangSakuPerBulan from '@/Functions/getUangSakuPerBulan'

const InputPengeluaranSiswa = ({ initTahun, initSemester }) => {

    const { data, setData, post, errors } = useForm({
        tahun: initTahun,
        semester: initSemester,
        tanggal: moment(new Date()).format('YYYY-MM-DD'),
        jumlah: '',
        keterangan: '',
        nis: '',
        bulan: moment(new Date()).format('MM'),
    })

    const [listSiswa, setListSiswa] = useState([])
    const [listPengeluaran, setListPengeluaran] = useState([])
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

    async function getDataPengeluaran() {
        const response = await getPengeluaranSiswa(data.tahun, data.bulan, data.nis)
        setListPengeluaran(response.listPengeluaran)
    }

    async function getDataUangSaku()
    {
        const response = await getUangSakuPerBulan(data.tahun, data.bulan, data.nis)
        setListUangSaku(response.listUangSaku)
    }

    const jumlahUangSaku = penjumlahan(listUangSaku, 'jumlah')
    const jumlahPengeluaran = penjumlahan(listPengeluaran, 'jumlah')
    const totalAkhir = jumlahUangSaku - jumlahPengeluaran

    const handleDelete = (id) => {
        Sweet.fire({
            title: 'Anda yakin menghapus?',
            text: "Hapus Pengeluaran Siswa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('input-pengeluaran-siswa.hapus',
                        {
                            id: id
                        }),
                        {
                            onSuccess: (page) => {
                                toast.success('Berhasil Hapus Pengeluaran Siswa')
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
                                getDataPengeluaran()
                                getDataUangSaku()
                            }
                        })
                }
            })
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('input-pengeluaran-siswa.simpan'), {
            onSuccess: (page) => {
                toast.success('Berhasil Simpan Pengeluaran Siswa')
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
                getDataPengeluaran()
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
                getDataPengeluaran(),
                getDataUangSaku()
            )

        }
        else {
            setListPengeluaran([])
            setListUangSaku([])
        }
    }, [data.nis, data.tahun, data.bulan])

    return (
        <>
            <Head title='Input Pengeluaran' />
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
                        label='jumlah pengeluaran'
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
                        {listPengeluaran && listPengeluaran.map((saku, index) => (
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
                                    {bulan(saku.bulan)}
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
                        <tr className="bg-slate-400 border-b">
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                Total Uang Saku Masuk
                            </td>
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                {rupiah(jumlahUangSaku)}
                            </td>
                        </tr>
                        <tr className="bg-slate-400 border-b">
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                Total Pengeluaran
                            </td>
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                {rupiah(jumlahPengeluaran)}
                            </td>
                        </tr>
                        <tr className="bg-slate-400 border-b">
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                Total Akhir Bulan {switchBulan(data.bulan)}
                            </td>
                            <td className="py-2 px-2 font-bold text-lg text-slate-600" colSpan={4}>
                                {rupiah(totalAkhir)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
InputPengeluaranSiswa.layout = page => <AppLayout children={page} />
export default InputPengeluaranSiswa