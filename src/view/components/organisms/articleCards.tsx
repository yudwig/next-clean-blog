import { PreviewPresentation } from "../../../core/adapter/output/article/previewPresentation"
import ArticleCard from "../molecules/articleCard"

const ArticleCards = (props: { previews: Array<PreviewPresentation> }) => {
  const cards = props.previews.map(preview => (
    <ArticleCard key={preview.slug} preview={preview} />
  ))
  return <div className="w-full">{cards}</div>
}

export default ArticleCards
