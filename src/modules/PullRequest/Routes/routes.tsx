/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATH } from '@src/modules/auth/routes/paths'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

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
    guard: AuthGuard,
    path: PATH.PULLREQUEST,
    component: lazy(() => import('../index')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
