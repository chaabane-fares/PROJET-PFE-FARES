import { useAppSelector } from "@src/modules/shared/store"
import { fetchGitHubPullRequestCommits } from "@src/modules/shared/store/Queries/Commits"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export default function Commits({PullId}:{PullId:number}) {
    const { id } = useParams()
  const { user } = useAppSelector((state) => state.auth)
    const { data: commits, isLoading: isCommitsLoading } = useQuery({
        queryFn: () =>
          fetchGitHubPullRequestCommits({
            repo: id!,
            user: user?.user?.user_metadata?.user_name,
            ref: `${PullId}`, 
          }),
        queryKey: ['pullRequestsCommits', { PullId }],
        staleTime: Infinity,
        enabled: !!PullId,
        cacheTime: 0,
      })
      console.log(commits)
  return (
    <div>Commits</div>
  )
}
