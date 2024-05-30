import { fetchGitHubPullRequestCommits } from '@src/modules/shared/store/Queries/Commits'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '@src/modules/shared/store'
import LoadingScreen from '@src/modules/shared/components/Loading'
import { PATH } from '@src/modules/auth/routes/paths'
import * as dayjs from 'dayjs'
import '../Commits/index.scss'

export default function Commits({ CommitId }: { CommitId: number }) {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const { data: commits, isLoading: isCommitsLoading } = useQuery({
    queryFn: () =>
      fetchGitHubPullRequestCommits({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: `${CommitId}`,
      }),
    queryKey: ['Commits', { CommitId }],
    staleTime: Infinity,
    enabled: !!CommitId,
    cacheTime: 0,
  })

  const navigate = useNavigate()
  const handleCommitClick = (commitSha: string, message: string) => {
    navigate(
      `${PATH.ONECOMMIT.replace(':commits', message)
        .replace(':commitId', commitSha)
        .replace(':id', `${id}`)}`
    )
  }

  interface ICommit {
    sha: string

    committer: { avatar_url: string }
    commit: { message: string; committer: { date: string } }
  }
  return (
    <div className="one-commit-container">
      <div className="one-commit-container__head">
        <p className="one-commit-container__head__title">Commits List:</p>
      </div>
      {isCommitsLoading ? (
        <LoadingScreen blur size="s" />
      ) : (
        commits?.map((commit: ICommit) => (
          <div
            className="one-commit-container__content "
            onClick={() => handleCommitClick(commit.sha, commit?.commit?.message)}
          >
            <div className="one-commit-container__content__left">
              <img
                className="one-commit-container__content__left__avatar"
                src={commit?.committer?.avatar_url}
                alt="avatar"
              />
              <p className="one-commit-container__content__left__message">
                {commit?.commit?.message}
              </p>
            </div>
            <div className="one-commit-container__content__right">
              <p className="one-commit-container__content__right__message">
                {dayjs(commit?.commit?.committer?.date).format('YYYY-MM-DD/HH:mm')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
