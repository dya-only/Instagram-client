import {Routes, Route} from "react-router-dom"
import MainPage from "./pages/mainpage.tsx"
import Profile from "./pages/profile.tsx"
import Login from "./pages/login.tsx"
import SignUp from "./pages/signup.tsx"

export default function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage/>}/>
      <Route path={'/profile'} element={<Profile/>}/>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/signup'} element={<SignUp/>}/>
    </Routes>
  )
}