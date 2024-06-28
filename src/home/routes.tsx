import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import { PATH } from '@src/modules/auth/routes/paths'
import GuestGuard from '@src/modules/shared/guards/GuestGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.HOME,
    component: lazy(() => import('./App')),
    layout: (props: any) => <Fragment {...props} />,
  },
]

export default routes
