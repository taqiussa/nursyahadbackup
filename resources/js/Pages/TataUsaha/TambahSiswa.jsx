import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import Sweet from '@/Components/Sia/Sweet'
import Hapus from '@/Components/Sia/Hapus'
import PrimaryButton from '@/Components/Breeze/PrimaryButton'
import { toast } from 'react-toastify'
import JenisKelamin from '@/Components/Sia/JenisKelamin'
import Tanggal from '@/Components/Sia/Tanggal'
import moment from 'moment'
import InputText from '@/Components/Sia/InputText'
import InputArea from '@/Components/Sia/InputArea'
const TambahSiswa = ({ listUser }) => {

    const { data, setData, post, reset, errors, delete: destroy } = useForm({
        name: '',
        nis: '',
        jenisKelamin: '',
        nisn: '',
        nik: '',
        tanggalLahir: moment(new Date()).format('YYYY-MM-DD'),
        tempatLahir: '',
        asalSekolah: '',
        namaAyah: '',
        namaIbu: '',
        alamat: ''
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const handleDelete = (id) => {
        Sweet.fire({
            title: 'Anda yakin menghapus?',
            text: "Hapus Siswa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route('tambah-siswa.hapus',
                        {
                            id: id
                        }),
                        {
                            onSuccess: (page) => {
                                toast.success('Berhasil Hapus Siswa')
                            }
                        })
                }
            })
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('tambah-siswa.simpan'), {
            onSuccess: (page) => {
                toast.success('Berhasil Tambah Siswa')
                setData({
                    name: '',
                    nis: '',
                    jenisKelamin: '',
                    nisn: '',
                    nik: '',
                    tanggalLahir: moment(new Date()).format('YYYY-MM-DD'),
                    tempatLahir: '',
                    asalSekolah: '',
                    namaAyah: '',
                    namaIbu: '',
                    alamat: ''
                })
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

    return (
        <>
            <Head title='Tambah Siswa' />
            <form onSubmit={submit}>
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2">

                    <div className='col-span-2'>

                        <InputText
                            id="name"
                            name="name"
                            label="nama lengkap"
                            value={data.name}
                            message={errors.name}
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                    </div>

                    <InputText
                        id="nis"
                        name="nis"
                        label="NIS"
                        value={data.nis}
                        message={errors.nis}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputText
                        id="nisn"
                        name="nisn"
                        label="NISN"
                        value={data.nisn}
                        message={errors.nisn}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                </div>
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2 mt-3">
                    <InputText
                        id="nik"
                        name="nik"
                        label="NIK"
                        value={data.nik}
                        message={errors.nik}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <JenisKelamin
                        id="jenisKelamin"
                        name="jenisKelamin"
                        value={data.jenisKelamin}
                        message={errors.jenisKelamin}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputText
                        id="tempatLahir"
                        name="tempatLahir"
                        label="tempat lahir"
                        value={data.tempatLahir}
                        message={errors.tempatLahir}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <Tanggal
                        id="tanggalLahir"
                        name="tanggalLahir"
                        label="tanggal lahir"
                        value={data.tanggalLahir}
                        message={errors.tanggalLahir}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                </div>
                <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2 mt-3">

                    <InputText
                        id="namaAyah"
                        name="namaAyah"
                        label="nama ayah"
                        value={data.namaAyah}
                        message={errors.namaAyah}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputText
                        id="namaIbu"
                        name="namaIbu"
                        label="nama ibu"
                        value={data.namaIbu}
                        message={errors.namaIbu}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    <div className="col-span-2">

                        <InputText
                            id="asalSekolah"
                            name="asalSekolah"
                            label="asal sekolah"
                            value={data.asalSekolah}
                            message={errors.asalSekolah}
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                    </div>
                </div>
                <div>
                    <InputArea
                        id="alamat"
                        name="alamat"
                        label="alamat siswa / orang tua"
                        rows={3}
                        value={data.alamat}
                        message={errors.alamat}
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex justify-end mt-3">
                    <PrimaryButton onClick={submit}>
                        Simpan
                    </PrimaryButton>
                </div>
            </form>
            <h4 className='font-bold text-slate-600'>
                Daftar Nama Siswa Belum Masuk Kelas
            </h4>
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
                                NIS
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.map((user, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {user.name}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {user.nis}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    <Hapus
                                        onClick={() => handleDelete(user.id)}
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
TambahSiswa.layout = page => <AppLayout children={page} />
export default TambahSiswa