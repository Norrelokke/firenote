import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import LoginPage from './pages/LoginPage'
import Login from './components/Login'
import Register from './components/Register'
import LogoutPage from './pages/LogoutPage'
import MyProfile from './pages/MyProfile'
import UploadFolder from './components/UploadFolder'
import SingleFolder from './pages/SingleFolder'
import ReviewSingleFolder from './pages/ReviewSingleFolder'

function App() {

  return (
    <>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Register />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/folders/:foldername/:userid" element={<SingleFolder />} />
          <Route path="/revfolders/:foldername/:userid" element={<ReviewSingleFolder />} />       
             
          <Route path="/myprofile" element={
						<RequireAuth redirectTo="/login">
              <MyProfile /></RequireAuth>} />

              <Route path="/uploadfolder" element={
						<RequireAuth redirectTo="/login">
              <UploadFolder /></RequireAuth>} />
        </Routes>
      </div>
    </>
  )
}

export default App
