import axios from "axios"

const getUser = async (tahun) => {
    try {
        const response = await axios.post(
            route('get-user',
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

export default getUser