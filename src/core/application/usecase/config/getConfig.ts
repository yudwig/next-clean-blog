import {ConfigRepository} from "../../repository/configRepository";
import {ArticleRepository} from "../../repository/articleRepository";
import {GetConfigResult} from "../../dto/result/getConfigResult";
import {AuthorId} from "../../../domain/model/article/value/authorId";

export class GetConfig {

  private repositories: {
    config: ConfigRepository,
    article: ArticleRepository
  }

  constructor(repositories: {config: ConfigRepository, article: ArticleRepository}) {
    this.repositories = repositories
  }

  handle(): GetConfigResult {
    const config = this.repositories.config.fetch()
    const siteAuthor = this.repositories.article.fetchAuthor(new AuthorId(config.site.authorId))
    if (siteAuthor === undefined) {
      throw new Error(`Not found siteAuthor. config.site.authorId: ${config.site.authorId}`)
    }
    return {
      config: config,
      siteAuthor: siteAuthor
    }
  }
}
