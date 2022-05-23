import ArticleTagLink from "../atoms/articleTagLink"

const ArticleTagLinks = (props: { tags: Array<string> }) => {
  const tags = props.tags.map(tag => <ArticleTagLink tag={tag} key={tag} />)
  return <div className="flex flex-row gap-x-5">{tags}</div>
}

export default ArticleTagLinks
