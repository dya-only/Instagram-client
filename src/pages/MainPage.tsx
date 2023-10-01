import {Fragment, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

import Navigator from '../components/navigator/component.tsx'
import Story from "../components/story/component.tsx"
import Post from "../components/post/component.tsx"
import Recommend from "../components/recommned/component.tsx"

export default function MainPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [userid, setUserid] = useState(0)
  let id: number
  let next: number = 0

  const userVerify = async () => {
    axios.post('/api/auth/by-token', {token: sessionStorage.getItem('TOKEN')}, {
      headers: {'Content-Type': 'application/json'}
    }).then(resp => {
      const res = resp.data
      if (!res.success) navigate('/login')

      id = res.claims.id
      setUserid(res.claims.id)
      getPosts()
    })
  }

  const getPosts = async () => {
    axios.get(`/api/post/recommend/${id}/${next}`, { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
      }
    }).then(resp => {
      const res = resp.data
      setPosts(res.body)
    })
  }

  useEffect(() => {
    userVerify()
  }, [])

  return (
    <Fragment>
      <Navigator/>

      <div className={'w-screen flex justify-center items-start'}>
        <div
          className={'w-[600px] flex flex-col justify-start items-center mt-[45px] mr-20 xs:ml-[250px] lg:ml-[250px] md:ml-28 sm:ml-28'}>
          <div className={'w-full h-[100px] flex justify-start items-center overflow-x-scroll p-1 pr-4'}>
            <Story /><Story /><Story /><Story /><Story /><Story /><Story /><Story /><Story />
          </div>

          <div className={'w-full flex flex-col justify-start items-center mt-6'}>
            { posts.map((el: { id: number, author: number, content: string, img: string, likes: number }, idx: number) => {
              return <Post key={idx} userid={userid} id={el.id} author={el.author} content={el.content} img={el.img} likes={el.likes} />
            }) }
          </div>
        </div>

        <Recommend/>
      </div>
    </Fragment>
  )
}