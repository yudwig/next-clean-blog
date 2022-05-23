import { MdUpdate } from "react-icons/md"

const ArticlePublishDate = (props: { date: string }) => {
  return (
    <div className="flex items-center text-gray-600">
      <MdUpdate />
      <span className="ml-1 font-light">{props.date}</span>
    </div>
  )
}

export default ArticlePublishDate
