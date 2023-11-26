import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const authenticated = localStorage.getItem('auth')

  // Continue to Component only if authorized else redirect to login page
  if (authenticated && JSON.parse(authenticated).hash) {
    return <>{<Outlet />}</>
  }
  return <Navigate to="/login" />
}

export default PrivateRoutes