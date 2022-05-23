import {MetadataValuesPresentation} from "../../../core/adapter/output/article/metadataValuesPresentation";
import ArticleTagLink from "../atoms/articleTagLink";

const ArticleMetadataValuesLinks = (props: {values: MetadataValuesPresentation}) => {

  const tags = props.values.tags.map(tag => {
    return (
      <div key={tag} className="m-1 inline-block">
        <ArticleTagLink tag={tag} />
      </div>
    )
  })

  return (
    <div className="">
      {tags}
    </div>
  )
}

export default ArticleMetadataValuesLinks
