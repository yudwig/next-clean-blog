import Link from "next/link"
import Image from "next/image"
import { LinkPresentation } from "../../../core/adapter/output/article/linkPresentation"
import ArticlePublishDate from "../atoms/articlePublishDate"
import ArticleTextTagLinks from "./articleTextTagLinks"
import ArticleTextCategoryLink from "./articleTextCategoryLink"

const ArticleLink = (props: { link: LinkPresentation }) => {
  return (
    <div>
      <div className="cursor-pointer">
        <Link href={`/${props.link.slug}`} passHref>
          <Image
            src={props.link.image.path}
            alt={props.link.image.title}
            width={16}
            height={10}
            layout="responsive"
            className="object-cover cursor-pointer h-40 hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="p-5 text-sm">
        <div className="mb-1">
          <Link href={`/${props.link.slug}`} passHref>
            <span className="font-bold text-sm text-ellipsis line-clamp-2 cursor-pointer hover:underline">
              {props.link.title}
            </span>
          </Link>
        </div>
        <div className="mb-1">
          <ArticleTextCategoryLink category={props.link.category} />
        </div>
        <div className="mb-1">
          <ArticleTextTagLinks tags={props.link.tags} />
        </div>
        <div>
          <ArticlePublishDate date={props.link.published} />
        </div>
      </div>
    </div>
  )
}

export default ArticleLink
