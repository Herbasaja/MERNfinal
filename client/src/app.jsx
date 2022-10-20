import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'

function app() {
  return (
    <>
        <Toaster position='top-right' toastOptions={{style: {fontSize: '1.8rem'}}}></Toaster>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/auth' element={<Auth />}></Route>
        </Routes>
    </>
  )
}

export default app