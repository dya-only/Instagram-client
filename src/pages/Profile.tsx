import {Fragment, useEffect, useState, useRef, ChangeEvent} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {ModalContainer} from "../components/modal/ProfileImg/modalcontainer/component"
import {ModalWindow} from "../components/modal/ProfileImg/modalwindow/component"

import Navigator from "../components/navigator/component"
import Setting from "../assets/svgs/Setting"
import ProfileGrid from "../assets/svgs/ProfileGrid"
import ProfileBookmark from "../assets/svgs/ProfileBookmark"
import ProfileTag from "../assets/svgs/ProfileTag"

export default function Profile () {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    id: '',
    email: '',
    name: '',
    username: ''
  })
  const [profile, setProfile] = useState({
    profile: '',
    bookmark: [],
    like: [],
    follower: 0,
    following: 0
  })
  const [posts, setPosts] = useState<any[]>()
  const [ProfileImgModal, setProfileImgModal] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const userVerify = async () => {
    // AccessToken verify
    axios.post('/api/user/verify', { token: sessionStorage.getItem('TOKEN') }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data
      if (res.status !== 200) navigate('/login')

      setUser({ id: res.data.id, email: res.data.email, name: res.data.name, username: res.data.username })

      // Get user profile information
      axios.post('/api/user', { _id: res.data.id }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(_resp => {
        setProfile({ profile: _resp.data.profile, bookmark: _resp.data.bookmark, like: _resp.data.like, follower: _resp.data.follower, following: _resp.data.following })
      })

      // Get user posts
      axios.get(`/api/post/filter/${res.data.email}`, {
        headers: { 'Content-Type': 'application/json' }
      }).then(_resp => {
        const res = _resp.data
        setPosts(res)
      })
    })
  }

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files![0].name)

    let formData = new FormData()
    formData.append('file', e.target.files![0])
    formData.append('_id', user.id)

    axios.patch('/api/user/profile', formData)
      .then(resp => {
        console.log(resp)
      })
  }

  // const useDefault = async () => {

  // }

  useEffect(() => {
    if (!sessionStorage.getItem('TOKEN')) navigate('/login')
    userVerify()
  }, [])

  return (
    <Fragment>
      {/* Modal window */}
      { ProfileImgModal ?
        <ModalContainer>
          <ModalWindow>
            <div className={'w-full h-[80px] text-[20px] font-[500] flex justify-center items-center border-b-[1px] border-b-gray-200'}>프로필 사진 바꾸기</div>
            <button className={'w-full h-[48px] text-sm font-bold text-red-500 border-b-[1px] border-b-gray-200'}>현재 사진 삭제</button>
            <button className={'w-full h-[48px] text-sm font-bold text-blue-500 border-b-[1px] border-b-gray-200'} onClick={() => fileRef.current?.click()}>사진 업로드</button>
            <button className={'w-full h-[48px] text-[14px]'} onClick={() => setProfileImgModal(false)}>취소</button>

            <input type='file' ref={fileRef} className={'hidden'} onChange={uploadFile} />
          </ModalWindow>
        </ModalContainer>
      : null }

      <Navigator />

      <div className={'w-screen flex flex-col items-center'}>
        <div className={'flex justify-center items-center mt-8 ml-[200px] mb-24'}>
          <img className={'w-[150px] h-[150px] mr-24 hover:brightness-90 cursor-pointer rounded-full'} src={`/api/upload/profile/${profile.profile}`} alt={''} onClick={() => setProfileImgModal(true)} />

          <div>
            <div className={'flex items-center mb-4'}>
              <p className={'text-xl font-[500] mr-6'}>{ user.username }</p>
              <button className={'bg-[#efefef] pl-4 pr-4 pt-1 pb-1 rounded-lg text-[14px] font-bold mr-2 hover:brightness-90'}>프로필 편집</button>
              <button className={'bg-[#efefef] pl-4 pr-4 pt-1 pb-1 rounded-lg text-[14px] font-bold mr-4 hover:brightness-90'}>보관된 스토리 보기</button>
              <Setting />
            </div>

            <div className={'flex items-center mb-4'}>
              <p className={'text-[16px] mr-8'}>게시물 <strong>{ posts?.length }</strong></p>
              <p className={'text-[16px] mr-8'}>팔로워 <strong>{ profile.follower }</strong></p>
              <p className={'text-[16px]'}>팔로우 <strong>{ profile.following }</strong></p>
            </div>

            <p className={'text-[14px] font-[700]'}>{ user.name }</p>
          </div>
        </div>

        <div className={'flex flex-col justify-center items-center ml-[250px]'}>
          <div className={'w-[950px] border-b-[1px] -ml-3'} />
          <div className={'flex items-center'}>
            <div className={'flex items-center h-[50px] border-t-[1px] border-black mr-16 cursor-pointer'}>
              <ProfileGrid />
              <p className={'text-[13px] font-semibold ml-2'}>게시물</p>
            </div>

            <div className={'flex items-center h-[50px] mr-16 cursor-pointer'}>
              <ProfileBookmark />
              <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>저장됨</p>
            </div>

            <div className={'flex items-center h-[50px] cursor-pointer'}>
              <ProfileTag />
              <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>태그됨</p>
            </div>
          </div>

          <div className={'w-[960px] flex justify-start items-start flex-wrap'}>
            { posts?.map(el => (
                <img className={'w-[309px] h-[309px] object-cover mr-2 mb-2 hover:brightness-90 cursor-pointer'} src={`/api/upload/post/${el.img}`} alt={''} />
              )) }
          </div>
        </div>
      </div>
    </Fragment>
  )
}