import {ArticleDatabaseInterface} from "../../../../application/repository/articleRepository";
import {ArticleMetaRecord, ArticleRecord} from "../../../../application/dto/record/articleRecord";
import { ArticleSearchQuery } from "../../../../application/dto/query/articleSearchQuery";
import { AuthorRecord } from "../../../../application/dto/record/authorRecord";
import { MetadataValuesRecord } from "../../../../application/dto/record/metadataValuesRecord";

export class TestArticleDatabase implements ArticleDatabaseInterface {

  fetchAuthor(id: string): AuthorRecord | undefined {
      throw new Error("Method not implemented.");
  }
  fetchMetadataValues(): MetadataValuesRecord {
      throw new Error("Method not implemented.");
  }
  fetchRecentlyMetadataList(count: number): ArticleMetaRecord[] {
      throw new Error("Method not implemented.");
  }
  searchMetadataList(query: ArticleSearchQuery): ArticleMetaRecord[] {
      throw new Error("Method not implemented.");
  }

  data: Array<ArticleRecord> = []

  private getNextIndex(): number {
    return this.data.length + 1
  }

  generate(meta: Partial<ArticleMetaRecord>, text?: string): ArticleRecord {
    let record: ArticleRecord = {
      meta: {
        title:     meta.title !== undefined ? meta.title : `Test Title ${this.getNextIndex()}`,
        slug:      meta.slug  !== undefined ? meta.slug : `test-slug-${this.getNextIndex()}`,
        category:  meta.category !== undefined ? meta.category : "category",
        tags:      meta.tags  !== undefined ? meta.tags : [],
        published: meta.published !== undefined ? meta.published : "2022-01-01 10:00",
        status:    meta.status !== undefined ? meta.status : 1,
        image:     meta.image !== undefined ? meta.image : `/test/images/test-image-1.png`,
        overview:  meta.overview !== undefined ? meta.overview : `Test article ${this.getNextIndex()} overview.`,
        series:    undefined
      },
      text:        text !== undefined ? text : `# test ${this.getNextIndex()}`
    }
    if (meta.series !== undefined) {
      record.meta.series = meta.series
    }
    return record
  }

  private add(record: ArticleRecord) {
    this.data.push(record)
  }

  register(meta: Partial<ArticleMetaRecord>, text?: string) {
    this.add(this.generate(meta, text))
  }

  clear() {
    this.data = []
  }

  fetchArticle(slug: string): ArticleRecord | undefined {
    return this.data.find( rec => rec.meta.slug === slug )
  }

  fetchAllMetadata(): Array<ArticleMetaRecord> {
    return this.data.map( rec => rec.meta );
  }
}
