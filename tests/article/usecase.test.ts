import {loadEnvConfig} from "@next/env";
import {GetArticleWithLinks} from "../../src/core/application/usecase/article/getArticleWithLinks";
import {ArticleRepository} from "../../src/core/application/repository/articleRepository";
import {FileArticleDatabase} from "../../src/core/driver/database/article/file/fileArticleDatabase";
import {SearchMetadataListWithLinks} from "../../src/core/application/usecase/article/searchMetadataListWithLinks";
import {GetMetadataValues} from "../../src/core/application/usecase/article/getMetadataValues";

loadEnvConfig(process.cwd())

describe("Article: GetArticleWithLinks", () => {

  const db = FileArticleDatabase.createTest()
  const repo = new ArticleRepository(db)
  const useCase = new GetArticleWithLinks({
    repository: repo
  })

  it("handle", () => {
    const res = useCase.handle({
      slug: "test-article-2",
      counts: {
        recommended: 2,
        side: 3,
        timeline: 2
      },
    })
    expect(res.article.slug.toString()).toBe("test-article-2")
    expect(res.link.timeline.getSortedByNewestList().length).toBe(2)
    expect(res.link.recommended.length).toBe(2)
    expect(res.link.side.length).toBe(3)
  })
})

describe("Article: SearchMetadataListWithLinks", () => {

  const db = FileArticleDatabase.createTest()
  const repo = new ArticleRepository(db)
  const useCase = new SearchMetadataListWithLinks({
    repository: repo
  })

  it("handle: Timeline", () => {
    const res = useCase.handle({
      counts: {
        side: 3,
      },
    })
    expect(res.list.length).toBe(5)
    expect(res.link.side.length).toBe(3)
  })

  it("handle: Filter by tag", () => {
    const res = useCase.handle({
      tag: "Tag A",
      counts: {
        side: 2,
      },
    })
    expect(res.list.length).toBe(3)
    expect(res.link.side.length).toBe(2)
  })
})

describe("Article: GetMetadataValues", () => {

  const db = FileArticleDatabase.createTest()
  const repo = new ArticleRepository(db)
  const useCase = new GetMetadataValues({
    repository: repo
  })

  it("handle", () => {
    const res = useCase.handle()
    expect(res.values.tags.list.toStrings().length).toBe(3)
    expect(res.values.categories.list.toStrings().length).toBe(2)
    expect(res.values.seriesNames.list.toStrings().length).toBe(1)
  })
})
