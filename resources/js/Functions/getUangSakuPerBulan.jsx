import axios from "axios"

const getUangSakuPerBulan = async (tahun, bulan, nis) => {
    try {
        const response = await axios.post(
            route('get-uang-saku-per-bulan',
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

export default getUangSakuPerBulan