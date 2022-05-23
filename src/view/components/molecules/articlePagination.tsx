import { PlaylistPresentation } from "../../../core/adapter/output/article/playlistPresentation"
import ArticleLink from "./articleLink"
import { MdSwitchLeft } from "react-icons/md"

const ArticlePagination = (props: { playlist: PlaylistPresentation }) => {
  return (
    <nav>
      <div className="h-20 flex flex-row items-center">
        <MdSwitchLeft size={20} />
        <span className="ml-2">Next or Previous</span>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {props.playlist.cursor.next && (
          <ArticleLink link={props.playlist.cursor.next} />
        )}
        {props.playlist.cursor.prev && (
          <ArticleLink link={props.playlist.cursor.prev} />
        )}
      </div>
    </nav>
  )
}

export default ArticlePagination
