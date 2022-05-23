import Link from "next/link"
import { AiOutlineTags } from "react-icons/ai"

const ArticleTextTagLinks = (props: { tags: Array<string> }) => {
  const tags = props.tags.map((tag, index) => {
    return (
      <span key={tag} className="pr-1">
        <Link href={`/tags/${tag}/`} passHref>
          <span className="cursor-pointer hover:underline">{tag}</span>
        </Link>
        {index < props.tags.length - 1 && <>,</>}
      </span>
    )
  })

  return (
    <div className="flex flex-row">
      <div className="flex justify-center items-center mr-1">
        <AiOutlineTags />
      </div>
      <div className="line-clamp-1 text-ellipsis">{tags}</div>
    </div>
  )
}

export default ArticleTextTagLinks
