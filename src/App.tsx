import {Routes, Route} from "react-router-dom"
import MainPage from "./pages/MainPage.tsx"
import Profile from "./pages/Profile.tsx"
import Login from "./pages/Login.tsx"
import SignUp from "./pages/SignUp.tsx"

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