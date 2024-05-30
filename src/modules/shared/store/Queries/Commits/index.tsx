import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endpoints.routes'
import { message } from 'antd'

export async function fetchGitHubPullRequestCommits(props: {
  repo: string
  user: string
  ref: string
}) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getPullRequestsCommits
        .replace(':user', user)
        .replace(':repo', repo)
        .replace(':ref', ref)
    )
    return response.data
  } catch (error) {
    message.error('Failed to get commits list')
  }
}

export async function fetchCommitChanges(props: { repo: string; user: string; ref: string }) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getOneCommitChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':commitSHA', ref),
      {
        headers: { Accept: 'application/vnd.github.v3.diff; charset=utf-8' },
      }
    )

    return response.data
  } catch (error) {
    message.error('Failed to get commit content')
  }
}

export async function fetchCommitContent(props: { repo: string; user: string; ref: string }) {
  const { user, repo, ref } = props
  try {
    const response = await axiosInstance.get(
      endpoints.getOneCommitChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':commitSHA', ref)
    )

    return response.data
  } catch (error) {
    message.error('Failed to get commit content')
  }
}
