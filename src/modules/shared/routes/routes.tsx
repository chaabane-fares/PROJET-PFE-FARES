import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../Repositories/Routes/routes'
import pullRoutes from '../../PullRequest/Routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repoRoutes, ...pullRoutes]

export default routes
