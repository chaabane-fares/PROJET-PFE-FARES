import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PATH } from '../auth/routes/paths'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import emptyFile from '../shared/assets/images/folder_empty.png'
import { useAppSelector } from '../shared/store'
import { fetchCommitChanges, fetchCommitContent } from '../shared/store/Queries/Commits'
import { useEffect, useState } from 'react'
import { Modal, Tooltip } from 'antd'
import MainLayout from '../shared/layout/MainLayout/MainLayout'
import { fetchOneFileChangesContent } from '../shared/store/Queries/Files'
import ReviewButton from '../shared/components/Buttons/Review'
import StreamComponent from '../StreamComponent/StreamComponent'

const CommitPage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { id, commitId } = useParams()
  const [selectedFile, setSelectedFile] = useState<any>(undefined)
  const [selectedFileContent, setSelectedContent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const { data: fileContent } = useQuery({
    queryFn: () =>
      fetchOneFileChangesContent({
        repo: id!,
        owner: user?.user_metadata?.user_name,
        sha: `${commitId}`,
        path: selectedFile?.filename!,
      }),
    queryKey: ['commit-content', { selectedFile }],
    staleTime: Infinity,
    enabled: !!selectedFile,
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

  console.log({ fileContent })
  const prompt = fileContent?.content ? atob(fileContent?.content!) : ''

  function extractDiffContent(diffString: string, fileName: string) {
    const fileStartIndex = diffString?.indexOf(`diff --git a/${fileName} b/${fileName}`) // get the start  index of the selected file  ( Each file start with : diff --git a/fileName b/fileName )
    const stringLength = `diff --git a/${fileName} b/${fileName}`?.length // get the start paragraph length "diff --git a/fileName b/fileName "
    const fileEndIndex = diffString // the first index of  'diff --git' in the diffString excluding the ( fileStartIndex + stringLength )
      ?.slice(fileStartIndex + stringLength + 1)
      ?.indexOf('diff --git')
    const selectedFileDiff = diffString.slice(fileStartIndex, fileEndIndex)
    setSelectedContent(selectedFileDiff)
  }
  useEffect(() => {
    // nesst7a9oha bch yraj3elna kn l file eli 7achtna bih
    if (selectedFile?.filename) {
      extractDiffContent(diffString, selectedFile.filename)
    }
  }, [selectedFile])

  return (
    <MainLayout>
      <MainContainer
        linkProps={{
          links: [
            { name: 'repositories', href: PATH.REPO },
            { name: 'pull requests', href: PATH.PULLREQUEST.replace(':id', id!) },
            { name: 'commit', href: '' },
          ],
          title: commitContent?.commit?.message!,
        }}
        style={{ paddingBottom: 0 }}
      >
        <div className="one-commit-page">
          <div className="one-commit-page__files">
            <p className="one-commit-page__files__title">Files :</p>
            {commitContent?.files?.map((file: any) => (
              <div
                className={`one-commit-page__files__one-file ${
                  selectedFile?.path === file.filename
                    ? 'one-commit-page__files__one-file--active'
                    : ''
                }`}
                key={file.filename}
                onClick={() => setSelectedFile(file)}
              >
                <p className="one-commit-page__files__one-file__name">{file.filename}</p>
                <div className="one-commit-page__files__one-file__stats">
                  <Tooltip title={'deletions'} color={'#ef233c'}>
                    <span className="one-commit-page__file-changes one-commit-page__file-changes--delete">
                      {`${file?.deletions}`.padStart(2, '0')}
                    </span>
                  </Tooltip>
                  <Tooltip title={'additions'} color={'#2dc653'}>
                    <span className="one-commit-page__file-changes one-commit-page__file-changes--addition">
                      {`${file?.additions}`.padStart(2, '0')}
                    </span>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>

          <div className="one-commit-page__content">
            <p className="one-commit-page__files__title">File Content :</p>
            <div className="one-commit-page__content__blanc">
              <div className="one-commit-page__content__blanc__editor">
                {diffHtml ? (
                  <div className="code-diff__wrapper">
                    <div className="code-diff" dangerouslySetInnerHTML={{ __html: diffHtml }} />
                  </div>
                ) : (
                  <div className="one-commit-page__content__blanc__one-file">
                    <img
                      className="one-commit-page__content__blanc__one-file__src"
                      src={emptyFile}
                    />
                    <p className="one-commit-page__content__blanc__one-file__message">
                      no file selected
                    </p>
                  </div>
                )}
                {fileContent?.content ? (
                  <ReviewButton title={'review changes '} onClick={() => setIsModalOpen(true)} />
                ) : null}
              </div>
              <Modal
                title={'Code Review'}
                className="editor__modal"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
              >
                <StreamComponent prompt={prompt} />
              </Modal>
            </div>
          </div>
        </div>
      </MainContainer>
    </MainLayout>
  )
}

export default CommitPage
