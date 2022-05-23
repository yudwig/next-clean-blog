import {ConfigRecord} from "../../../../application/dto/record/configRecord";
import {ConfigDatabaseInterface, envNames} from "../../../../application/repository/configRepository";

export class DotenvConfigDatabase implements ConfigDatabaseInterface {

  fetch(): ConfigRecord {
    envNames.forEach(name => {
      if (process.env[name] === undefined) {
        throw Error(`Not defined ${name}.`)
      }
    })
    return {
      site: {
        title: process.env.SITE_TITLE!,
        createdYear: parseInt(process.env.SITE_CREATED_YEAR!, 10),
        authorId: process.env.SITE_AUTHOR_ID!,
      },
      page: {
        listArticlesPerPage: parseInt(process.env.LIST_ARTICLES_PER_PAGE!, 10),
        timelineLinksPerPage: parseInt(process.env.TIMELINE_LINKS_PER_PAGE!, 10),
        recommendedLinksPerPage: parseInt(process.env.RECOMMENDED_LINKS_PER_PAGE!, 10),
        sidebarLinksPerPage: parseInt(process.env.SIDEBAR_LINKS_PER_PAGE!, 10)
      }
    }
  }
}
