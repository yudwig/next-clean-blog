import {ArticleListPresentation} from "../output/article/articleListPresentation";
import {Metadata} from "../../domain/model/article/entity/metadata";
import {PreviewPresentation} from "../output/article/previewPresentation";
import {LinkPresentation} from "../output/article/linkPresentation";
import {ArticlePresentation} from "../output/article/articlePresentation";
import {ArticleDetailPresentation} from "../output/article/articleDetailPresentation";
import {Article} from "../../domain/model/article/entity/article";
import {PlaylistCursor} from "../../domain/model/article/collection/playlistCursor";
import {PlaylistPresentation} from "../output/article/playlistPresentation";
import {MetadataValuesPresentation} from "../output/article/metadataValuesPresentation";
import {ArticleListsPresentation} from "../output/article/articleListsPresentation";
import {SearchMetadataListWithLinksResult} from "../../application/dto/result/searchMetadataListWithLinksResult";
import {GetArticleWithLinksResult} from "../../application/dto/result/getArticleWithLinksResult";
import {MetadataList} from "../../domain/model/article/collection/metadataList";
import {AuthorPresentation} from "../output/article/authorPresentation";
import {GetConfigResult} from "../../application/dto/result/getConfigResult";
import {GetMetadataValuesResult} from "../../application/dto/result/getMetadataValuesResult";
import {Author} from "../../domain/model/article/entity/author";
import {MetadataValues} from "../../domain/model/article/collection/metadataValues";

export class ArticlePresenter {

  private config: GetConfigResult

  constructor(getConfigResult: GetConfigResult) {
    this.config = getConfigResult
  }

  createListsPresentation(data: SearchMetadataListWithLinksResult, filterName?: string): ArticleListsPresentation {
    const lists = this.chunkLists(data, filterName)
    return {
      lists: lists,
      pages: lists.map((list, n) => n + 1),
      siteInfo: this.config.config.site
    }
  }

  createDetailPresentation(data: GetArticleWithLinksResult): ArticleDetailPresentation {
    return {
      article: this.createArticle(data.article),
      link: {
        timeline: this.createPlaylist(data.link.timeline.getSortedByNewestList(), data.link.timeline.cursor),
        series: data.link.series === undefined ? null :
          this.createPlaylist(data.link.series.list, data.link.series.cursor),
        recommended: this.createLinks(data.link.recommended)
      },
      siteInfo: this.config.config.site,
      pageInfo: {
        title: data.article.title.toString(),
        description: data.article.meta.overview ? data.article.meta.overview.toString() : undefined
      },
      author: data.article.author ? {
        name: data.article.author.name.toString(),
        description: data.article.author.description.toString(),
        image: data.article.author.image.path.getAbsolutePath()
      } : this.createAuthor(this.config.siteAuthor)
    }
  }

  createMetadataValuesPresentation(data: GetMetadataValuesResult): MetadataValuesPresentation {
    return this.createMetadataValues(data.values)
  }

  private createMetadataValues(values: MetadataValues): MetadataValuesPresentation {
    return {
      tags: values.tags.list.sortByLexicalAscOrder().toStrings(),
      categories: values.categories.list.sortByLexicalAscOrder().toStrings(),
      series: values.seriesNames.list.sortByLexicalAscOrder().toStrings(),
      slugs: values.slugs.list.toStrings()
    }
  }

  private createAuthor(author: Author): AuthorPresentation {
    return {
      name: author.name.toString(),
      description: author.description.toString(),
      image: author.image.path.getAbsolutePath()
    }
  }

  private createArticle(article: Article): ArticlePresentation {
    return Object.assign(this.createPreview(article.meta), {
      body: article.body.toString()
    })
  }

  private createPreview(meta: Metadata): PreviewPresentation {
    return Object.assign(this.createLink(meta), {
      series: meta.series === undefined ? null : {
        name: meta.series.name.toString(),
        index: meta.series.index,
      },
      overview: meta.overview.toString(),
      author: this.createAuthor(meta.author ? meta.author : this.config.siteAuthor)
    })
  }

  private createLinks(list: MetadataList): Array<LinkPresentation> {
    return list.getArray().map(meta => this.createLink(meta))
  }

  private createLink(meta: Metadata): LinkPresentation {
    return {
      slug: meta.slug.toString(),
      title: meta.title.toString(),
      category: meta.category.toString(),
      tags: meta.tags.list.getArray().map(tag => tag.toString()),
      published: meta.published.toString(),
      image: {
        title: meta.image.title.toString(),
        path: meta.image.path.getAbsolutePath()
      }
    }
  }

  private createPlaylist(list: MetadataList, cursor: PlaylistCursor): PlaylistPresentation {
    return {
      links: list.getArray().map(meta => this.createLink(meta)),
      cursor: {
        prev: cursor.prev === undefined ? null : this.createLink(cursor.prev),
        current: this.createLink(cursor.current),
        next: cursor.next === undefined ? null : this.createLink(cursor.next)
      }
    }
  }

  private chunkLists(data: SearchMetadataListWithLinksResult, filterName?: string): Array<ArticleListPresentation> {
    const lists = data.list
      .sortByNewest()
      .chunk(this.config.config.page.listArticlesPerPage)

    return lists
      .map( (list, index) => {
        return {
          previews: list
            .getArray()
            .map(meta => this.createPreview(meta)),
          link: {
            recommended: data.link.side
              .getArray()
              .map(meta => this.createLink(meta)),
            values: this.createMetadataValues(data.link.values)
          },
          pagination: {
            prev: index > 0 ? index : null,
            current: index + 1,
            next: index < lists.length - 1 ? index + 2 : null,
            list: ArticlePresenter.createPageNumbers(index + 1, lists.length),
            last: lists.length
          },
          pageInfo: {
            title: (filterName ? `${filterName} | ` : "") + this.config.config.site.title,
          },
          siteInfo: this.config.config.site,
          author: this.createAuthor(this.config.siteAuthor)
        }
      })
  }

  static createPageNumbers(current: number, last: number): Array<number> {
    if (current > last) {
      throw new Error(
        `Current page number must be smaller than the last page number. current: ${current}, last: ${last}`
      )
    }
    if (current < 1 || last < 1) {
      throw new Error(`Current and last page number are must over 1. current: ${current}, last: ${last}`)
    }
    const res = Array<number>()
    for ( let i = Math.max(1, current - 4); i <= Math.min(last, current + 4); i++) {
      res.push(i)
    }
    return res
  }
}

