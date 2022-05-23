import { LinkPresentation } from "../../../core/adapter/output/article/linkPresentation"
import Link from "next/link"
import Image from "next/image"
import { MdPlayArrow } from "react-icons/md"

const ArticlePlaylistRow = (props: {
  index: number
  link: LinkPresentation
  isNowPlaying?: boolean
}) => {
  const isNowPlaying = props.isNowPlaying !== undefined && props.isNowPlaying

  return (
    <div
      key={props.link.slug}
      className={
        "flex flex-row py-2 hover:bg-gray-200 " +
        (isNowPlaying ? "bg-gray-200" : "")
      }
    >
      <div className="w-3 flex justify-center items-center mx-2">
        {isNowPlaying ? (
          <MdPlayArrow size={10} />
        ) : (
          <span className="text-sm">{props.index + 1}</span>
        )}
      </div>
      <div className="cursor-pointer w-20">
        <Link href={`/${props.link.slug}`} passHref>
          <Image
            src={props.link.image.path}
            alt={props.link.image.title}
            width={16}
            height={10}
            layout="responsive"
            className="object-cover cursor-pointer h-40 hover:scale-105 transition-all duration-700"
          />
        </Link>
      </div>
      <div className="p-2">
        <Link href={`/${props.link.slug}`} passHref>
          <span className="line-clamp-2 text-xs font-bold w-28 cursor-pointer hover:underline">
            {props.link.title}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ArticlePlaylistRow
