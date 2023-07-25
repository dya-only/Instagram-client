import { Fragment } from "react"
import { Routes, Route } from "react-router-dom"
import MainPage from "./pages/MainPage.tsx"
import Component from "./components/Navigator/component.tsx"

export default function App() {
  return (
    <Fragment>
      <Component />

      <Routes>
        <Route path={'/'} element={<MainPage/>}/>
      </Routes>
    </Fragment>
  )
}