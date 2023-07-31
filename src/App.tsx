import {useEffect} from "react"
import {Routes, Route, useNavigate} from "react-router-dom"
import MainPage from "./pages/MainPage.tsx"
import Profile from "./pages/Profile.tsx"
import Login from "./pages/Login.tsx"
import {authToken} from "./util/AuthToken.ts";

export default function App() {
  const navigate = useNavigate()

  const userVerify = async () => {
    if (!sessionStorage.getItem('TOKEN')) navigate('/login')

    authToken(sessionStorage.getItem('TOKEN')!)
      .then(resp => {
        if (resp!) {
          console.log(resp)
        } else {
          navigate('/login')
        }
      })
  }

  useEffect(() => {
    userVerify()
  }, [])

  return (
    <Routes>
      <Route path={'/'} element={<MainPage/>}/>
      <Route path={'/profile'} element={<Profile/>}/>
      <Route path={'/login'} element={<Login/>}/>
    </Routes>
  )
}