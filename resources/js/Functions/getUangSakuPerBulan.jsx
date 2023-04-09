import axios from "axios"

const getUangSakuPerBulan = async (tahun, nis) => {
    try {
        const response = await axios.post(
            route('get-uang-saku-per-bulan',
                {
                    tahun: tahun,
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