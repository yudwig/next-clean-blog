import SiteHeader from "../molecules/siteHeader"
import Sidebar from "../organisms/sidebar"
import React from "react"
import { ArticleDetailPresentation } from "../../../core/adapter/output/article/articleDetailPresentation"
import Article from "../organisms/article"
import ArticlePagination from "../molecules/articlePagination"
import ArticleRelations from "../organisms/articleRelations"
import SiteFooter from "../molecules/siteFooter"

const ArticleDetailPage = (props: { data: ArticleDetailPresentation }) => {
  return (
    <div className="w-full flex flex-col">
      <SiteHeader siteInfo={props.data.siteInfo} />
      <div className="flex flex-col md:flex-row justify-center">
        <div className="max-w-4xl">
          <Article article={props.data.article} />
          <ArticlePagination playlist={props.data.link.timeline} />
          <ArticleRelations
            timeline={props.data.link.timeline.links}
            recommended={props.data.link.recommended}
          />
        </div>
        <Sidebar
          links={props.data.link.recommended}
          author={props.data.author}
          series={props.data.link.series ? props.data.link.series : undefined}
        />
      </div>
      <SiteFooter siteInfo={props.data.siteInfo} />
    </div>
  )
}

export default ArticleDetailPage
