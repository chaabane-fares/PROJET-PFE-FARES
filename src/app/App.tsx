import { login } from '@src/modules/auth/data/authThunk'
import LoadingScreen from '@src/modules/shared/components/Loading'
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

const App = () => {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)

  //to set default path  :
  const dispatch = useAppDispatch()
  const { isAuthenticated, status } = useAppSelector((state) => state.auth)

  useEffect(() => {
    !isAuthenticated && dispatch(login())
  }, [])
  if (status === 'loading')
    return (
      <UniverseWrapper>
        <LoadingScreen size="full" />
      </UniverseWrapper>
    )
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
