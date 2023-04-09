import axios from "axios"

const getPengeluaranSiswa = async (tahun, bulan, nis) => {
    try {
        const response = await axios.post(
            route('get-pengeluaran-siswa',
                {
                    tahun: tahun,
                    bulan: bulan,
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