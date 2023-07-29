import {Fragment} from "react"
import {Routes, Route} from "react-router-dom"
import Component from "./components/Navigator/component.tsx"
import MainPage from "./pages/MainPage.tsx"
import Profile from "./pages/Profile.tsx"
import Login from "./pages/Login.tsx"

export default function App() {
  return (
    <Fragment>
      <Component/>

      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </Fragment>
  )
}