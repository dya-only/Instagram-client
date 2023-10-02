import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Menu from "../../assets/svgs/Menu.tsx"
import Heart from "../../assets/svgs/Heart.tsx"
import Chat from "../../assets/svgs/Chat.tsx"
import Message from "../../assets/svgs/Message.tsx"
import Bookmark from "../../assets/svgs/Bookmark.tsx"
import Emoji from "../../assets/svgs/Emoji.tsx"
import HeartFill from "../../assets/svgs/HeartFill.tsx"

export default function Post(props: {userid: number, id: number, author: number, content: string, img: string, likes: number }) {
  const [user, setUser] = useState({
    id: '',
    username: '',
    avatar: '' 
  })
  const [isLiked, setIsLiked] = useState(false)

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
      console.log(likes)
    })
  }

  const AddLike = async () => {
    axios.patch(`/api/post/like/${props.id}/${props.userid}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      console.log(res)
      setIsLiked(true)
    })
  }

  const RemoveLike = async () => {
    axios.delete(`/api/post/like/${props.id}/${props.userid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      console.log(res)
      setIsLiked(false)
    })

  }

  useEffect(() => {
    getAuthor()
    getUser()
  }, [])

  return (
    <div className={'w-[470px] pt-8 pb-8 flex flex-col items-center'}>
      <div className={'w-[470px] flex justify-between items-center mb-4'}>
        <Link className={'flex justify-start items-center cursor-pointer'} to={`/profile/${user.username}`}>
          <div className={'flex justify-center items-center'}>
            <img className={'absolute w-[32px] h-[32px] object-cover border-[0.5px] rounded-full'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${user.avatar}`} alt={''} />
            <div className={'rounded-full w-[36px] h-[36px] border-[1px]'}></div>
          </div>
          <div className={'font-bold text-black text-[13px] ml-3'}>{ user.username }</div>
        </Link>
        <Menu />
      </div>
      <img className={'w-[468px] rounded-md mb-4 min-h-[468px] max-h-[585px] object-cover'} src={`https://insta-clone-s3-bucket.s3.ap-northeast-2.amazonaws.com/${props.img}`} alt={''} />

      <div className={'w-full flex justify-between items-center mb-2'}>
        <div className={'flex items-center'}>
          { isLiked ? <span onClick={RemoveLike}><HeartFill /></span> : <span onClick={AddLike}><Heart w={24} h={24} /></span> }
          <span className={'w-4'} />
          <Chat w={24} h={24} />
          <span className={'w-4'} />
          <Message />
        </div>

        <Bookmark />
      </div>

      <p className={'w-full font-[700] text-[14px] mb-1 cursor-pointer'}>좋아요 { props.likes || 0 }개</p>

      <div className={'w-full flex justify-start items-start mb-1'}>
        <p className={'font-[700] text-[15px] mr-2 cursor-pointer hover:text-gray-400 transition duration-200'}>{ user.username }</p>
        <p className={'text-[14px]'}>{ props.content }</p>
      </div>

      <div className={'w-full flex'}>
        <textarea className={'w-[98%] h-6 focus:h-12 outline-none border-none text-sm mb-4 resize-none'} placeholder={'댓글 달기...'} />
        <Emoji w={13} h={13} />
      </div>
      <div className={'w-full border-b-[1px] border-gray-300'} />
    </div>
  )
}