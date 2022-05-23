export interface ConfigRecord {

  site: {

    title: string

    createdYear: number

    authorId: string
  }

  page: {

    listArticlesPerPage: number

    timelineLinksPerPage: number

    recommendedLinksPerPage: number

    sidebarLinksPerPage: number
  }
}
