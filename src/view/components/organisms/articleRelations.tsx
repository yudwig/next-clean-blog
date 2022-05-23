import { LinkPresentation } from "../../../core/adapter/output/article/linkPresentation"
import ArticleLink from "../molecules/articleLink"
import { BsListStars } from "react-icons/bs"
import { IoTimerOutline } from "react-icons/io5"
import { MdOutlineAccountTree } from "react-icons/md"
import { MdSwitchLeft } from "react-icons/md"

const ArticleRelations = (props: {
  timeline: Array<LinkPresentation>
  recommended: Array<LinkPresentation>
}) => {
  const timeline = props.timeline.map(link => {
    return <ArticleLink link={link} key={link.slug} />
  })

  const recommended = props.recommended.map(link => {
    return <ArticleLink link={link} key={link.slug} />
  })

  return (
    <nav>
      <div className="h-20 flex flex-row items-center">
        <IoTimerOutline size={20} />
        <span className="ml-2">Recently articles</span>
      </div>
      <div className="grid md:grid-cols-3 gap-3">{timeline}</div>
      <div className="h-20 flex flex-row items-center">
        <MdOutlineAccountTree size={20} />
        <span className="ml-2">Related articles</span>
      </div>
      <div className="grid md:grid-cols-3 gap-3">{recommended}</div>
    </nav>
  )
}

export default ArticleRelations
