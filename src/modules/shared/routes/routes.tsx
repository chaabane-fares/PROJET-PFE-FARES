import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../Repositories/Routes/routes'
import pullRoutes from '../../PullRequest/Routes/routes'
import commitRoutes from '../../Commit/Routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repoRoutes, ...pullRoutes, ...commitRoutes]

export default routes
