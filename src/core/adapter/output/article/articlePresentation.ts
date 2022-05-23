import {AuthorPresentation} from "./authorPresentation";

export interface ArticlePresentation {

  slug: string

  title: string

  category: string

  tags: Array<string>

  published: string

  image: {

    title: string

    path: string

  }

  overview: string

  series: {

    name: string

    index: number

  } | null

  body: string

  author: AuthorPresentation
}
