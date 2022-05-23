import {ConfigRecord} from "../../../../application/dto/record/configRecord";

export class Config {

  readonly site: {

    title: string

    createdYear: number

    authorId: string
  }

  readonly page: {

    listArticlesPerPage: number

    timelineLinksPerPage: number

    recommendedLinksPerPage: number

    sidebarLinksPerPage: number
  }

  constructor(record: ConfigRecord) {

    if (record.site.title.length === 0) {
      throw new Error("Empty site title.")
    }
    if (record.site.title.length > 30) {
      throw new Error("Too long site title.")
    }
    if (record.site.authorId.length === 0) {
      throw new Error("Empty site authorId.")
    }
    if (record.site.authorId.length > 100) {
      throw new Error("Too long authorId.")
    }
    if (record.page.listArticlesPerPage <= 0) {
      throw new Error("listArticlesPerPage is too small.")
    }
    if (record.page.timelineLinksPerPage <= 0) {
      throw new Error("timelineLinksPerPage is too small.")
    }
    if (record.page.recommendedLinksPerPage <= 0) {
      throw new Error("recommendedLinksPerPage is too small.")
    }
    if (record.page.sidebarLinksPerPage <= 0) {
      throw new Error("sidebarLinksPerPage is too small.")
    }
    if (String(record.site.createdYear).length !== 4) {
      throw new Error("Invalid createYear format (yyyy).")
    }
    if (record.site.createdYear < 1900 || record.site.createdYear > 2100) {
      throw new Error("createdYear is out of range.")
    }
    this.page = record.page
    this.site = record.site
  }
}
