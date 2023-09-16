import {Fragment, useEffect, useState, useRef, ChangeEvent} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

import Navigator from "../components/navigator/component"
import Setting from "../assets/svgs/Setting"
import ProfileGrid from "../assets/svgs/ProfileGrid"
import ProfileBookmark from "../assets/svgs/ProfileBookmark"
import ProfileTag from "../assets/svgs/ProfileTag"
import {Container} from "../components/modal/container/component"
import {Window} from "../components/modal/window/component"

import Default from '../assets/imgs/profile.jpg'

export default function Profile() {
  const navigate = useNavigate()
  const {username} = useParams()

  const [u, setU] = useState<number>()
  const [user, setUser] = useState({
    id: 0,
    email: '',
    name: '',
    username: '',
    avatar: '',
    bookmarks: [],
    likes: [],
    follower: 0,
    following: 0
  })
  const [posts, setPosts] = useState<any[]>()
  const [ProfileImgModal, setProfileImgModal] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const userVerify = async () => {
    // AccessToken verify
    axios.post('/api/auth/verify', {token: sessionStorage.getItem('TOKEN')}, {
      headers: {'Content-Type': 'application/json'}
    }).then(resp => {
      const res = resp.data
      if (!res.success) navigate('/login')

      if (!username) {
        axios.get(`/api/user/${res.body.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
          }
        }).then(_resp => {
          console.log(_resp.data)
          window.location.href = `/profile/${_resp.data.body.username}`
        })
      }

      setU(res.body.id)

      // Get user profile information
      axios.get(`/api/user/name/${username}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
        }
      }).then(_resp => {
        if (_resp.data.body == null) navigate('/profile')

        setUser({
          id: _resp.data.body.id,
          email: _resp.data.body.email,
          name: _resp.data.body.name,
          username: _resp.data.body.username,
          avatar: _resp.data.body.avatar.url,
          bookmarks: JSON.parse(_resp.data.body.bookmarks),
          likes: JSON.parse(_resp.data.body.likes),
          follower: _resp.data.body.follower,
          following: _resp.data.body.following
        })

        // Get user posts
        axios.get(`/api/post/@me/${_resp.data.body.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
          }
        }).then(_resp => {
          const res = _resp.data
          setPosts(res.body)
        })
      })
    })
  }

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files![0].name)

    const formData = new FormData()
    formData.append('avatar', e.target.files![0])
    formData.append('id', user.id.toString())

    axios.patch('/api/user/avatar', formData, {
      headers: {'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`}
    })
      .then(resp => {
        console.log(resp)
        window.location.href = `/profile`
      })
  }

  const useDefault = async () => {
    const formData = new FormData()
    formData.append('avatar', '')
    formData.append('id', user.id.toString())

    axios.patch('/api/user/avatar', formData, {
      headers: {'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`}
    })
      .then(() => {
        window.location.href = '/profile'
      })
  }

  useEffect(() => {
    userVerify()
  }, [])

  return (
    <Fragment>
      {/* Modal window */}
      {ProfileImgModal ?
        <Container>
          <Window w={400} h={223}>
            <div
              className={'w-full h-[80px] text-[20px] font-[500] flex justify-center items-center border-b-[1px] border-b-gray-200'}>프로필
              사진 바꾸기
            </div>
            <button className={'w-full h-[48px] text-sm font-bold text-red-500 border-b-[1px] border-b-gray-200'}
                    onClick={useDefault}>현재 사진 삭제
            </button>
            <button className={'w-full h-[48px] text-sm font-bold text-blue-500 border-b-[1px] border-b-gray-200'}
                    onClick={() => fileRef.current?.click()}>사진 업로드
            </button>
            <button className={'w-full h-[48px] text-[14px]'} onClick={() => setProfileImgModal(false)}>취소</button>

            <input type='file' ref={fileRef} className={'hidden'} onChange={uploadFile}/>
          </Window>
        </Container>
        : null}

      <Navigator/>

      <div className={'w-screen flex flex-col items-center'}>
        <div className={'flex justify-center items-center mt-8 ml-[200px] mb-24'}>
          {user.id === u ?
            <img className={'w-[150px] h-[150px] mr-24 hover:brightness-90 cursor-pointer rounded-full object-cover'}
                 src={`${user.avatar || Default}`} alt={''}
                 onClick={() => setProfileImgModal(true)}/>
            : <img className={'w-[150px] h-[150px] mr-24 rounded-full object-cover'}
                   src={`${user.avatar || Default}`} alt={''}/>}

          <div>
            {user.id === u ?
              <div className={'flex items-center mb-4'}>
                <p className={'text-xl font-[500] mr-6'}>{user.username}</p>
                <button
                  className={'bg-[#efefef] pl-4 pr-4 pt-1 pb-1 rounded-lg text-[14px] font-bold mr-2 hover:brightness-90'}>프로필
                  편집
                </button>
                <button
                  className={'bg-[#efefef] pl-4 pr-4 pt-1 pb-1 rounded-lg text-[14px] font-bold mr-4 hover:brightness-90'}>보관된
                  스토리 보기
                </button>
                <Setting/>
              </div>
              : <div className={'flex items-center mb-4'}>
                <p className={'text-xl font-[500] mr-6'}>{user.username}</p>
              </div>
            }

            <div className={'flex items-center mb-4'}>
              <p className={'text-[16px] mr-8'}>게시물 <strong>{posts?.length}</strong></p>
              <p className={'text-[16px] mr-8'}>팔로워 <strong>{user.follower}</strong></p>
              <p className={'text-[16px]'}>팔로우 <strong>{user.following}</strong></p>
            </div>

            <p className={'text-[14px] font-[700]'}>{user.name}</p>
          </div>
        </div>

        <div className={'flex flex-col justify-center items-center ml-[250px]'}>
          <div className={'w-[950px] border-b-[1px] -ml-3'}/>
          <div className={'flex items-center'}>
            <div className={'flex items-center h-[50px] border-t-[1px] border-black mr-16 cursor-pointer'}>
              <ProfileGrid/>
              <p className={'text-[13px] font-semibold ml-2'}>게시물</p>
            </div>

            <div className={'flex items-center h-[50px] mr-16 cursor-pointer'}>
              <ProfileBookmark/>
              <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>저장됨</p>
            </div>

            <div className={'flex items-center h-[50px] cursor-pointer'}>
              <ProfileTag/>
              <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>태그됨</p>
            </div>
          </div>

          <div className={'w-[960px] flex justify-start items-start flex-wrap'}>
            {posts?.map((el, idx) => (
              <img key={idx} className={'w-[309px] h-[309px] object-cover mr-2 mb-2 hover:brightness-90 cursor-pointer'} src={`${el.img.url}`} alt={''}/>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}