import { login } from '@src/modules/auth/data/authThunk'
import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppSelector } from '@src/modules/shared/store'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const App = () => {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)

//to set default path  : 
const navigate=useNavigate()
const dispatch=useDispatch()
const {isAuthenticated}=useAppSelector(state=>state.auth) 
const location = useLocation()
  const pathName = location.pathname
  useEffect(() => {
    if (pathName === '/' || !pathName) {
      if (!isAuthenticated) {
        navigate('/login') //we can use navigate(PATH.login)
      } else {
        navigate('/')
      }
    }
  }, [isAuthenticated, pathName])
  useEffect(()=>{
    dispatch<any>(login())
  },[])

  return (
    <div id={theme}>
      <Helmet>
        <title>Github code reviewer</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>{renderRoutes(routes)}</QueryClientProvider>
    </div>
  )
}

export default App
