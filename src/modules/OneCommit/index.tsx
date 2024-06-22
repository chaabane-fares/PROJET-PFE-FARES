import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PATH } from '../auth/routes/paths'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { useAppSelector } from '../shared/store'
import { fetchCommitChanges, fetchCommitContent } from '../shared/store/Queries/Commits'
import { useEffect, useState } from 'react'

const CommitPage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { id, commitId } = useParams()
  const [selectedFile ,setSelected]=useState(undefined) 
  const [selectedFileContent ,setSelectedContent]=useState("")
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
    selectedFileContent &&
    Diff2Html.html(selectedFileContent!, {
      inputFormat: 'diff',
      highlight: true,
      colorScheme: 'dark',
      outputFormat: 'line-by-line',
      drawFileList: true,
      DiffStyleType: 'char',
    })

  console.log("commit content",{ files: commitContent?.files })

  function extractDiffContent(diffString: string, fileName: string) {
    const fileStartIndex = diffString?.indexOf(`diff --git a/${fileName} b/${fileName}` );// get the start  index of the selected file  ( Each file start with : diff --git a/fileName b/fileName )
    const stringLength = `diff --git a/${fileName} b/${fileName}`?.length;// get the start paragraph length "diff --git a/fileName b/fileName " 
    const fileEndIndex = diffString// the first index of  'diff --git' in the diffString excluding the ( fileStartIndex + stringLength )
      ?.slice( fileStartIndex + stringLength +1)
      ?.indexOf('diff --git')
    const selectedFileDiff= diffString.slice(fileStartIndex,fileEndIndex)
    setSelectedContent(selectedFileDiff)
  }
  useEffect(()=>{  // nesst7a9oha bch yraj3elna kn l file eli 7achtna bih
    if (selectedFile?.filename){
      extractDiffContent(diffString , selectedFile.filename)
    }
  },[selectedFile])


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
        <div>
          {commitContent?.files.map((file)=><p onClick={()=>setSelected(file)} style={{color:"white"}}>{file.filename}</p>)}
        </div>
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
