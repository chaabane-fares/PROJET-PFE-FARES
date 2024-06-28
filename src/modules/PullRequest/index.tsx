import { fetchGitHubPullRequests } from '@src/modules/shared/store/Queries/PullRequest'
import { Collapse } from 'antd'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import Commits from './Commits/commits'
import './index.scss'
import OnePullRequest from './OnePullRequest'
import LoadingScreen from '@src/modules/shared/components/Loading'
import NoData from '@src/modules/shared/components/NoData'
import { PATH } from '../auth/routes/paths'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { useAppSelector } from '../shared/store'

export default function PullRequest() {
  const { user } = useAppSelector((state) => state.auth)
  const { id } = useParams()
  const { data: pullRequests, isLoading } = useQuery({
    queryFn: () => fetchGitHubPullRequests({ user: user?.user_metadata?.user_name, repo: id! }), // for getting just the name of the user no more information
    queryKey: ['pullRequests', {}],
    staleTime: Infinity,
    cacheTime: 1,
  })

  return (
    <MainLayout>
      <MainContainer
        linkProps={{
          title: 'pullRequest',
          links: [
            { href: PATH.REPO, name: 'Repositories' },
            { href: PATH.PULLREQUEST, name: 'pullRequests' },
          ],
        }}
        style={{ paddingBottom: 0 }}
      >
        {isLoading ? (
          <LoadingScreen size="full" />
        ) : !pullRequests || pullRequests?.length === 0 ? (
          <NoData title={'No pull requests'} />
        ) : (
          <Collapse
            items={pullRequests?.map((pull: any) => ({
              key: `${pull.number}`,
              label: <OnePullRequest pull={pull} />, // pull request header
              // pull request commits list
              children: <Commits CommitId={pull.number} />,
            }))}
          />
        )}
      </MainContainer>
    </MainLayout>
  )
}
