import {AuthorRecord} from "./authorRecord";

export interface ArticleMetaRecord {
  title: string
  slug: string
  category: string
  tags: Array<string>
  published: string
  status: number
  image: string
  series?: {
    name: string
    index: number
  }
  overview: string
  author?: AuthorRecord
}

export interface ArticleRecord {

  meta: ArticleMetaRecord

  text: string
}
