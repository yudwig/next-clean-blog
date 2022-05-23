import {ArticleDatabaseInterface} from "../../../../application/repository/articleRepository";
import {ArticleMetaRecord, ArticleRecord} from "../../../../application/dto/record/articleRecord";
import {ImagePath} from "../../../../domain/model/article/value/imagePath";
import {AuthorRecord} from "../../../../application/dto/record/authorRecord";
import {MetadataValuesRecord} from "../../../../application/dto/record/metadataValuesRecord";
import {ArticleSearchQuery} from "../../../../application/dto/query/articleSearchQuery";

const unified = require("unified")
const remarkParse = require("remark-parse")
const remarkGfm = require("remark-gfm")
const visit = require("unist-util-visit")
const matter = require("gray-matter")
const fs = require("fs")
const glob = require("glob")
const libpath = require("path")

export class FileArticleDatabase implements ArticleDatabaseInterface {

  readonly dirNames: {

    root: string

    article: string

    author: string
  }

  constructor(rootDirname: string) {
    const root = libpath.normalize(rootDirname)
    this.dirNames = {
      root: root,
      article: libpath.join(root, "articles"),
      author: libpath.join(root, "authors")
    }
  }

  fetchArticle(slug: string): ArticleRecord | undefined {
    const record = this.readArticle(slug)
    if (record !== undefined) {
      this.validateArticleRecord(record)
      if (record.meta.status === 0) {
        return undefined
      }
    }
    return record
  }

  fetchAuthor(id: string): AuthorRecord | undefined {
    const record = this.readAuthor(id)
    if (record !== undefined) {
      this.validateAuthorRecord(record)
    }
    return record
  }

  fetchMetadataValues(): MetadataValuesRecord {
    const tags = new Set<string>()
    const categories = new Set<string>()
    const seriesNames = new Set<string>()
    const slugs = new Set<string>()
    this.fetchAllMetadata().forEach(meta => {
      meta.tags.forEach(tag => tags.add(tag))
      categories.add(meta.category)
      if (slugs.has(meta.slug)) {
        throw new Error(`Duplicate slugs found. slug: ${meta.slug}`)
      }
      slugs.add(meta.slug)
      if (meta.series !== undefined) {
        seriesNames.add(meta.series.name)
      }
    })
    return {
      tags: Array.from(tags),
      categories: Array.from(categories),
      seriesNames: Array.from(seriesNames),
      slugs: Array.from(slugs)
    }
  }

  searchMetadataList(query: ArticleSearchQuery): Array<ArticleMetaRecord> {
    return this.fetchAllMetadata().filter(meta => {
      if (query.tag && meta.tags.indexOf(query.tag) < 0) {
        return false
      }
      if (query.category && meta.category !== query.category) {
        return false
      }
      if (query.seriesName && meta.series && meta.series.name !== query.seriesName) {
        return false
      }
      return true
    })
  }

  private fetchAllMetadata(): Array<ArticleMetaRecord> {
    return glob
      .sync(libpath.join(this.dirNames.article, "*.md"))
      .map((path: string) => {
        const record = this.readArticle(libpath.basename(path).split(".")[0])
        if (record === undefined) {
          return undefined
        }
        this.validateArticleRecord(record)
        return record.meta
      })
      .filter((record: ArticleMetaRecord) => record !== undefined && record.status !== 0)
  }

  private readAuthor(id: string): AuthorRecord | undefined {
    const path = libpath.join(this.dirNames.author, id.trim()) + ".md"
    if (!fs.existsSync(path)) {
      return undefined
    }
    const file = this.execRead(libpath.join(this.dirNames.author, id.trim()) + ".md")
    return {
      id: id,
      name: file.data.name,
      image: file.data.image,
      description: file.content
    }
  }

  private readArticle(slug: string): ArticleRecord | undefined {
    const file = this.execRead(libpath.join(this.dirNames.article, slug) + ".md")
    const path = libpath.join(this.dirNames.article, slug) + ".md"
    const fileName = libpath.basename(path).split(".")[0]
    if (fileName !== file.data.slug) {
      throw Error(`Slug is different from file name. fileName: ${fileName}, slug: ${file.data.slug}`)
    }
    if (!fs.existsSync(path)) {
      return undefined
    }
    return {
      meta: {
        title: file.data.title,
        slug: file.data.slug,
        category: file.data.category,
        tags: file.data.tags,
        published: file.data.published,
        status: file.data.status,
        image: file.data.image,
        series: file.data.series ? {
          name: file.data.series.name,
          index: file.data.series.index
        } : undefined,
        overview: file.data.overview ? file.data.overview : this.extractOverview(file.content),
        author: file.data.author ? this.readAuthor(file.data.author) : undefined
      },
      text: file.content.trim()
    }
  }

  private validateArticleRecord(record: ArticleRecord) {
    const path = new ImagePath(record.meta.image).getRelativePath()
    if (!fs.existsSync(path)) {
      throw new Error(`Not found image file. path: ${path}, slug: ${record.meta.slug}`)
    }
    if (record.meta.author) {
      this.validateAuthorRecord(record.meta.author)
    }
  }

  private extractOverview(content: string): string {
    const ast = unified().use(remarkParse).use(remarkGfm).parse(content)
    const paragraphs: Array<string> = []
    visit(ast, (node: any) => {
      if (node.type === "paragraph") {
        paragraphs.push(node.children[0].value)
      }
    })
    return paragraphs.join(" ")
  }

  private validateAuthorRecord(record: AuthorRecord) {
    const path = new ImagePath(record.image).getRelativePath()
    if (!fs.existsSync(path)) {
      throw new Error(`Not found image file. path: ${path}, id: ${record.id}`)
    }
  }

  private execRead(path: string): any {
    return matter(fs.readFileSync(path, "utf8"))
  }

  static createProd(): FileArticleDatabase {
    return new FileArticleDatabase("data")
  }

  static createTest(): FileArticleDatabase {
    return new FileArticleDatabase("data/test")
  }
}
