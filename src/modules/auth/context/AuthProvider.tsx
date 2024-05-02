import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearTokens, getTokens } from '../utils/token'
import useIsMountedRef from '../hook/useIsMountedRef'
import { initialise } from '../data/authSlice'
import { supabase } from '@src/modules/shared/utils/supabase'

interface AuthProviderProps {
  children: React.ReactNode
}

interface JwtPayload {
  exp: number
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef()
  const dispatch = useDispatch()

  const isValidToken = (token: string) => true

  useEffect(() => {
    if (!isMounted.current) {
      return
    }
    async function fetchUser() {
      const tokens = getTokens()
      if (tokens?.refresh_token && tokens?.refresh_token.length > 2) {
        if (tokens?.refresh_token && isValidToken(tokens?.refresh_token)) {
          const response = await supabase.auth.getUser()
          await supabase.auth.getSession()
          const user = response.data
          dispatch(initialise({ isAuthenticated: true, user }))
        } else {
          dispatch(initialise({ isAuthenticated: false, user: null }))
          clearTokens()
        }
      }
    }

    fetchUser()
  }, [])

  return <>{children}</>
}

export default AuthProvider
