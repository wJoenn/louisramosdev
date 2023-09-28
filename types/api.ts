export type GhLanguage = "Ruby" | "JavaScript" | "TypeScript" | "Zig"

export type GhReaction = {
  id: number
  user_id: number
  content: "+1" | "-1" | "confused" | "eyes" | "heart" | "hooray" | "laugh" | "rocket"
}

export type GhRelease = {
  id: number,
  name: string,
  tag_name: string,
  body: string,
  read: boolean,
  created_at: string | Date
  reactions: GhReaction[],
  repository: GhRepository,
  author: GhUser
}

export type GhRepository = {
  id: number,
  full_name: string,
  name: string,
  description: string,
  language: GhLanguage,
  starred: boolean,
  owner: GhUser
}

export type GhUser = {
  id: number,
  login: string,
  type: "User" | "Organization",
  avatar_url: string,
  html_url: string
}
