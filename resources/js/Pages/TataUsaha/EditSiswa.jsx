import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import Sweet from '@/Components/Sia/Sweet'
import PrimaryButton from '@/Components/Breeze/PrimaryButton'
import { toast } from 'react-toastify'
import JenisKelamin from '@/Components/Sia/JenisKelamin'
import Tanggal from '@/Components/Sia/Tanggal'
import moment from 'moment'
import InputText from '@/Components/Sia/InputText'
import InputArea from '@/Components/Sia/InputArea'

const EditSiswa = ({ siswa }) => {

    const { data, setData, post, errors } = useForm({
        id: siswa.id,
        name: siswa.name ?? '',
        nis: siswa.nis ?? '',
        jenisKelamin: siswa.biodata?.jenis_kelamin ?? '',
        nisn: siswa.biodata?.nisn ?? '',
        nik: siswa.biodata?.nik ?? '',
        tanggalLahir: siswa.biodata?.tanggal_lahir ? moment(siswa.biodata?.tanggal_lahir).format('YYYY-MM-DD') : '',
        tempatLahir: siswa.biodata?.tempat_lahir ?? '',
        asalSekolah: siswa.biodata?.asal_sekolah ?? '',
        namaAyah: siswa.biodata?.nama_ayah ?? '',
        namaIbu: siswa.biodata?.nama_ibu ?? '',
        alamat: siswa.biodata?.alamat ?? ''
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('tambah-siswa.update'), {
            onSuccess: (page) => {
                toast.success('Berhasil Update Siswa')
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
            <Head title='Edit Siswa' />
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
                            label="asal sekolah (SD/MI)"
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
        </>
    )
}
EditSiswa.layout = page => <AppLayout children={page} />
export default EditSiswa