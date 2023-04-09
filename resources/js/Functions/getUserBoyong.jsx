import axios from "axios"

const getUserBoyong = async () => {
    try {
        const response = await axios.post(
            route('get-user-boyong')
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getUserBoyong