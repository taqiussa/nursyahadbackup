import axios from "axios"

const getSiswaNaikKelas = async (tahunLama, tahunBaru, kelasId) => {
    try {
        const response = await axios.post(
            route('get-siswa-naik-kelas',
                {
                    tahunLama: tahunLama,
                    tahunBaru: tahunBaru,
                    kelasId: kelasId,
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getSiswaNaikKelas