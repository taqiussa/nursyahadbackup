import axios from "axios"

const getPengeluaranSiswa = async (tahun, tanggal, nis) => {
    try {
        const response = await axios.post(
            route('get-pengeluaran-siswa',
                {
                    tahun: tahun,
                    tanggal: tanggal,
                    nis: nis
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getPengeluaranSiswa