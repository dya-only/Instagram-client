import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Instagram from "../../assets/svgs/Instagram.tsx"
import Home from "../../assets/svgs/Home.tsx"
import EmptyHome from '../../assets/svgs/EmptyHome.tsx'
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
import Check from '../../assets/imgs/check.png'
import Close from "../../assets/svgs/Close.tsx"

export default function Navigator() {
  const [w, setW] = useState(658)
  const [user, setUser] = useState({ id: '', email: '', username: '', avatar: '' })
  const [isSearch, setIsSearch] = useState(false)
  const [content, setContent] = useState('')
  const [createStep, setCreateStep] = useState(0)
  const [preview, setPreview] = useState('')
  const [uploadImg, setUploadImg] = useState<any>()
  const fileRef = useRef<HTMLInputElement>(null)

  const userVerify = async () => {
    // AccessToken verify
    axios.post('/api/auth/by-token', { token: sessionStorage.getItem('TOKEN') }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data
      if (!res.success) return

      // Get user profile img
      axios.get(`/api/user/${res.claims.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
        }
      }).then(_resp => {
        setUser({
          id: _resp.data.body.id,
          email: _resp.data.body.email,
          username: _resp.data.body.username,
          avatar: _resp.data.body.avatar
        })
      })
    }
    )
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

    formData.append('img', uploadImg)
    formData.append('author', user.id)
    content === '' ? formData.append('content', ' ') : formData.append('content', content)

    axios.post('/api/post', formData, {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}` }
    }).then((resp) => console.log(resp.data))
  }

  useEffect(() => {
    userVerify()
    if (!sessionStorage.getItem('status')) sessionStorage.setItem('status', 'Home')
  }, [])

  return (
    <Fragment>
      {/* Upload post window */}
      {createStep ?
        <Container>
          <div className={'z-50 fixed w-[98%] h-screen mt-8 flex justify-end items-start'} onClick={() => setCreateStep(0)}><Close /></div>
          <Window w={w} h={700}>
            {createStep == 1 ? <div
              className={'w-full h-[42px] flex justify-center items-center font-bold border-b-[1px] border-b-gray-200'}>새
              게시물 만들기</div> : null}
            {createStep == 2 ?
              <div className={'w-full h-[42px] flex justify-between items-center border-b-[1px] border-b-gray-200'}>
                <div className={'ml-4 cursor-pointer'} onClick={() => setCreateStep(1)}><Previous /></div>
                <p className={'font-bold'}>자르기</p>
                <p className={'text-blue-500 font-bold text-[15px] mr-4 cursor-pointer'} onClick={() => {
                  setCreateStep(3);
                  setW(998)
                }}>다음</p>
              </div> : null}
            {createStep == 3 ?
              <div className={'w-full h-[42px] flex justify-between items-center border-b-[1px] border-b-gray-200'}>
                <div className={'ml-4 cursor-pointer'} onClick={() => {
                  setCreateStep(1);
                  setW(658)
                }}><Previous /></div>
                <p className={'font-bold'}>새 게시물 만들기</p>
                <p className={'text-blue-500 font-bold text-[15px] mr-4 cursor-pointer'} onClick={() => {
                  setCreateStep(4)
                  setW(658)
                  uploadPost()
                }}>공유하기</p>
              </div> : null}
            {createStep == 4 ?
              <div
                className={'w-full h-[42px] flex justify-center items-center border-b-[1px] border-b-gray-200 font-bold'}>게시물이
                공유되었습니다.</div>
              : null}

            {createStep == 1 ? <div className={'w-[658px] h-[658px] flex flex-col justify-center items-center'}>
              <Media w={96} h={20} />
              <p className={'text-xl font-[500]'}>사진과 동영상을 여기에 끌어다 놓지마세요</p>

              <button
                className={'w-[120px] h-[32px] rounded-xl text-[15px] bg-[#0095F6] hover:bg-[#1877F2] text-white font-bold mt-6'}
                onClick={() => fileRef.current?.click()}>컴퓨터에서 선택
              </button>
              <input type='file' ref={fileRef} className={'hidden'} onChange={uploadFile} />
            </div> : null}
            {createStep == 2 ?
              <img className={'w-[658px] h-[659px] object-cover'} src={preview} />
              : null}
            {createStep == 3 ?
              <div className={'flex justify-start items-start'}>
                <img className={'w-[658px] h-[658px] object-cover rounded-bl-xl'} src={preview} />
                <div className={'w-[339px] h-[275px] border-[1px] border-b-gray-300 p-5 bg-white'}>
                  <div className={'flex items-center mb-3'}>
                    <img className={'w-[28px] h-[28px] rounded-full border-[1px] mr-3 object-cover'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} />
                    <p className={'font-bold text-sm'}>{user.username}</p>
                  </div>

                  <textarea className={'w-[290px] h-[175px] resize-none outline-none'} placeholder='문구 입력...'
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
                  <Smile />
                </div>
              </div>
              : null}
            {createStep == 4 ?
              <div className={'flex flex-col justify-start items-center'} onClick={() => { setCreateStep(0); window.location.href = `/profile` }}>
                <div className={'w-[658px] h-[658px] flex flex-col justify-center items-center'}>
                  <img src={Check} alt="" className={'w-40'} />
                  <div className={'text-2xl mt-4'}>게시물이 공유되었습니다.</div>
                </div>
              </div>
              : null}
          </Window>
        </Container>
        : null}

      {/* Navigatior */}
      <nav
        className={`fixed bg-white z-30 flex flex-col justify-between xs:items-start lg:items-start md:items-center sm:items-center trnasition-all duration-300 ${isSearch ? 'xs:w-[72px]' : 'xs:w-[244px]'} ${isSearch ? 'lg:w-[72px]' : 'lg:w-[244px]'} md:w-[72px] p-4 xs:h-screen lg:h-screen md:h-screen sm:w-screen sm:h-[72px] xs:border-r-[1px] lg:border-r-[1px] md:border-r-[1px] sm:border-b-[1px] border-gray-300`}>
        <div className="z-30 flex flex-col xs:items-start lg:items-start md:items-center sm:items-center">
          { isSearch ?
            <Link className={'block mt-[5px]'} to={'/'} onClick={() => sessionStorage.setItem('status', 'Home')}><InstagramMini /></Link>
          : <Link className={'xs:block lg:block md:hidden sm:hidden'} to={'/'} onClick={() => sessionStorage.setItem('status', 'Home')}><Instagram w={103} h={29} /></Link> }
          
          <Link className={'xs:hidden lg:hidden md:block sm:block'} to={'/'} onClick={() => sessionStorage.setItem('status', 'Home')}><InstagramMini /></Link>

          {/*XS, LG*/}
          <div className="z-30 xs:flex lg:flex md:hidden sm:hidden flex-col items-start">
            <Link className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} to={'/'} onClick={() => sessionStorage.setItem('status', 'Home')}>
              <span className={'mr-[15px] font-[noto]'}>{sessionStorage.getItem('status') === 'Home' ? <Home /> : <EmptyHome />}</span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>홈</p> }
            </Link>

            <div className={`cursor-pointer flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} onClick={() => setIsSearch(isSearch ? false : true)}>
              <span className={'mr-[15px] font-[noto]'}><Search /></span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>검색</p> }
            </div>

            <Link className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} to={''}>
              <span className={'mr-[15px] font-[noto]'}><Explore /></span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>탐색 탭</p> }
            </Link>

            <Link className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} to={''}>
              <span className={'mr-[15px] font-[noto]'}><Reels /></span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>릴스</p> }
            </Link>

            <Link className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} to={''}>
              <span className={'mr-[15px] font-[noto]'}><Message /></span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>메시지</p> }
            </Link>

            <Link className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} to={''}>
              <span className={'mr-[15px] font-[noto]'}><Heart w={24} h={24} /></span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>알림</p> }
            </Link>

            <button className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} onClick={() => setCreateStep(1)}>
              <span className={'mr-[15px] font-[noto]'}><Create /></span>
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>만들기</p> }
            </button>

            <a className={`flex justify-start items-end rounded-lg p-3 mb-2 ${isSearch ? 'w-[50px]' : 'w-[210px]'} hover:bg-gray-100`} href={`/profile/${user.username}`} onClick={() => sessionStorage.setItem('status', 'Profile')}>
              <img className={`w-[24px] h-[24px] ${isSearch ? '': 'mr-[15px]'} font-[noto] rounded-full object-cover`}
                src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt="" />
              { isSearch ? null : <p className={'font-[500] text-[16px]'}>프로필</p> }
            </a>
          </div>

          {/*MD, SM*/}
          <div className="xs:hidden lg:hidden md:block sm:block">
            <Link className={'flex justify-center items-end mb-8'} to={'/'}>
              <span className={'font-[noto]'}>{sessionStorage.getItem('status') === 'Home' ? <Home /> : <EmptyHome />}</span>
            </Link>

            <a className={'flex justify-center items-end mb-8'} href={''}>
              <span className={'font-[noto]'}><Search /></span>
            </a>

            <a className={'flex justify-center items-end mb-8'} href={''}>
              <span className={'font-[noto]'}><Explore /></span>
            </a>

            <a className={'flex justify-center items-end mb-8'} href={''}>
              <span className={'font-[noto]'}><Reels /></span>
            </a>

            <a className={'flex justify-center items-end mb-8'} href={''}>
              <span className={'font-[noto]'}><Message /></span>
            </a>

            <a className={'flex justify-center items-end mb-8'} href={''}>
              <span className={'font-[noto]'}><Heart w={24} h={24} /></span>
            </a>

            <button className={'flex justify-center items-end mb-8'} onClick={() => setCreateStep(1)}>
              <span className={'font-[noto]'}><Create /></span>
            </button>

            <Link className={'flex justify-center items-end mb-8'} to={'/profile'} onClick={() => sessionStorage.setItem('status', 'Profile')}>
              <img className={'w-[24px] h-[24px] font-[noto] rounded-full object-cover'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt='' />
            </Link>
          </div>
        </div>

        <a className={'flex justify-center items-end xs:ml-2 lg:ml-2 md:ml-0 sm:ml-0 mb-4'} href={''}>
          <span className={'font-[noto]'}><About /></span>
          { isSearch ? null : <p className={'font-[500] w-[100px] text-[16px] ml-[15px] xs:block lg:block md:hidden sm:hidden'}>더보기</p> }
        </a>

        <div className={`transition-all duration-300 fixed flex flex-col items-center ${isSearch ? 'ml-14' : '-ml-[450px]'} -mt-4 w-[397px] h-screen rounded-r-3xl border-[1px] border-gray-200 bg-white drop-shadow-2xl`}>
          <h2 className={'w-[350px] pt-6 mb-8 font-bold text-2xl'}>검색</h2>
          <input type="text" className={'w-[360px] h-[40px] pl-4 mb-8 rounded-lg bg-[#efefef]'} placeholder='검색' />
          
          <div className={'border-[0.9px] border-gray-200 w-[100%]'} />

          <div className={'pt-6 pl-6 w-[370px] font-bold'}>최근 검색 항목</div>
        </div>
      </nav>
    </Fragment>
  )
}