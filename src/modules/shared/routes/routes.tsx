import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../Repositories/Routes/routes'
import pullRoutes from '../../PullRequest/Routes/routes'
import commitRoutes from '../../OneCommit/Routes/routes'
import homeRoutes from '../../../home/routes'
import notFound from '../../NotFound/routes'
const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...repoRoutes,
  ...pullRoutes,
  ...commitRoutes,
  ...homeRoutes,
  ...notFound,
]

export default routes
