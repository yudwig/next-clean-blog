import Link from "next/link"

const ArticleSeriesLink = (props: { name: string }) => {
  return (
    <Link href={`/series/${props.name}`} passHref>
      <button className="cursor-pointer rounded-full py-2 px-4 border border-gray-300 hover:bg-gray-200 ">
        {props.name}
      </button>
    </Link>
  )
}

export default ArticleSeriesLink
