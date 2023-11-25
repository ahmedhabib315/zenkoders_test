import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const navigate = useNavigate()
  const authenticated = localStorage.getItem('authenticated')

  if (authenticated === 'false' || authenticated === null) {
    return <Navigate to="/login" />
  }
  return <>{<Outlet />}</>
}

export default PrivateRoutes