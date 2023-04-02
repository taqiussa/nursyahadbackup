import React, { useEffect, useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import Tahun from '@/Components/Sia/Tahun'
import Kelas from '@/Components/Sia/Kelas'
import Sweet from '@/Components/Sia/Sweet'
import PrimaryButton from '@/Components/Breeze/PrimaryButton'
import { toast } from 'react-toastify'
import Checkbox from '@/Components/Breeze/Checkbox'
import { trackPromise } from 'react-promise-tracker'
import getSiswaNaikKelas from '@/Functions/getSiswaNaikKelas'

const AturNaikKelas = ({ initTahun, initTahunBaru, listKelas }) => {

    const { data, setData, post, errors } = useForm({
        tahunLama: initTahun,
        tahunBaru: initTahunBaru,
        kelasLama: '',
        kelasBaru: '',
        arrayInput: []
    })


    const [listSiswa, setListSiswa] = useState([])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const checkboxRefs = useRef([])

    checkboxRefs.current = listSiswa.map(
        (_, index) => checkboxRefs.current[index] || React.createRef()
    )

    const handleDynamic = (e, index) => {
        const { value, checked } = e.target;
        let updatedArrayInput = [...data.arrayInput];
        if (checked) {
            updatedArrayInput.push(value);
        } else {
            updatedArrayInput = updatedArrayInput.filter(item => item !== value);
        }
        setData({ ...data, arrayInput: updatedArrayInput });

        // const checkboxRef = checkboxRefs.current[index]
        // checkboxRef.setChecked(checked)
    }

    async function getDataSiswa() {
        const response = await getSiswaNaikKelas(data.tahunLama, data.tahunBaru, data.kelasLama)
        setListSiswa(response.listSiswa)
    }


    const submit = (e) => {
        e.preventDefault()
        post(route('atur-naik-kelas.simpan'), {
            onSuccess: (page) => {
                toast.success('Berhasil Naikkan Kelas')
                setData({
                    tahunLama: data.tahunLama,
                    tahunBaru: data.tahunBaru,
                    kelasLama: data.kelasLama,
                    kelasBaru: data.kelasBaru,
                    arrayInput: []
                })
                checkboxRefs.current.forEach((check) => {
                    check.current.checked = false
                })
                getDataSiswa()
            },
            onError: (error) => {
                Sweet.fire({
                    title: 'Gagal!',
                    text: error.pesan,
                    icon: 'error',
                    confirmButtonText: 'Kembali'
                })
            }
        })
    }

    useEffect(() => {
        if (data.tahunLama && data.tahunBaru && data.kelasLama)
            trackPromise(
                getDataSiswa()
            )
    }, [data.tahunLama, data.tahunBaru, data.kelasLama])

    return (
        <>
            <Head title='Atur Naik Kelas' />
            <form onSubmit={submit} className='space-y-5 mt-10 mb-10'>

                <div className='flex flex-col'>
                    <div className='font-bold text-lg text-slate-600'>
                        Kelas Lama
                    </div>
                    <div className="lg:grid lg:grid-cols-6 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2">

                        <Tahun
                            id="tahunLama"
                            name="tahunLama"
                            value={data.tahunLama}
                            message={errors.tahunLama}
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                        <Kelas
                            id="kelasLama"
                            name="kelasLama"
                            value={data.kelasLama}
                            message={errors.kelasLama}
                            isFocused={true}
                            listKelas={listKelas}
                            handleChange={onHandleChange}
                        />

                    </div>

                </div>
                <div className='flex flex-col'>
                    <div className='font-bold text-lg text-slate-600'>
                        Kelas Baru
                    </div>
                    <div className="lg:grid lg:grid-cols-6 lg:gap-2 lg:space-y-0 grid grid-cols-2 gap-2">

                        <Tahun
                            id="tahunBaru"
                            name="tahunBaru"
                            value={data.tahunBaru}
                            message={errors.tahunBaru}
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                        <Kelas
                            id="kelasBaru"
                            name="kelasBaru"
                            value={data.kelasBaru}
                            message={errors.kelasBaru}
                            isFocused={true}
                            listKelas={listKelas}
                            handleChange={onHandleChange}
                        />

                    </div>
                </div>
                <PrimaryButton onClick={submit}>
                    Simpan
                </PrimaryButton>
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
                                Pilih
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSiswa && listSiswa.map((siswa, index) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    const checkboxRef = checkboxRefs.current[index]
                                    checkboxRef.current.click()
                                }}
                                className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200 hover:cursor-pointer">
                                <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    {siswa.user.name}
                                </td>
                                <td className="py-2 px-2 font-medium text-slate-600">
                                    <label className="flex items-center">
                                        <Checkbox
                                            ref={checkboxRefs.current[index]}
                                            name={siswa.nis}
                                            value={siswa.nis}
                                            handleChange={(e) => handleDynamic(e, index)} />
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
AturNaikKelas.layout = page => <AppLayout children={page} />
export default AturNaikKelas