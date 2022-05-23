import { ArticleListPresentation } from "../../core/adapter/output/article/articleListPresentation"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ArticleController } from "../../core/adapter/controller/articleController"
import Head from "next/head"
import ArticleListPage from "../../view/components/templates/articleListPage"

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

export const getStaticProps: GetStaticProps<
  ArticleListPresentation
> = props => {
  const controller = ArticleController.create()
  const index: number = parseInt(props.params!.index!.toString(), 10) - 1
  return {
    props: controller.getTimelineLists().lists[index],
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const controller = ArticleController.create()
  return {
    paths: controller
      .getTimelineLists()
      .lists.slice(1)
      .map((list, index) => {
        return {
          params: {
            index: (index + 2).toString(),
          },
        }
      }),
    fallback: false,
  }
}

export default Page
