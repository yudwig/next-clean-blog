import {ArticlePresenter} from "../../src/core/adapter/presenter/articlePresenter";

describe("Article: ArticlePresenter", () => {

  it("createPageNumbers", () => {
    expect(ArticlePresenter.createPageNumbers(5, 10)).toEqual([1,2,3,4,5,6,7,8,9])
    expect(ArticlePresenter.createPageNumbers(1, 1)).toEqual([1])
    expect(ArticlePresenter.createPageNumbers(1, 2)).toEqual([1,2])
    expect(ArticlePresenter.createPageNumbers(1, 3)).toEqual([1,2,3])
    expect(ArticlePresenter.createPageNumbers(1, 4)).toEqual([1,2,3,4])
    expect(ArticlePresenter.createPageNumbers(1, 5)).toEqual([1,2,3,4,5])
    expect(ArticlePresenter.createPageNumbers(1, 6)).toEqual([1,2,3,4,5])
    expect(ArticlePresenter.createPageNumbers(2, 8)).toEqual([1,2,3,4,5,6])
    expect(ArticlePresenter.createPageNumbers(3, 8)).toEqual([1,2,3,4,5,6,7])
    expect(ArticlePresenter.createPageNumbers(4, 8)).toEqual([1,2,3,4,5,6,7,8])
    expect(ArticlePresenter.createPageNumbers(5, 8)).toEqual([1,2,3,4,5,6,7,8])
    expect(ArticlePresenter.createPageNumbers(6, 8)).toEqual([2,3,4,5,6,7,8])
    expect(ArticlePresenter.createPageNumbers(7, 8)).toEqual([3,4,5,6,7,8])
    expect(ArticlePresenter.createPageNumbers(8, 8)).toEqual([4,5,6,7,8])
    expect(ArticlePresenter.createPageNumbers(5, 9)).toEqual([1,2,3,4,5,6,7,8,9])
    expect(ArticlePresenter.createPageNumbers(6, 11)).toEqual([2,3,4,5,6,7,8,9,10])
  })
})

