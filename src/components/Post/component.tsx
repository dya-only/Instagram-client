import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Menu from "../../assets/svgs/Menu.tsx"
import Heart from "../../assets/svgs/Heart.tsx"
import Chat from "../../assets/svgs/Chat.tsx"
import Message from "../../assets/svgs/Message.tsx"
import Bookmark from "../../assets/svgs/Bookmark.tsx"
import Emoji from "../../assets/svgs/Emoji.tsx"
import HeartFill from "../../assets/svgs/HeartFill.tsx"
import Close from "../../assets/svgs/Close.tsx"
import { Container2 } from "../modal/container2/component.tsx"

export default function Post(props: { userid: number, id: number, author: number, content: string, img: string, likes: number }) {
  const [user, setUser] = useState({
    id: '',
    username: '',
    avatar: ''
  })
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [commentsCnt, setCommentsCnt] = useState(0)
  const [comments, setComments] = useState<any[]>()
  const [isPostDetail, setIsPostDetail] = useState(false)

  const getAuthor = async () => {
    axios.get(`/api/user/${props.author}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      setUser({ id: res.body.id, username: res.body.username, avatar: res.body.avatar })
    })
  }

  const getUser = async () => {
    axios.get(`/api/user/${props.userid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      const likes = res.body.likes

      setIsLiked(likes.includes(props.id))
      setLikes(props.likes || 0)
    })
  }

  const getComments = async () => {
    axios.get(`/api/comment/${props.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      setCommentsCnt(res.body.length)
      setComments(res.body)
    })
  }

  const AddLike = async () => {
    axios.patch(`/api/post/like/${props.id}/${props.userid}`, {}, {
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
    axios.delete(`/api/post/like/${props.id}/${props.userid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(_ => {
      setIsLiked(false)
      setLikes(likes - 1)
    })
  }

  useEffect(() => {
    getAuthor()
    getUser()
    getComments()
  }, [])

  return (
    <Fragment>
      {/* Post Detail */}
      {isPostDetail ?
        <Container2>
          <div className={'z-40 fixed w-[98%] h-screen mt-8 flex justify-end items-start'} onClick={() => setIsPostDetail(false)}><Close /></div>
          <div className={'z-50 p-2 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col'}>
            <img src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${props.img}`} alt='' className={'xl:w-[718px] lg:w-[718px] md:w-[400px] sm:w-[400px] xl:h-[718px] lg:h-[718px] md:h-[300px] sm:h-[300px] bg-black flex justify-center items-center object-contain xl:rounded-none lg:rounded-none md:rounded-t-xl sm:rounded-t-xl'} />
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
                  <div className={'max-w-[400px] font-lg text-[14px] mt-[2px]'}>{props.content}</div>
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

              <div className={'w-full flex justify-between items-center mb-2 p-4'}>
                <div className={'flex items-center'}>
                  {isLiked ? <span onClick={RemoveLike}><HeartFill /></span> : <span onClick={AddLike}><Heart w={24} h={24} /></span>}
                  <span className={'w-4'} />
                  <Chat w={24} h={24} />
                  <span className={'w-4'} />
                  <Message />
                </div>

                <Bookmark />
              </div>
            </div>
          </div>
        </Container2>
        : null}
      <div className={'w-[470px] pt-8 pb-8 flex flex-col items-center'}>
        <div className={'w-[470px] flex justify-between items-center mb-4'}>
          <Link className={'flex justify-start items-center cursor-pointer'} to={`/profile/${user.username}`}>
            <div className={'flex justify-center items-center'}>
              <img className={'absolute w-[32px] h-[32px] object-cover border-[0.5px] rounded-full'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt={''} />
              <div className={'rounded-full w-[36px] h-[36px] border-[1px]'}></div>
            </div>
            <div className={'font-bold text-black text-[13px] ml-3'}>{user.username}</div>
          </Link>
          <Menu />
        </div>
        <img className={'w-[468px] rounded-md mb-4 min-h-[468px] max-h-[585px] object-cover'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${props.img}`} alt={''} />

        <div className={'w-full flex justify-between items-center mb-2'}>
          <div className={'flex items-center'}>
            {isLiked ? <span onClick={RemoveLike}><HeartFill /></span> : <span onClick={AddLike}><Heart w={24} h={24} /></span>}
            <span className={'w-4'} />
            <Chat w={24} h={24} />
            <span className={'w-4'} />
            <Message />
          </div>

          <Bookmark />
        </div>

        <p className={'w-full font-[700] text-[14px] mb-1 cursor-pointer'}>좋아요 {likes}개</p>

        <div className={'w-full flex justify-start items-start mb-1'}>
          <p className={'font-[700] text-[15px] mr-2 cursor-pointer hover:text-gray-400 transition duration-200'}>{user.username}</p>
          <p className={'text-[14px]'}>{props.content}</p>
        </div>

        <div className={'w-full text-gray-500 text-[14px] cursor-pointer'} onClick={() => setIsPostDetail(true)}>댓글 {commentsCnt || 0}개 모두 보기</div>

        <div className={'w-full flex'}>
          <textarea className={'w-[98%] h-6 focus:h-12 outline-none border-none text-sm mb-4 resize-none'} placeholder={'댓글 달기...'} />
          <Emoji w={13} h={13} />
        </div>
        <div className={'w-full border-b-[1px] border-gray-300'} />
      </div>
    </Fragment>

  )
}