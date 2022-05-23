import type { NextPage } from "next"
import Head from "next/head"
import { GetStaticProps } from "next"
import { ArticleController } from "../core/adapter/controller/articleController"
import { ArticleListPresentation } from "../core/adapter/output/article/articleListPresentation"
import ArticleListPage from "../view/components/templates/articleListPage"

const Page: NextPage<ArticleListPresentation> = props => {
  return (
    <div>
      <Head>
        <title>{props.pageInfo.title}</title>
      </Head>
      <main>
        <ArticleListPage data={props} />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const controller = ArticleController.create()
  return {
    props: controller.getTimelineLists().lists[0],
  }
}

export default Page
