export type GhReaction = {
  id: number
  user_id: number
  content: "+1" | "-1" | "confused" | "eyes" | "heart" | "hooray" | "laugh" | "rocket"
  reactable_type: "Github::Release"
}

export type GhRelease = {
  id: number
  name: string
  tag_name: string
  body: string
  html_url: string
  read: boolean
  released_at: string | Date
  reactions: GhReaction[]
  repository: GhRepository
  author: GhUser
}

export type GhRepository = {
  id: number
  full_name: string
  name: string
  description: string
  language: string
  starred: boolean
  stargazers_count: number
  forks_count: number
  html_url: string
  pushed_at: string | Date
  owner: GhUser
}

export type GhUser = {
  id: number
  login: string
  type: "User" | "Organization"
  avatar_url: string
  html_url: string
  name: string
  bio: string
  location: string
}
