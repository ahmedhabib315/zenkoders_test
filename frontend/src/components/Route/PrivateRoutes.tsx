import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const authenticated = localStorage.getItem('auth')

  if (authenticated && JSON.parse(authenticated).hash) {
    return <>{<Outlet />}</>
  }
  return <Navigate to="/login" />
}

export default PrivateRoutes