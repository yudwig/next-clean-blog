import Link from "next/link"
import { MdOutlineCategory } from "react-icons/md"

const articleTextCategoryLink = (props: { category: string }) => {
  return (
    <div className="flex flex-row">
      <div className="flex justify-center items-center mr-1">
        <MdOutlineCategory />
      </div>
      <div className="line-clamp-1 text-ellipsis">
        <Link href={`/categories/${props.category}`} passHref>
          <span className="line-clamp-1 cursor-pointer hover:underline">
            {props.category}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default articleTextCategoryLink
