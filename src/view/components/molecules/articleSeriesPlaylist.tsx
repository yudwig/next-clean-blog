import { PlaylistPresentation } from "../../../core/adapter/output/article/playlistPresentation"
import { MdPlaylistPlay } from "react-icons/md"
import ArticlePlaylistRow from "./articlePlaylistRow"

const ArticleSeriesPlaylist = (props: { series: PlaylistPresentation }) => {
  const rows = props.series.links.map((link, index) => {
    return (
      <ArticlePlaylistRow
        index={index}
        link={link}
        key={link.slug}
        isNowPlaying={props.series.cursor.current.slug === link.slug}
      />
    )
  })

  return (
    <div className="">
      <div className="h-20 flex flex-row items-center">
        <MdPlaylistPlay size={20} />
        <span className="ml-2">Series Playlist</span>
      </div>
      <div className="overflow-y-scroll h-128">{rows}</div>
    </div>
  )
}

export default ArticleSeriesPlaylist
