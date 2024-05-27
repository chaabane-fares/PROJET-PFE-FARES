import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import './index.scss'
import { PATH } from '../auth/routes/paths'
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew'
import LoadingScreen from '../shared/components/Loading'
import NoData from '../shared/components/NoData'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { fetchGitHubRepositories } from '../shared/store/Queries/Repositories'

export default function Repositories() {
  const navigate = useNavigate()

  const { data: repositories, isLoading } = useQuery({
    queryFn: () => fetchGitHubRepositories(),
    queryKey: ['repositories', {}],
    staleTime: Infinity, // pour contrôler la durée pendant laquelle les données mises en cache sont considérées comme "stalles" (périmées).
    cacheTime: 1, // pour contrôler la durée pendant laquelle les données mises en cache sont conservées en mémoire.
  })
  const handleRepoClick = (repo: string) => {
    navigate(PATH.PULLREQUEST.replace(':id', repo))
  }

  return (
    <MainLayout>
      <MainContainer // same as div : feha le continue as children feha css mte3ha 7a4err
        linkProps={{
          title: 'Repositories', // titre of the page
          links: [{ href: PATH.REPO, name: 'repositories' }],
        }}
        style={{ paddingBottom: 0 }}
      >
        {isLoading ? (
          <LoadingScreen blur size="full" /> // if the fetching is not finished yet
        ) : (
          <div className="repositories-container">
            {!repositories || repositories?.length == 0 ? (
              <NoData title={`no repositories in your account GitHub`} />
            ) : (
              repositories?.map((repo: { name: string; visibility: string }, i: number) => (
                <CardSkew autoColors={i + 1}>
                  <div
                    className="repositories-container__card"
                    onClick={() => handleRepoClick(repo?.name)}
                  >
                    <p className="repositories-container__card__title">{repo?.name}</p>
                    <div className="repositories-container__card__visibility">
                      <p className="repositories-container__card__visibility__status">
                        {' '}
                        {repo?.visibility}
                      </p>
                    </div>
                  </div>
                </CardSkew>
              ))
            )}
          </div>
        )}
      </MainContainer>
    </MainLayout>
  )
}
