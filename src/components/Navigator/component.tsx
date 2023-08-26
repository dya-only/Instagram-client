import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import Instagram from "../../assets/svgs/Instagram.tsx"
import Home from "../../assets/svgs/Home.tsx"
import Search from "../../assets/svgs/Search.tsx"
import Explore from "../../assets/svgs/Explore.tsx"
import Reels from "../../assets/svgs/Reels.tsx"
import Message from "../../assets/svgs/Message.tsx"
import Heart from "../../assets/svgs/Heart.tsx"
import Create from "../../assets/svgs/Create.tsx"
import About from "../../assets/svgs/About.tsx"
import InstagramMini from "../../assets/svgs/InstagramMini.tsx"
import User from '../../assets/imgs/profile.jpg'

export default function Navigator() {
  const [profile, setProfile] = useState('')

  const userVerify = async () => {
    // AccessToken verify
    axios.post('/api/user/verify', { token: sessionStorage.getItem('TOKEN') }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data
      if (res.status !== 200) return

      // Get user profile img
      axios.post('/api/user', { _id: res.data.id }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(_resp => {
        console.log(_resp.data.profile)
        setProfile(_resp.data.profile)
      })
    })
  }

  useEffect (() => {
    userVerify()
  }, [])

  return (
    <nav className={'fixed bg-white z-50 flex flex-col justify-between xs:items-start lg:items-start md:items-center sm:items-center xs:w-[244px] lg:w-[244px] md:w-[72px] p-4 xs:h-screen lg:h-screen md:h-screen sm:w-screen sm:h-[72px] xs:border-r-[1px] lg:border-r-[1px] md:border-r-[1px] sm:border-b-[1px] border-gray-300'}>
      <div className="flex flex-col xs:items-start lg:items-start md:items-center sm:items-center">
        <Link className={'xs:block lg:block md:hidden sm:hidden'} to={'/'}><Instagram w={103} h={29} /></Link>
        <Link className={'xs:hidden lg:hidden md:block sm:block'} to={'/'}><InstagramMini/></Link>

        {/*XS, LG*/}
        <div className="xs:flex lg:flex md:hidden sm:hidden flex-col items-start">
          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Home/></span>
            <p className={'font-[500] text-[16px]'}>홈</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Search/></span>
            <p className={'font-[500] text-[16px]'}>검색</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Explore/></span>
            <p className={'font-[500] text-[16px]'}>탐색 탭</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Reels/></span>
            <p className={'font-[500] text-[16px]'}>릴스</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Message/></span>
            <p className={'font-[500] text-[16px]'}>메시지</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Heart w={24} h={24}/></span>
            <p className={'font-[500] text-[16px]'}>알림</p>
          </a>

          <a className={'flex justify-center items-end ml-2 mb-8'} href={''}>
            <span className={'mr-[15px] font-[noto]'}><Create/></span>
            <p className={'font-[500] text-[16px]'}>만들기</p>
          </a>

          <Link className={'flex justify-center items-end ml-2 mb-8'} to={'/profile'}>
            <img className={'w-[24px] mr-[15px] font-[noto]'} src={`/api/upload/profile/${profile}`} alt=""/>
            <p className={'font-[500] text-[16px]'}>프로필</p>
          </Link>
        </div>

        {/*MD, SM*/}
        <div className="xs:hidden lg:hidden md:block sm:block">
          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Home/></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Search/></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Explore/></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Reels/></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Message/></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Heart w={24} h={24}/></span>
          </a>

          <a className={'flex justify-center items-end mb-8'} href={''}>
            <span className={'font-[noto]'}><Create/></span>
          </a>

          <Link className={'flex justify-center items-end mb-8'} to={'/profile'}>
            <img className={'w-[24px] font-[noto]'} src={`/api/upload/profile/${profile}`} alt='' />
          </Link>
        </div>
      </div>

      <a className={'flex justify-center items-end xs:ml-2 lg:ml-2 md:ml-0 sm:ml-0ㅇ mb-4'} href={''}>
        <span className={'font-[noto]'}><About/></span>
        <p className={'font-[500] text-[16px] ml-[15px] xs:block lg:block md:hidden sm:hidden'}>더보기</p>
      </a>
    </nav>
  )
}
