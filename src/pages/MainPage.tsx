import {Fragment, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Navigator from '../components/Navigator/component.tsx'
import Story from "../components/Story/component.tsx"
import Post from "../components/Post/component.tsx"
import Recommend from "../components/Recommend/component.tsx"
import Menu from "../assets/svgs/Menu.tsx"
import Heart from "../assets/svgs/Heart.tsx"
import Chat from "../assets/svgs/Chat.tsx"
import Message from "../assets/svgs/Message.tsx"
import Bookmark from "../assets/svgs/Bookmark.tsx"
import Emoji from "../assets/svgs/Emoji.tsx"

import User from "../assets/imgs/profile.png"
import StellLive from '../assets/imgs/template/stelllive.jpg'
import axios from "axios";

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
        <div className={'w-[600px] flex flex-col justify-start items-center mt-[45px] mr-20 xs:ml-64 lg:ml-64 md:ml-28 sm:ml-28'}>
          <div className={'w-full h-[100px] flex justify-start items-center overflow-x-scroll p-1 pr-4'}>
            <Story/><Story/><Story/><Story/><Story/><Story/>
            <Story/><Story/><Story/><Story/><Story/><Story/>
          </div>

          <div className={'w-full flex flex-col justify-start items-center mt-6'}>
            <Post/>

            <div className={'w-[470px] pt-8 pb-8 flex flex-col items-center'}>
              <div className={'w-[470px] flex justify-between items-center mb-4'}>
                <div className={'flex justify-start items-center'}>
                  <div className={'relative flex justify-center items-center'}>
                    <img className={'absolute w-[30px] border-[0.5px] rounded-full'} src={User} alt={''}/>
                    <div className={'rounded-full w-[32px] h-[32px] border-[1px]'}></div>
                  </div>
                  <div className={'font-bold text-black text-[13px] ml-3'}>dy4code</div>
                </div>
                <Menu/>
              </div>
              <img className={'w-[468px] max-h-[600px] object-cover rounded-md mb-4'} src={StellLive} alt={''}/>

              <div className={'w-full flex justify-between items-center mb-2'}>
                <div className={'flex items-center'}>
                  <Heart w={40} h={40}/>
                  <span className={'w-4'}/>
                  <Chat/>
                  <span className={'w-4'}/>
                  <Message/>
                </div>

                <Bookmark/>
              </div>

              <p className={'w-full font-[700] text-[14px] mb-1'}>좋아요 N개</p>

              <div className={'w-full flex justify-start items-start mb-1'}>
                <p className={'font-[700] text-[15px] mr-2'}>dy4code</p>
                <p className={'text-[14px]'}>게시물의 설명</p>
              </div>

              <div className={'w-full flex'}>
                <textarea className={'w-[98%] h-6 focus:h-12 outline-none border-none text-sm mb-4 resize-none'} placeholder={'댓글 달기...'}/>
                <Emoji w={13} h={13}/>
              </div>
              <div className={'w-full border-b-[1px] border-gray-300'}/>
            </div>
          </div>
        </div>

        <Recommend/>
      </div>
    </Fragment>
  )
}