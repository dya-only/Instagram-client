import {Fragment, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

import Navigator from '../components/navigator/component.tsx'
import Story from "../components/story/component.tsx"
import Post from "../components/post/component.tsx"
import Recommend from "../components/recommned/component.tsx"

export default function MainPage() {
  const navigate = useNavigate()

  const userVerify = async () => {
    axios.post('/api/user/verify', { token: sessionStorage.getItem('TOKEN') }, {
      headers: {'Content-Type': 'application/json'}
    }).then(resp => {
      const res = resp.data
      if (res.status !== 200) navigate('/login')
    })
  }

  useEffect(() => {
    if (!sessionStorage.getItem('TOKEN')) navigate('/login')
    userVerify()
  }, [])

  return (
    <Fragment>
      <Navigator />

      <div className={'w-screen flex justify-center items-start'}>
        <div className={'w-[600px] flex flex-col justify-start items-center mt-[45px] mr-20 xs:ml-[250px] lg:ml-[250px] md:ml-28 sm:ml-28'}>
          <div className={'w-full h-[100px] flex justify-start items-center overflow-x-scroll p-1 pr-4'}>
            <Story/><Story/><Story/><Story/><Story/><Story/>
            <Story/><Story/><Story/><Story/><Story/><Story/>
          </div>

          <div className={'w-full flex flex-col justify-start items-center mt-6'}>
            <Post/>
            <Post/>
            <Post/>
          </div>
        </div>

        <Recommend/>
      </div>
    </Fragment>
  )
}