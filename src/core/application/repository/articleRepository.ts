import {ArticleMetaRecord, ArticleRecord} from "../dto/record/articleRecord";
import {Article} from "../../domain/model/article/entity/article";
import {ArticleFactory} from "../../domain/model/article/factory/articleFactory";
import {AuthorRecord} from "../dto/record/authorRecord";
import {Author} from "../../domain/model/article/entity/author";
import {MetadataList} from "../../domain/model/article/collection/metadataList";
import {MetadataValues} from "../../domain/model/article/collection/metadataValues";
import {MetadataValuesRecord} from "../dto/record/metadataValuesRecord";
import {ArticleSearchQuery} from "../dto/query/articleSearchQuery";
import {Metadata} from "../../domain/model/article/entity/metadata";
import {Slug} from "../../domain/model/article/value/slug";
import {AuthorId} from "../../domain/model/article/value/authorId";
import {Tag} from "../../domain/model/article/value/tag";
import {Category} from "../../domain/model/article/value/category";
import {SeriesName} from "../../domain/model/article/value/seriesName";

export interface ArticleDatabaseInterface {

  fetchArticle(slug: string): ArticleRecord | undefined

  fetchAuthor(id: string): AuthorRecord | undefined

  fetchMetadataValues(): MetadataValuesRecord

  searchMetadataList(query: ArticleSearchQuery): Array<ArticleMetaRecord>
}

export class ArticleRepository {

  private db: ArticleDatabaseInterface

  private factory: ArticleFactory

  constructor(db: ArticleDatabaseInterface) {
    this.db = db
    this.factory = new ArticleFactory()
  }

  fetchArticle(slug: Slug): Article | undefined {
    const record = this.db.fetchArticle(slug.toString())
    if (record == undefined) {
      return undefined
    }
    return this.factory.create(record)
  }

  fetchAuthor(id: AuthorId): Author | undefined {
    const record = this.db.fetchAuthor(id.toString())
    if (record === undefined) {
      return undefined
    }
    return Author.create(record)
  }

  fetchMetadataValues(): MetadataValues {
    const record = this.db.fetchMetadataValues()
    return MetadataValues.create(record)
  }

  fetchAllMetadataList(): MetadataList {
    return this.searchMetadataList({})
  }

  searchMetadataList(query: {
    tag?: Tag,
    category?: Category,
    seriesName?: SeriesName,
  }): MetadataList {
    return new MetadataList(
      this.db.searchMetadataList({
        tag: query.tag ? query.tag.toString() : undefined,
        category: query.category ? query.category.toString() : undefined,
        seriesName: query.seriesName ? query.seriesName.toString() : undefined,
      }).map(record => Metadata.create(record))
    )
  }
}
