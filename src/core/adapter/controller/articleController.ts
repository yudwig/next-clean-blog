import {MetadataValuesPresentation} from "../output/article/metadataValuesPresentation";
import {GetArticleWithLinks} from "../../application/usecase/article/getArticleWithLinks";
import {ArticleDetailPresentation} from "../output/article/articleDetailPresentation";
import {GetMetadataValues} from "../../application/usecase/article/getMetadataValues";
import {SearchMetadataListWithLinks} from "../../application/usecase/article/searchMetadataListWithLinks";
import {ArticlePresenter} from "../presenter/articlePresenter";
import {ArticleDatabaseInterface, ArticleRepository} from "../../application/repository/articleRepository";
import {ConfigDatabaseInterface, ConfigRepository} from "../../application/repository/configRepository";
import {FileArticleDatabase} from "../../driver/database/article/file/fileArticleDatabase";
import {DotenvConfigDatabase} from "../../driver/database/config/dotenv/dotenvConfigDatabase";
import {ArticleListsPresentation} from "../output/article/articleListsPresentation";
import {Config} from "../../domain/model/config/entity/config";
import {GetConfig} from "../../application/usecase/config/getConfig";

export class ArticleController {

  private useCases: {
    getArticle: GetArticleWithLinks,
    getMetadataValues: GetMetadataValues,
    searchArticles: SearchMetadataListWithLinks,
  }

  private presenter: ArticlePresenter

  private repositories: {
    article: ArticleRepository
    config: ConfigRepository
  }

  private config: Config

  constructor(db: {article: ArticleDatabaseInterface, config: ConfigDatabaseInterface}) {
    this.repositories = {
      article: new ArticleRepository(db.article),
      config: new ConfigRepository(db.config)
    }
    const result = new GetConfig({
      config: this.repositories.config,
      article: this.repositories.article
    }).handle()
    this.config = result.config
    this.presenter = new ArticlePresenter(result)
    this.useCases = {
      getArticle: new GetArticleWithLinks({
        repository: this.repositories.article,
      }),
      getMetadataValues: new GetMetadataValues({
        repository: this.repositories.article
      }) ,
      searchArticles: new SearchMetadataListWithLinks({
        repository: this.repositories.article,
      }),
    }
  }

  static create(): ArticleController {
    return new ArticleController({
      article: FileArticleDatabase.createProd(),
      config: new DotenvConfigDatabase()
    })
  }

  getMetadataKindLists(): MetadataValuesPresentation {
    return this.presenter.createMetadataValuesPresentation(this.useCases.getMetadataValues.handle())
  }

  getArticle(slug: string): ArticleDetailPresentation {
    return this.presenter.createDetailPresentation(this.useCases.getArticle.handle({
      slug: slug,
      counts: {
        timeline: this.config.page.timelineLinksPerPage,
        side: this.config.page.sidebarLinksPerPage,
        recommended: this.config.page.recommendedLinksPerPage
      }
    }))
  }

  getTimelineLists(): ArticleListsPresentation {
    return this.presenter.createListsPresentation(this.useCases.searchArticles.handle({
      counts: {
        side: this.config.page.sidebarLinksPerPage
      }
    }))
  }

  getListsByTagName(tag: string): ArticleListsPresentation {
    return this.presenter.createListsPresentation(this.useCases.searchArticles.handle({
      tag: tag,
      counts: {
        side: this.config.page.sidebarLinksPerPage
      }
    }), tag)
  }

  getListsByCategoryName(category: string): ArticleListsPresentation {
    return this.presenter.createListsPresentation(this.useCases.searchArticles.handle({
      category: category,
      counts: {
        side: this.config.page.sidebarLinksPerPage
      }
    }), category)
  }

  getListsBySeriesName(seriesName: string): ArticleListsPresentation {
    return this.presenter.createListsPresentation(this.useCases.searchArticles.handle({
      seriesName: seriesName,
      counts: {
        side: this.config.page.sidebarLinksPerPage
      }
    }), seriesName)
  }
}
