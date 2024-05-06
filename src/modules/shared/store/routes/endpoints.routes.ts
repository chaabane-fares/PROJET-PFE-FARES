export const endpoints = {
  auth: {},
  getRepositories: 'user/repos',
  getPullRequests: `repos/:chaabane-fares/:PROJET-PFE-FARES/pulls`,
  getPullRequestsCommits: `repos/:user/:repo/pulls/:ref/commits`,
  getOneCommits: `repos/:user/:repo/commits/:ref`,
  getOneFileContent: `repos/:user/:repo/contents/:path?ref=:ref`,
  getOneFileChanges: `repos/:owner/:repo/commits/:sha`,
}
