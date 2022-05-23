import { PreviewPresentation } from "../../../core/adapter/output/article/previewPresentation"
import Link from "next/link"
import ArticleCategoryLink from "../atoms/articleCategoryLink"
import Image from "next/image"
import ArticleTagLinks from "./articleTagLinks"
import ArticlePublishDate from "../atoms/articlePublishDate"
import ArticleSeriesLink from "../atoms/articleSeriesLink"
import AuthorTag from "./authorTag"
import ArticleOverview from "./articleOverview"

const ArticleCard = (props: { preview: PreviewPresentation }) => {
  return (
    <div className="m-10">
      <div className="py-5">
        <ArticlePublishDate date={props.preview.published} />
        <div className="my-5">
          <AuthorTag author={props.preview.author} />
        </div>
        <h2 className="font-bold text-2xl my-5">
          <Link href={`/${props.preview.slug}`} passHref>
            <span className="cursor-pointer ">{props.preview.title}</span>
          </Link>
        </h2>
        <div className="flex flex-row gap-x-5">
          <ArticleCategoryLink category={props.preview.category} />
          {props.preview.series && (
            <ArticleSeriesLink name={props.preview.series.name} />
          )}
        </div>
      </div>
      <Link href={`/${props.preview.slug}`} passHref>
        <Image
          src={props.preview.image.path}
          alt={props.preview.image.title}
          width={500}
          height={300}
          layout="responsive"
          className="object-cover cursor-pointer"
        />
      </Link>
      <div className="mt-5">
        <ArticleTagLinks tags={props.preview.tags} />
        <ArticleOverview markdownOverviewText={props.preview.overview} />
      </div>
    </div>
  )
}

export default ArticleCard
