import axios from "axios"

const getUangSaku = async (tahun, nis) => {
    try {
        const response = await axios.post(
            route('get-uang-saku',
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

export default getUangSaku