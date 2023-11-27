import { Navigate, Outlet } from 'react-router-dom'
import { getValueFromLocalStorage } from '../../helpers/common-functions'

const PrivateRoutes = () => {
  const authenticated = getValueFromLocalStorage('auth')

  // Continue to Component only if authorized else redirect to login page
  if (authenticated && authenticated.hash) {
    return <>{<Outlet />}</>
  }
  return <Navigate to="/login" />
}

export default PrivateRoutes