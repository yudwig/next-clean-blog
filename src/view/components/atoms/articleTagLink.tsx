import Link from "next/link"

const ArticleTagLink = (props: { tag: string }) => {
  return (
    <Link href={`/tags/${props.tag}`} passHref>
      <button className="cursor-pointer rounded-full py-2 px-4 border border-gray-300 hover:bg-gray-200">
        {props.tag}
      </button>
    </Link>
  )
}

export default ArticleTagLink
