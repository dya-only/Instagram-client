import axios from 'axios'

const authToken = async (token: string) => {
  axios.post('/api/user/verify', { token }, {
    headers: {'Content-Type': 'application/json'}
  }).then(resp => {
    const res = resp.data
    if (res.status === 200) return res
  })
}

export { authToken }