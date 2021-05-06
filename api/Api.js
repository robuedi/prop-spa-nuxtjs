import axios from 'axios'

const Api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
})

Api.base = function (){
  return axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000'
  })
}

export default Api

