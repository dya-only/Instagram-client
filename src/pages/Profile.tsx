import { Fragment, useEffect, useState, useRef, ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

import Navigator from "../components/navigator/component"
import Setting from "../assets/svgs/Setting"
import ProfileGrid from "../assets/svgs/ProfileGrid"
import ProfileBookmark from "../assets/svgs/ProfileBookmark"
import ProfileTag from "../assets/svgs/ProfileTag"
import Close from "../assets/svgs/Close.tsx"
import { Container } from "../components/modal/container/component"
import { Window } from "../components/modal/window/component"
import Menu from "../assets/svgs/Menu.tsx"
import Chat from "../assets/svgs/Chat.tsx"
import Message from "../assets/svgs/Message.tsx"
import Bookmark from "../assets/svgs/Bookmark.tsx"
import HeartFill from "../assets/svgs/HeartFill.tsx"
import Heart from "../assets/svgs/Heart.tsx"
import BlackSmile from "../assets/svgs/BlackSmile.tsx"

export default function Profile() {
  const navigate = useNavigate()
  const { username } = useParams()
  const [section, setSection] = useState(0)
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
  const [uUser, setUuser] = useState({
    avatar: '',
    username: ''
  })
  const [posts, setPosts] = useState<any[]>()
  const [postDetail, setPostDetail] = useState({
    id: 0,
    img: '',
    content: '',
    likes: 0,
    author: 0,
  })
  const [comments, setComments] = useState<any[]>()
  const [isPostDetail, setIsPostDetail] = useState(false)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [postid, setPostid] = useState(0)
  const [ProfileImgModal, setProfileImgModal] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [comment, setComment] = useState<string>('')
  const [bookmarks, _] = useState<any[]>([])

  const userVerify = async () => {
    // AccessToken verify
    axios.post('/api/auth/by-token', { token: sessionStorage.getItem('TOKEN') }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data
      if (!res.success) navigate('/login')

      if (!username) {
        axios.get(`/api/user/${res.claims.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
          }
        }).then(_resp => {
          window.location.href = `/profile/${_resp.data.body.username}`
        })
      }

      setU(res.claims.id)
      axios.get(`/api/user/${res.claims.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
        }
      }).then(resp => {
        setUuser({
          avatar: resp.data.body.avatar,
          username: resp.data.body.username
        })
      })

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
          avatar: _resp.data.body.avatar,
          bookmarks: JSON.parse(_resp.data.body.bookmarks),
          likes: JSON.parse(_resp.data.body.likes),
          follower: JSON.parse(_resp.data.body.follower),
          following: JSON.parse(_resp.data.body.following)
        })

        // Get user posts
        axios.get(`/api/post/only/${_resp.data.body.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
          }
        }).then(_resp => {
          const res = _resp.data
          setPosts(res.body)
        })

        // Get user bookmarks
        JSON.parse(_resp.data.body.bookmarks).forEach((el: number) => {
          axios.get(`/api/post/${el}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
            }
          }).then(_resp => {
            const res = _resp.data
            bookmarks.push(res.body)
          })
        })
      })
    })
  }

  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    formData.append('avatar', e.target.files![0])
    formData.append('id', user.id.toString())

    axios.patch('/api/user/avatar', formData, {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}` }
    }).then(_ => {
      window.location.href = `/profile`
    })
  }

  const useDefaultAvatar = async () => {
    const formData = new FormData()

    formData.append('id', user.id.toString())

    axios.patch('/api/user/avatar', formData, {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}` }
    }).then(() => {
      window.location.href = '/profile'
    })
  }

  const getPostDetail = async (id: number) => {
    setPostid(id)

    axios.get(`/api/post/liked/${u}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      setIsLiked(resp.data.body)
    })

    axios.get(`/api/post/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      setPostDetail({
        id: res.body.id,
        img: res.body.img,
        content: res.body.content,
        likes: res.body.likes,
        author: res.body.author
      })
      setLikes(res.body.likes)

      axios.get(`/api/comment/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
        }
      }).then(resp => {
        const res = resp.data
        setComments(res.body)
      })
      setIsPostDetail(true)
    })
  }

  const AddLike = async () => {
    axios.patch(`/api/post/like/${postid}/${u}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(_ => {
      setIsLiked(true)
      setLikes(likes + 1)
    })
  }

  const RemoveLike = async () => {
    axios.delete(`/api/post/like/${postid}/${u}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(_ => {
      setIsLiked(false)
      setLikes(likes - 1)
    })
  }

  const uploadComment = async () => {
    if (comment != '') {
      axios.post('/api/comment', {
        author: u,
        postid: postid,
        avatar: uUser.avatar,
        username: uUser.username,
        content: comment,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
        }
      }).then(_ => {
        getPostDetail(postid)
        setComment('')
      })
    }
  }

  useEffect(() => {
    userVerify()
  }, [])

  return (
    <Fragment>
      {/* Modal Window */}
      {ProfileImgModal ?
        <Container>
          <Window w={400} h={223}>
            <div className={'w-full h-[80px] text-[20px] font-[500] flex justify-center items-center border-b-[1px] border-b-gray-200'}>
              프로필 사진 바꾸기
            </div>
            <button className={'w-full h-[48px] text-sm font-bold text-red-500 border-b-[1px] border-b-gray-200'}
              onClick={useDefaultAvatar}>현재 사진 삭제
            </button>
            <button className={'w-full h-[48px] text-sm font-bold text-blue-500 border-b-[1px] border-b-gray-200'}
              onClick={() => fileRef.current?.click()}>사진 업로드
            </button>
            <button className={'w-full h-[48px] text-[14px]'} onClick={() => setProfileImgModal(false)}>취소</button>

            <input type='file' ref={fileRef} className={'hidden'} onChange={uploadAvatar} />
          </Window>
        </Container>
        : null}

      {/* Post Detail */}
      {isPostDetail ?
        <Container>
          <div className={'z-10 fixed w-[98%] h-screen mt-8 flex justify-end items-start'} onClick={() => setIsPostDetail(false)}><Close /></div>
          <div className={'z-20 p-2 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col'}>
            <img src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${postDetail.img}`} alt='' className={'xl:w-[718px] lg:w-[718px] md:w-[400px] sm:w-[400px] xl:h-[718px] lg:h-[718px] md:h-[300px] sm:h-[300px] bg-black flex justify-center items-center object-contain xl:rounded-none lg:rounded-none md:rounded-t-xl sm:rounded-t-xl'} />
            <div className={'xs:w-[500px] lg:w-[500px] md:w-[400px] sm:w-[400px] xl:h-[718px] lg:h-[718px] md:h-[100px] sm:h-[100px] bg-white xl:rounded-r-md xl:rounded-l-none lg:rounded-r-md lg:rounded-l-none md:rounded-b-xl sm:rounded-b-xl'}>
              <div className={'h-[60px] border-b-[1px] flex justify-center items-center'}>
                <div className={'mr-[77%] flex items-center'}>
                  <img className={'w-[32px] h-[32px] mr-4 object-cover rounded-full'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt='' />
                  <div className={'font-[600]'}>{user.username}</div>
                </div>
                <Menu />
              </div>

              <div className={'h-[488px] border-b-[1px]'}>
                <div className={'m-4 flex items-start'}>
                  <img className={'w-[32px] h-[32px] mr-4 object-cover rounded-full'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt='' />
                  <div className={'font-[600] mr-2'}>{user.username}</div>
                  <div className={'max-w-[400px] font-lg text-[14px] mt-[2px]'}>{postDetail.content}</div>
                </div>

                {comments?.map((el, idx) => {
                  return <div key={idx} className={'m-4 flex items-center'}>
                    <a href={`/profile/${el.username}`}>
                      <img className={'w-[32px] h-[32px] mr-4 object-cover rounded-full'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${el.avatar}`} alt='' />
                    </a>
                    <div className={'flex flex-col'}>
                      <div className={'flex items-center'}>
                        <a href={`/profile/${el.username}`} className={'flex items-start'}>
                          <div className={'font-[600] text-[14px] mr-2'}>{el.username}</div>
                        </a>
                        <div className={'max-w-[400px] font-lg text-[14px]'}>{el.content}</div>
                      </div>
                      <div className={'flex items-center'}>
                        <div className={'text-gray-500 font-bold text-[12px] mr-4'}>좋아요 {el.like || 0}개</div>
                        <div className={'text-gray-500 font-bold text-[12px]'}>답글 달기</div>
                      </div>
                    </div>
                  </div>
                })}
              </div>

              <div className={'w-full flex justify-between items-center p-4'}>
                <div className={'flex items-center'}>
                  {isLiked ? <span onClick={RemoveLike}><HeartFill /></span> : <span onClick={AddLike}><Heart w={24} h={24} /></span>}
                  <span className={'w-4'} />
                  <Chat w={24} h={24} />
                  <span className={'w-4'} />
                  <Message />
                </div>

                <Bookmark />
              </div>
              <div className={'ml-4 mb-6 text-[14px] font-bold'}>좋아요 {likes}개</div>

              <div className={'h-[53px] border-t-[1px] flex justify-between'}>
                <div className={'flex items-center ml-4'}>
                  <BlackSmile />
                  <input type="text" placeholder="댓글 달기..." className={'ml-4 w-[200px] text-[14px] outline-none'} value={comment} onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)} />
                </div>
                <button className={comment != '' ? 'mr-4 text-[14px] font-[500] text-[#0095F6]' : 'mr-4 text-[14px] font-[500] text-[#D9ECFF]'} onClick={uploadComment}>게시</button>
              </div>
            </div>
          </div>
        </Container>
        : null}
      <Navigator />

      <div className={'w-screen flex flex-col items-center'}>
        <div className={'flex justify-center items-center mt-8 ml-[200px] mb-24'}>
          {user.id === u ?
            <img className={'w-[150px] h-[150px] mr-24 hover:brightness-90 cursor-pointer rounded-full object-cover'}
              src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt={''}
              onClick={() => setProfileImgModal(true)} />
            : <img className={'w-[150px] h-[150px] mr-24 rounded-full object-cover'}
              src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt={''} />}

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
                <Setting />
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
          <div className={'w-[950px] border-b-[1px] -ml-3'} />
          <div className={'flex items-center'}>
            <div className={`flex items-center h-[50px] border-t-[1px] ${section == 0 ? 'border-black' : 'border-none text-gray-600'} mr-16 cursor-pointer`} onClick={() => setSection(0)}>
              <ProfileGrid />
              <p className={`text-[13px] ${section == 0 ? 'font-semibold' : ''} ml-2`}>게시물</p>
            </div>

            <div className={`flex items-center h-[50px] mr-16 cursor-pointer border-t-[1px] ${section == 1 ? 'border-black' : 'border-none'}`} onClick={() => setSection(1)}>
              <ProfileBookmark />
              <p className={`text-[13px] ${section == 1 ? 'font-semibold text-black' : 'text-gray-600'} ml-2`}>저장됨</p>
            </div>

            <div className={'flex items-center h-[50px] cursor-pointer'}>
              <ProfileTag />
              <p className={'text-[13px] font-semibold ml-2 text-gray-600'}>태그됨</p>
            </div>
          </div>

          {section == 0 ?
            <div className={'w-[960px] flex justify-start items-start flex-wrap'}>
              {posts?.map((el, idx) => (
                <img key={idx} className={'z-10 w-[309px] h-[309px] object-cover mr-2 mb-2 hover:brightness-90 cursor-pointer'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${el.img}`} alt={''} onClick={() => getPostDetail(el.id)} />
              ))}
            </div>
            : <div className={'w-[960px] flex justify-start items-start flex-wrap'}>
              {bookmarks?.map((el, idx) => (
                <img key={idx} className={'z-10 w-[309px] h-[309px] object-cover mr-2 mb-2 hover:brightness-90 cursor-pointer'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${el.img}`} alt={''} onClick={() => getPostDetail(el.id)} />
              ))}
            </div>
          }
        </div>
      </div>
    </Fragment>
  )
}