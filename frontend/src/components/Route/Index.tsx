import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Loader from '../Loader/Loader'
import Login from '../Pages/Auth/Login'
import Nav from '../Nav/Nav'
import Signup from '../Pages/Auth/Signup'
import Payment from '../Pages/Payment/Payment'
import NewsPage from '../Pages/News/NewsPage'

const Routers = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PrivateRoutes />} >
            <Route path={`/news/*`} element={<><NewsPage /></>} />
            <Route path={`/payment`} element={<><Payment /></>} />
          </Route>
          <Route path={`/`} element={<><Navigate to="/login" /></>} />
          <Route path={`/login`} element={<><Login /></>} />
          <Route path={`/signup`} element={<><Signup /></>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routers