import {Slug} from "../../src/core/domain/model/article/value/slug";
import {Title} from "../../src/core/domain/model/article/value/title";
import {PublishDate} from "../../src/core/domain/model/article/value/publishDate";
import {Overview} from "../../src/core/domain/model/article/value/overview";
import {AnchorLink} from "../../src/core/domain/model/article/value/anchorLink";
import {Image} from "../../src/core/domain/model/article/value/image";
import {Category} from "../../src/core/domain/model/article/value/category";
import {Tag} from "../../src/core/domain/model/article/value/tag";
import {Series} from "../../src/core/domain/model/article/value/series";
import {Body} from "../../src/core/domain/model/article/value/body";
import {Status} from "../../src/core/domain/model/article/value/status";
import {ImagePath} from "../../src/core/domain/model/article/value/imagePath";
import {ImageTitle} from "../../src/core/domain/model/article/value/imageTitle";
import {AuthorDescription} from "../../src/core/domain/model/article/value/authorDescription";
import {AuthorId} from "../../src/core/domain/model/article/value/authorId";
import {AuthorName} from "../../src/core/domain/model/article/value/authorName";
import {SeriesName} from "../../src/core/domain/model/article/value/seriesName";

describe("Article: AnchorLink", () => {
  it("constructor", () => {
    expect(() => {new AnchorLink("title", "id")}).not.toThrow()
    expect(() => {new AnchorLink("", "id")}).toThrow()
    expect(() => {new AnchorLink("title", "")}).toThrow()
    expect(() => {new AnchorLink("", "")}).toThrow()
  })
  it("toString", () => {
    expect(new AnchorLink("title", "id").toString()).toBe("title")
  })
})

describe("Article: AuthorDescription", () => {
  it("constructor", () => {
    expect(() => {new AuthorDescription("text")}).not.toThrow()
    expect(() => {new AuthorDescription("")}).not.toThrow()
  })
  it("toString", () => {
    expect(new AuthorDescription("text").toString()).toBe("text")
  })
})

describe("Article: AuthorId", () => {
  it("constructor", () => {
    expect(() => {new AuthorId("id")}).not.toThrow()
    expect(() => {new AuthorId("")}).toThrow()
  })
  it("toString", () => {
    expect(new AuthorId("id").toString()).toBe("id")
  })
})

describe("Article: AuthorName", () => {
  it("constructor", () => {
    expect(() => {new AuthorName("name")}).not.toThrow()
    expect(() => {new AuthorName("")}).toThrow()
  })
  it("toString", () => {
    expect(new AuthorName("name").toString()).toBe("name")
  })
})

describe("Article: Body", () => {
  it("constructor", () => {
    expect(() => {new Body("text")}).not.toThrow()
    expect(() => {new Body("")}).not.toThrow()
  })
  it("toString", () => {
    expect(new Body("text").toString()).toBe("text")
  })
})

describe("Article: Category", () => {
  it("constructor", () => {
    expect(() => {new Category("name")}).not.toThrow()
    expect(() => {new Category("")}).toThrow()
  })
  it("toString", () => {
    expect(new Category("name").toString()).toBe("name")
  })
})

describe("Article: Image", () => {
  it("constructor", () => {
    expect(() => {Image.createFromPath("test/images/test-image-1.png")}).not.toThrow()
    expect(() => {Image.createFromPath("")}).toThrow()
  })
  it("toString", () => {
    expect(new Image(
      new ImagePath("path"),
      new ImageTitle("title"),
    ).toString()).toBe("title")
  })
})

describe("Article: ImagePath", () => {
  it("constructor", () => {
    expect(() => {new ImagePath("path")}).not.toThrow()
    expect(() => {new ImagePath("")}).toThrow()
  })
  it("getRelativePath", () => {
    expect(new ImagePath("image.png").getRelativePath()).toBe("public/images/image.png")
  })
  it("getAbsolutePath", () => {
    expect(new ImagePath("image.png").getAbsolutePath()).toBe("/images/image.png")
  })
  it("proper", () => {
    expect(new ImagePath("my-article-image.png").proper()).toBe("My Article Image")
  })
  it("toString", () => {
    expect(new ImagePath("image.png").toString()).toBe("image.png")
  })
})

describe("Article: ImageTitle", () => {
  it("constructor", () => {
    expect(() => {new ImageTitle("title")}).not.toThrow()
    expect(() => {new ImageTitle("")}).toThrow()
  })
  it("toString", () => {
    expect(new ImageTitle("Test Image").toString()).toBe("Test Image")
  })
})

describe("Article: Overview", () => {
  it("constructor", () => {
    expect(() => {new Overview("text")}).not.toThrow()
    expect(() => {new Overview("")}).toThrow()
    expect(new Overview("a".repeat(Overview.limitLength)).toString().length).toBe(Overview.limitLength)
    expect(new Overview("a".repeat(Overview.limitLength + 1)).toString().length).toBe(Overview.limitLength)
  })
  it("toString", () => {
    expect(new Overview("text").toString()).toBe("text")
  })
})

describe("Article: PublishDate", () => {
  it("constructor", () => {
    expect(() => {new PublishDate("2022-01-01 07:19")}).not.toThrow()
    expect(() => {new PublishDate("")}).toThrow()
    expect(() => {new PublishDate("2022-01-01 7:19")}).toThrow()
    expect(() => {new PublishDate("2022/1/1 7:19")}).toThrow()
    expect(() => {new PublishDate("2022-01-01 07:19:20")}).toThrow()
  })
  it("toString", () => {
    expect(new PublishDate("2022-01-01 07:19").toString()).toBe("2022-01-01 07:19")
  })
  it("toNumber", () => {
    expect(new PublishDate("2022-03-05 07:19").toNumber()).toBe(202203050719)
  })
})

describe("Article: Series", () => {
  it("constructor", () => {
    expect(() => {new Series("name", 1)}).not.toThrow()
    expect(() => {new Series("name", 0)}).toThrow()
    expect(() => {new Series("", 0)}).toThrow()
    expect(() => {new Series("", 1)}).toThrow()
  })
  it("toString", () => {
    expect(new Series("name", 1).toString()).toBe("name (1)")
  })
})

describe("Article: SeriesName", () => {
  it("constructor", () => {
    expect(() => {new SeriesName("name")}).not.toThrow()
    expect(() => {new SeriesName("")}).toThrow()
  })
  it("toString", () => {
    expect(new SeriesName("name").toString()).toBe("name")
  })
  it("equals", () => {
    expect(new SeriesName("name").equals(new SeriesName("name"))).toBe(true)
    expect(new SeriesName("name").equals(new SeriesName("foo"))).toBe(false)
  })
})

describe("Article: Slug", () => {
  it("constructor", () => {
    expect(() => {new Slug("abc-ABC_0123")}).not.toThrow()
    expect(() => {new Slug("abcABC^0123")}).toThrow()
    expect(() => {new Slug("")}).toThrow()
    expect(() => {new Slug("a".repeat(31))}).not.toThrow()
    expect(() => {new Slug("a".repeat(32))}).toThrow()
  })
  it("toString", () => {
    expect(new Slug("my-test-article").toString()).toBe("my-test-article")
  })
  it("equals", () => {
    expect(new Slug("slug").equals(new Slug("slug"))).toBe(true)
    expect(new Slug("slug").equals(new Slug("foo"))).toBe(false)
  })
})

describe("Article: Status", () => {
  it("constructor", () => {
    expect(() => {new Status(1)}).not.toThrow()
    expect(() => {new Status(0)}).not.toThrow()
    expect(() => {new Status(2)}).toThrow()
  })
  it("isPrivate", () => {
    expect(new Status(1).isPrivate()).toBe(false)
    expect(new Status(0).isPrivate()).toBe(true)
  })
  it("toString", () => {
    expect(new Status(1).toString()).toBe("true")
    expect(new Status(0).toString()).toBe("false")
  })
})

describe("Article: Tag", () => {
  it("constructor", () => {
    expect(() => {new Tag("name")}).not.toThrow()
    expect(() => {new Tag("")}).toThrow()
  })
  it("toString", () => {
    expect(new Tag("name").toString()).toBe("name")
  })
})

describe("Article: Title", () => {
  it("constructor", () => {
    expect(() => {new Title("name")}).not.toThrow()
    expect(() => {new Title("")}).toThrow()
  })
  it("toString", () => {
    expect(new Title("name").toString()).toBe("name")
  })
})
