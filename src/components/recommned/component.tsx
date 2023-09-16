import axios from "axios"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import Profile from '../../assets/imgs/profile.jpg'

export default function Recommend() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', username: '', avatar: '' })

  const userVerify = async () => {
    axios.post('/api/auth/verify', { token: sessionStorage.getItem('TOKEN') }, {
      headers: {'Content-Type': 'application/json'}
    }).then(resp => {
      const res = resp.data
      if (!res.success) navigate('/login')

      setUser({ name: res.body.name, username: res.body.username, avatar: res.body.avatar })
    })
  }

  useEffect(() => {
    userVerify()
  }, [])

  return (
    <div className={'w-[343px] mt-[60px] h-screen xs:block lg:block md:hidden sm:hidden flex flex-col justify-start items-center'}>
      <div className={'flex justify-between items-center w-[290px]'}>
        <div className={'flex'}>
          <img className={'w-[44px] h-[44px] mr-4'} src={user.avatar || Profile} alt={''} />
          <div>
            <p className={'text-[14px] font-semibold'}>{ user.username }</p>
            <p className={'text-[14px] font-[500] text-gray-500'}>{ user.name }</p>
          </div>
        </div>

        <a className={'text-[12px] font-bold text-blue-500'} href={'/'}>전환</a>
      </div>
    </div>
  )
}