import { ref, onMounted } from 'vue'
import axios from 'axios'

export async function getinp(id: any) {
  let response = await axios.get(`http://127.0.0.1:8090/api/files/${id}/getinp/`)
  return response.data
}

export const uploadInpData = async (pk: any, inpdata: any) => {
  try {
    await axios.post(`http://127.0.0.1:8090/api/files/${pk}/postinp/`, { inpdata: inpdata })
    console.log('post success!')
  } catch (error) {
    console.error(error)
  }
}

export const getResult = async (id: any) => {
  try {
    let response = await axios.get(`http://127.0.0.1:8090/api/files/${id}/getres/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
