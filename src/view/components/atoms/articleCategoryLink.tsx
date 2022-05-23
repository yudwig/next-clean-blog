import Link from "next/link"

const ArticleCategoryLink = (props: { category: string }) => {
  return (
    <Link href={`/categories/${props.category}`} passHref>
      <button className="cursor-pointer rounded-full py-2 px-4 border border-gray-300 hover:bg-gray-200 ">
        {props.category}
      </button>
    </Link>
  )
}

export default ArticleCategoryLink
