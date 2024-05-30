import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PATH } from '../auth/routes/paths'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'

import MainContainer from '../shared/layout/MainContainer/MainContainer'
import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { useAppSelector } from '../shared/store'
import { fetchCommitChanges, fetchCommitContent } from '../shared/store/Queries/Commits'

const CommitPage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { id, commitId } = useParams()
  const { data: diffString } = useQuery({
    queryFn: () =>
      fetchCommitChanges({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: `${commitId}`,
      }),
    queryKey: ['commit-diff', { commitId }],
    staleTime: Infinity,
    enabled: !!commitId,
    cacheTime: 0,
  })

  const { data: commitContent } = useQuery({
    queryFn: () =>
      fetchCommitContent({
        repo: id!,
        user: user?.user_metadata?.user_name,
        ref: `${commitId}`,
      }),
    queryKey: ['commit-content', { commitId }],
    staleTime: Infinity,
    enabled: !!commitId,
    cacheTime: 0,
  })

  const diffHtml =
    diffString &&
    Diff2Html.html(diffString!, {
      inputFormat: 'diff',
      highlight: true,
      colorScheme: 'dark',
      outputFormat: 'line-by-line',
      drawFileList: true,
      DiffStyleType: 'char',
    })

  console.log({ files: commitContent?.files })
  return (
    <MainLayout>
      <MainContainer
        linkProps={{
          title: 'Commits',
          links: [
            { href: PATH.REPO, name: 'Repositories' },
            { href: PATH.PULLREQUEST.replace(':id', id!), name: 'pullRequests' },
            { href: PATH.ONECOMMIT.replace(':commitId', commitId!), name: 'commits' },
          ],
        }}
        style={{ paddingBottom: 0 }}
      >
        <div className="code-diff__wrapper">
          {!!diffHtml ? (
            <div className="code-diff" dangerouslySetInnerHTML={{ __html: diffHtml }} />
          ) : null}
        </div>
      </MainContainer>
    </MainLayout>
  )
}

export default CommitPage
