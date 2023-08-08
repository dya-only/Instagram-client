import axios from 'axios'

const login = async (email: string, password: string) => {
  axios.post('/api/sign/in', { email, password }, {
    headers: {'Content-Type': 'application/json'}
  }).then(resp => {
    const res = resp.data
    if (res.status === 200) return res.accessToken
  })
}

const token = async (token: string) => {
  axios.post('/api/user/verify', { token }, {
    headers: {'Content-Type': 'application/json'}
  }).then(resp => {
    const res = resp.data
    if (res.status === 200) return res
  })
}

export { login, token }