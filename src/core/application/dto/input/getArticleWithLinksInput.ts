export interface GetArticleWithLinksInput {

  slug: string

  counts: {

    timeline: number

    side: number

    recommended: number
  }
}
