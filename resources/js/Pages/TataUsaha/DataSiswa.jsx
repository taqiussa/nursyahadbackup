import React, { useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import InputText from '@/Components/Sia/InputText';
import Tahun from '@/Components/Sia/Tahun';
import ReactPaginate from 'react-paginate';
import getUser from '@/Functions/getUser';
import { trackPromise } from 'react-promise-tracker';
import LinkEdit from '@/Components/Sia/LinkEdit';
import { tanggal } from '@/Functions/functions';

const DataSiswa = ({ initTahun }) => {
    const { data, setData, errors } = useForm({
        tahun: initTahun,
        searchTerm: ''
    })

    const [listUser, setListUser] = useState([])

    async function getDataUser() {
        const response = await getUser(data.tahun)
        setListUser(response.listUser)
    }

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
                                NISN
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Jenis Kelamin
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Kelas
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Tanggal Lahir
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Nama Ayah dan Ibu
                            </th>
                            <th scope='col' className="py-3 px-2 text-left">
                                Alamat
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
                                <tr key={index} className="bg-white border-b hover:bg-slate-300 odd:bg-slate-200 whitespace-nowrap">
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
                                        {user.biodata?.nisn}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.biodata?.jenis_kelamin}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.siswa?.kelas?.nama}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.biodata?.tanggal_lahir ? tanggal(user.biodata?.tanggal_lahir) : null}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.biodata?.nama_ayah} - {user.biodata?.nama_ibu}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        {user.biodata?.alamat}
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-600">
                                        <LinkEdit
                                            href={route('tambah-siswa.edit', {
                                                nis: user.nis,
                                                id: user.id
                                            })}
                                        />
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