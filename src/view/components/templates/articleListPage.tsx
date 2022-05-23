import ArticleCards from "../organisms/articleCards"
import Sidebar from "../organisms/sidebar"
import { ArticleListPresentation } from "../../../core/adapter/output/article/articleListPresentation"
import SiteHeader from "../molecules/siteHeader"
import React from "react"
import SiteFooter from "../molecules/siteFooter"
import ListPagination from "../molecules/listPagination"
import { useRouter } from "next/router"

const ArticleListPage = (props: { data: ArticleListPresentation }) => {
  const router = useRouter()
  const baseurl = router.asPath.replace(/page.*/, "")

  return (
    <div className="w-full flex flex-col">
      <SiteHeader siteInfo={props.data.siteInfo} />
      <div className="flex flex-col md:flex-row justify-center">
        <div className="max-w-4xl">
          <ArticleCards previews={props.data.previews} />
          <ListPagination
            pagination={props.data.pagination}
            baseUrl={baseurl}
          />
        </div>
        <Sidebar
          links={props.data.link.recommended}
          author={props.data.author}
          values={props.data.link.values}
        />
      </div>
      <SiteFooter siteInfo={props.data.siteInfo} />
    </div>
  )
}

export default ArticleListPage
