import { LinkPresentation } from "../../../core/adapter/output/article/linkPresentation"
import AuthorProfile from "../molecules/authorProfile"
import ArticleLinks from "./articleLinks"
import { AuthorPresentation } from "../../../core/adapter/output/article/authorPresentation"
import { PlaylistPresentation } from "../../../core/adapter/output/article/playlistPresentation"
import ArticleSeriesPlaylist from "../molecules/articleSeriesPlaylist"
import {MetadataValuesPresentation} from "../../../core/adapter/output/article/metadataValuesPresentation";
import ArticleMetadataValuesLinks from "../molecules/articleMetadataValuesLinks";

const Sidebar = (props: {
  links: Array<LinkPresentation>
  author: AuthorPresentation
  series?: PlaylistPresentation
  values?: MetadataValuesPresentation
}) => {
  return (
    <aside className="md:max-w-xs w-full md:p-10">
      <header className="md:mb-10">
        <AuthorProfile author={props.author} />
      </header>
      <nav className="hidden md:block">
        {props.values && <ArticleMetadataValuesLinks values={props.values} />}
        {props.series && <ArticleSeriesPlaylist series={props.series} />}
        <div className="mt-20">
          <ArticleLinks links={props.links} />
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
