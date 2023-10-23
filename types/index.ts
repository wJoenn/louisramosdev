export * from "./api/Github.ts"

export type Blog = {
  cover_url: string
  description: string
  title: string
  date: number
  resources?: string[][]
  _id: string
  _path: string
}

export type Tool = {
  name: string
  description: string
  image_url: string
  url: string
}
