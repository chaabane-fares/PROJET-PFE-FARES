import { PATH } from '@src/modules/auth/routes/paths'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  console.log(isAuthenticated)
  return isAuthenticated ? <Navigate to={PATH.HOME} /> : children

}

export default GuestGuard
