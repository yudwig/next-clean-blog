import { ArticlePresentation } from "../../../core/adapter/output/article/articlePresentation"
import ArticleCategoryLink from "../atoms/articleCategoryLink"
import Image from "next/image"
import ArticleTagLinks from "../molecules/articleTagLinks"
import ArticlePublishDate from "../atoms/articlePublishDate"
import ArticleSeriesLink from "../atoms/articleSeriesLink"
import AuthorTag from "../molecules/authorTag"
import ArticleBody from "../molecules/articleBody"

const Article = (props: { article: ArticlePresentation }) => (
  <article className="w-full py-10">
    <header>
      <div className="px-5 md:px-20 py-10">
        <div>
          <ArticlePublishDate date={props.article.published} />
        </div>
        <div className="my-5">
          <AuthorTag author={props.article.author} />
        </div>
        <h1 className="font-bold text-2xl">{props.article.title}</h1>
        <div className="mt-7 flex flex-row gap-x-5">
          <ArticleCategoryLink category={props.article.category} />
          {props.article.series && (
            <ArticleSeriesLink name={props.article.series.name} />
          )}
        </div>
      </div>
      <Image
        src={props.article.image.path}
        alt={props.article.image.title}
        width={16}
        height={10}
        layout="responsive"
        className="object-cover"
      />
      <div className="px-5 md:px-20 pt-10">
        <ArticleTagLinks tags={props.article.tags} />
      </div>
    </header>
    <main className="px-5 md:px-10 py-10">
      <ArticleBody markdownText={props.article.body} />
    </main>
  </article>
)
export default Article
