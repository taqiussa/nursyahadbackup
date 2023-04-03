import React, { useEffect, useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import InputText from '@/Components/Sia/InputText';
import Tahun from '@/Components/Sia/Tahun';
import ReactPaginate from 'react-paginate';
import { trackPromise } from 'react-promise-tracker';
import getUserNonPondok from '@/Functions/getUserNonPondok';
import PrimaryButton from '@/Components/Breeze/PrimaryButton';
import Checkbox from '@/Components/Breeze/Checkbox';
import { toast } from 'react-toastify'

const DataSiswa = ({ initTahun }) => {
    const { data, setData, post, errors } = useForm({
        tahun: initTahun,
        searchTerm: '',
        arrayInput: []
    })

    const [listUser, setListUser] = useState([])

    async function getDataUser() {
        const response = await getUserNonPondok(data.tahun)
        setListUser(response.listUser)
    }

    // Ref Checkbox
    const checkboxRefs = useRef([])

    checkboxRefs.current = listUser.map(
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

    }

    // React Pagination
    const [page, setPage] = useState(0);
    const postsPerPage = 10;
    const numberOfPostsVisited = page * postsPerPage;
    const totalPages = Math.ceil(listUser?.length / postsPerPage);
    const changePage = ({ selected }) => {
        setPage(selected);
    };


    const filteredListUser = listUser?.filter((user) => {
        const searchTerm = data.searchTerm.toLowerCase();
        const name = user.name.toLowerCase();
        return (
            name.includes(searchTerm)
        );
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('atur-siswa-pondok.simpan'), {
            onSuccess: (page) => {
                toast.success('Berhasil Atur Siswa Pondok')
                setData({
                    tahun: data.tahun,
                    searchTerm: data.searchTerm,
                    arrayInput: []
                })

                checkboxRefs.current.forEach((check) => {
                    check.current.checked = false
                })

                getDataUser()

            },
            onError: (error) => {
                Sweet.fire({
                    title: 'Gagal!',
                    text: error.arrayInput ? 'Silahkan Pilih Siswa' : '' || error.pesan ? error.pesan : '',
                    icon: 'error',
                    confirmButtonText: 'Kembali'
                })
            }
        })
    }

    useEffect(() => {

        if (data.tahun)
            trackPromise(
                getDataUser()
            )

    }, [])

    useEffect(() => {

        if (data.tahun)
            trackPromise(
                getDataUser()
            )

    }, [data.tahun])

    return (
        <>
            <Head title='Data Siswa' />
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 lg:space-y-0 gap-2 pb-7">

                <Tahun
                    id="tahun"
                    name="tahun"
                    value={data.tahun}
                    message={errors.tahun}
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputText
                    id="searchTerm"
                    name="searchTerm"
                    value={data.searchTerm}
                    message={errors.searchTerm}
                    label="cari"
                    handleChange={onHandleChange}
                />

            </div>
            <div className='flex items-end'>
                <PrimaryButton onClick={submit}>
                    tambahkan ke pondok
                </PrimaryButton>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-600">
                    <thead className="text-sm text-slate-600 bg-gray-50">
                        <tr>
                            <th scope='col' className="py-3 px-2">
                                No
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                NIS
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Nama
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Kelas
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredListUser && filteredListUser
                            .slice(numberOfPostsVisited, numberOfPostsVisited + postsPerPage)
                            .map((user, index) => (
                                <tr key={index}
                                    onClick={() => {
                                        const checkboxRef = checkboxRefs.current[index]
                                        checkboxRef.current.click()
                                    }}
                                    className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200 whitespace-nowrap">
                                    <td className="py-2 px-2 font-medium text-slate-600 text-center">
                                        {index + 1 + (page * 10)}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.nis}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.name}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.siswa?.kelas?.nama}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        <label className="flex items-center">
                                            <Checkbox
                                                ref={checkboxRefs.current[index]}
                                                name={user.nis}
                                                value={user.nis}
                                                handleChange={(e) => handleDynamic(e, index)} />
                                        </label>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <section className="my-2 overflow-x-auto">
                <ReactPaginate
                    pageRangeDisplayed={3} //The range of buttons pages displayed.
                    previousLabel={"Previous"} //lable for previous page button
                    nextLabel={"Next"} // lable for Next page button
                    pageCount={totalPages} // place here the variable for total number of pages
                    onPageChange={changePage} // place here the trigger event function
                    /// navigation CSS styling ///
                    containerClassName={"flex items-center my-4 space-x-1 text-slate-600"}
                    pageLinkClassName={"focus:shadow-outline transition-colors duration-150 border-emerald-500 hover:bg-emerald-300 rounded-md py-1 px-2 border"}
                    previousLinkClassName={"focus:shadow-outline transition-colors duration-150 border-emerald-500 hover:bg-emerald-300 rounded-l-md py-1 px-2 border"}
                    nextLinkClassName={"focus:shadow-outline transition-colors duration-150 border-emerald-500 hover:bg-emerald-300 rounded-r-md py-1 px-2 border"}
                    disabledLinkClassName={"text-gray-300 cursor-not-allowed hover:bg-white"}
                    activeLinkClassName={"focus:shadow-outline transition-colors duration-150 bg-emerald-500 text-emerald-100 cursor-pointer"}
                    /// end navigation styling ///
                    renderOnZeroPageCount={null}
                />
            </section>
        </>

    );
}


DataSiswa.layout = page => <AppLayout children={page} />
export default DataSiswa