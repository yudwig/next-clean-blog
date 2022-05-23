import {loadEnvConfig} from "@next/env";
import {DotenvConfigDatabase} from "../../src/core/driver/database/config/dotenv/dotenvConfigDatabase";
import {ArticleController} from "../../src/core/adapter/controller/articleController";
import {FileArticleDatabase} from "../../src/core/driver/database/article/file/fileArticleDatabase";

loadEnvConfig(process.cwd())

describe("Article: ArticleController", () => {

  const db = {
    config: new DotenvConfigDatabase(),
    article: FileArticleDatabase.createTest()
  }
  const controller = new ArticleController(db)

  it("getTimelineLists", () => {
    const res = controller.getTimelineLists()
    expect(db.config.fetch().page.listArticlesPerPage).toBe(2)
    expect(res.lists.length).toBe(3)
    expect(res.lists[0].previews.length).toBe(2)
    expect(res.lists[1].previews.length).toBe(2)
    expect(res.lists[2].previews.length).toBe(1)
  })
})
