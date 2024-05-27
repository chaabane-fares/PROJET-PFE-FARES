import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth)

  const checkAuth = status !== 'succeeded' || isAuthenticated
  return checkAuth ? children : <Navigate to="/login" />
}

export default AuthGuard
