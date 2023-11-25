import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Loader from '../Loader'
import Login from '../Pages/Auth/Login'
import Nav from '../Nav/Nav'
import Signup from '../Pages/Auth/Signup'
import Payment from '../Pages/Payment/Payment'
import NewsPage from '../Pages/News/NewsPage'

const Routers = () => {
  const [autheticated, setautheticated] = useState(false)


  useEffect(() => {
    setautheticated(localStorage.getItem('authenticated') ? true : false);
  }, []);
  return (


    <BrowserRouter basename="/">
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<PrivateRoutes />} >
              <Route path={`/news`} element={<><Nav loggedin={autheticated} /><NewsPage /></>} />
              <Route path={`/payment`} element={<><Nav loggedin={autheticated} /><Payment /></>} />
            </Route>

            <Route path={`/`} element={<><Nav loggedin={autheticated} /><h1>Home Page</h1></>} />
            <Route path={`/login`} element={<><Nav loggedin={autheticated} /><Login /></>} />
            <Route path={`/signup`} element={<><Nav loggedin={autheticated} /><Signup /></>} />
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  )
}

export default Routers