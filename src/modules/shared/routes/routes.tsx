import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../auth/features/Repositories/Routes/routes'
import pullRoutes from '../../auth/features/PullRequest/Routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repoRoutes, ...pullRoutes]

export default routes
