import { LinkPresentation } from "../../../core/adapter/output/article/linkPresentation"
import ArticleLink from "../molecules/articleLink"

const ArticleLinks = (props: { links: Array<LinkPresentation> }) => {
  const links = props.links.map(link => {
    return (
      <div key={link.slug} className="my-3">
        <ArticleLink link={link} />
      </div>
    )
  })
  return <div className="">{links}</div>
}

export default ArticleLinks
