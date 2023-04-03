import axios from "axios"

const getUserNonPondok = async (tahun) => {
    try {
        const response = await axios.post(
            route('get-user-non-pondok',
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

export default getUserNonPondok