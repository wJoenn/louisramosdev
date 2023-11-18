export type GhUser = {
  id: number
  avatar_url: string
  bio: string
  html_url: string
  location: string
  login: string
  name: string
  type: "User" | "Organization"
}

export type GhRepository = {
  id: number
  description: string
  full_name: string
  html_url: string
  language: string
  name: string
  forks_count: number
  stargazers_count: number
  starred: boolean
  pushed_at: string | Date

  owner: GhUser
}

export type GhReaction = {
  id: number
  user_id: number
  content: "+1" | "-1" | "confused" | "eyes" | "heart" | "hooray" | "laugh" | "rocket"
  reactable_type: "Github::Comment" | "Github::Issue" | "Github::Release"
}

export type GhIssue = {
  id: number
  feed_type: "GithubIssue"
  body: string
  html_url: string
  issue_type: "Issue" | "PullRequest"
  state: "closed" | "open"
  title: string
  number: number
  released_at: string | Date

  author: GhUser
  repository: GhRepository
  reactions: GhReaction[]
}

export type GhRelease = {
  id: number
  feed_type: "GithubRelease"
  body: string
  html_url: string
  name: string
  tag_name: string
  read: boolean
  released_at: string | Date

  author: GhUser
  repository: GhRepository
  reactions: GhReaction[]
}

export type GhComment = {
  id: number
  feed_type: "GithubComment"
  body: string
  html_url: string
  read: boolean
  released_at: string | Date

  author: GhUser
  issue: GhIssue
  reactions: GhReaction[]
}

export type GhFeedItem = GhComment | GhRelease
