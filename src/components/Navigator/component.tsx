import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react"
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
import Media from "../../assets/svgs/media.tsx"
import Previous from "../../assets/svgs/previous.tsx"
import Smile from "../../assets/svgs/smile.tsx"
import { Container } from "../modal/container/component.tsx"
import { Window } from "../modal/window/component.tsx"

export default function Navigator() {
  const [w, setW] = useState(658)
  const [user, setUser] = useState({ id: '', email: '', username: '' })
  const [content, setContent] = useState('')
  const [profile, setProfile] = useState('')
  const [createStep, setCreateStep] = useState(0)
  const [preview, setPreview] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploadImg, setUploadImg] = useState<File | any>()

  const userVerify = async () => {
    // AccessToken verify
    axios.post('/api/user/verify', { token: sessionStorage.getItem('TOKEN') }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data
      if (res.status !== 200) return

      setUser({ id: res.data.id, email: res.data.email, username: res.data.username })

      // Get user profile img
      axios.post('/api/user', { _id: res.data.id }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(_resp => setProfile(_resp.data.profile))
    })
  }

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    setUploadImg(e.target.files![0])

    if (e.target.files![0]) fileReader.readAsDataURL(e.target.files![0])
    fileReader.onload = () => setPreview(fileReader.result!.toString())

    setCreateStep(2)
  }

  const uploadPost = async () => {
    const formData = new FormData()

    formData.append('file', uploadImg)
    formData.append('author', user.email)
    content === '' ? formData.append('content', ' ') : formData.append('content', content)

    axios.post('/api/post', formData)
      .then(() => window.location.href = `/profile/${user.username}`)
  }

  useEffect (() => {
    userVerify()
  }, [])

  return (
    <Fragment>

      {/* Upload post window */}
      { createStep ?
        <Container>
          <Window w={w} h={700}>
            { createStep == 1 ? <div className={'w-full h-[42px] flex justify-center items-center font-bold border-b-[1px] border-b-gray-200'}>새 게시물 만들기</div> : null }
            { createStep == 2 ?
              <div className={'w-full h-[42px] flex justify-between items-center border-b-[1px] border-b-gray-200'}>
                <div className={'ml-4 cursor-pointer'} onClick={() => setCreateStep(1)}><Previous /></div>
                <p className={'font-bold'}>자르기</p>
                <p className={'text-blue-500 font-bold text-[15px] mr-4 cursor-pointer'} onClick={() => { setCreateStep(3); setW(998) }}>다음</p>
              </div> : null }
            { createStep == 3 ?
              <div className={'w-full h-[42px] flex justify-between items-center border-b-[1px] border-b-gray-200'}>
                <div className={'ml-4 cursor-pointer'} onClick={() => { setCreateStep(1); setW(658) }}><Previous /></div>
                <p className={'font-bold'}>새 게시물 만들기</p>
                <p className={'text-blue-500 font-bold text-[15px] mr-4 cursor-pointer'} onClick={uploadPost}>공유하기</p>
              </div> : null }

            { createStep == 1 ? <div className={'w-[658px] h-[658px] flex flex-col justify-center items-center'}>
              <Media w={96} h={20} />
              <p className={'text-xl font-[500]'}>사진과 동영상을 여기에 끌어다 놓지마세요</p>

              <button className={'w-[120px] h-[32px] rounded-xl text-[15px] bg-[#0095F6] hover:bg-[#1877F2] text-white font-bold mt-6'} onClick={() => fileRef.current?.click()}>컴퓨터에서 선택</button>
              <input type='file' ref={fileRef} className={'hidden'} onChange={uploadFile} />
            </div> : null }
            { createStep == 2 ?
              <img className={'w-[658px] h-[659px] object-cover'} src={preview} />
            : null }
            { createStep == 3 ?
              <div className={'flex justify-start items-start'}>
                <img className={'w-[658px] h-[658px] object-cover rounded-bl-xl'} src={preview} />
                <div className={'w-[339px] h-[275px] border-[1px] border-b-gray-300 p-5'}>
                  <div className={'flex items-center mb-3'}>
                    <img className={'w-[28px] rounded-full border-[1px] mr-3'} src={`/api/upload/profile/${profile}`} />
                    <p className={'font-bold text-sm'}>{ user.username }</p>
                  </div>

                  <textarea className={'w-[290px] h-[175px] resize-none outline-none'} placeholder='문구 입력...' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
                  <Smile />
                </div>
              </div>
            : null }
          </Window>
        </Container>
      : null }

      {/* Navigatior */}
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

            <button className={'flex justify-center items-end ml-2 mb-8'} onClick={() => setCreateStep(1)}>
              <span className={'mr-[15px] font-[noto]'}><Create/></span>
              <p className={'font-[500] text-[16px]'}>만들기</p>
            </button>

            <a className={'flex justify-center items-end ml-2 mb-8'} href={`/profile/${user.username}`}>  
              <img className={'w-[24px] mr-[15px] font-[noto] rounded-full'} src={`/api/upload/profile/${profile}`} alt=""/>
              <p className={'font-[500] text-[16px]'}>프로필</p>
            </a>
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

            <button className={'flex justify-center items-end mb-8'} onClick={() => setCreateStep(1)}>
              <span className={'font-[noto]'}><Create/></span>
            </button>

            <Link className={'flex justify-center items-end mb-8'} to={'/profile'}>
              <img className={'w-[24px] font-[noto] rounded-full'} src={`/api/upload/profile/${profile}`} alt='' />
            </Link>
          </div>
        </div>

        <a className={'flex justify-center items-end xs:ml-2 lg:ml-2 md:ml-0 sm:ml-0ㅇ mb-4'} href={''}>
          <span className={'font-[noto]'}><About/></span>
          <p className={'font-[500] text-[16px] ml-[15px] xs:block lg:block md:hidden sm:hidden'}>더보기</p>
        </a>
      </nav>
    </Fragment>
  )
}