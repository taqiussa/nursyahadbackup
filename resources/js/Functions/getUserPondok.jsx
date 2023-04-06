import axios from "axios"

const getUserPondok = async (tahun) => {
    try {
        const response = await axios.post(
            route('get-user-pondok',
                {
                    tahun: tahun,
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getUserPondok