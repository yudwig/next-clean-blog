import { PaginationPresentation } from "../../../core/adapter/output/article/paginationPresentation"
import Link from "next/link"

const ListPagination = (props: {
  pagination: PaginationPresentation
  baseUrl: string
}) => {
  function createLink(n: number) {
    return n === props.pagination.current ? (
      <div
        key={n}
        className="w-10 h-10 mx-2 text-gray-800 flex justify-center items-center"
      >
        <span>{n}</span>
      </div>
    ) : (
      <div key={n}>
        <Link
          href={
            n == 1
              ? props.baseUrl
              : `${props.baseUrl}/page/${n}`.replaceAll("//", "/")
          }
        >
          <button className="rounded w-10 h-10 mx-2">
            <span>{n}</span>
          </button>
        </Link>
      </div>
    )
  }
  const ellipsis = (
    <div className="h-10 flex justify-center items-center">
      <span>...</span>
    </div>
  )
  const list = props.pagination.list
  return (
    <div className="flex items-center justify-center my-10">
      {list.length > 0 && list[0] !== 1 && createLink(1)}
      {list.length > 0 && list[0] > 2 && ellipsis}
      {list.map(n => createLink(n))}
      {list.length > 0 &&
        list[list.length - 1] < props.pagination.last - 1 &&
        ellipsis}
      {list.length > 0 &&
        list[list.length - 1] !== props.pagination.last &&
        createLink(props.pagination.last)}
    </div>
  )
}

export default ListPagination
