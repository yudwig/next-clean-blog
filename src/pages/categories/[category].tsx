import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import Head from "next/head"
import { ArticleController } from "../../core/adapter/controller/articleController"
import { ArticleListPresentation } from "../../core/adapter/output/article/articleListPresentation"
import ArticleListPage from "../../view/components/templates/articleListPage"
import { ParsedUrlQuery } from "querystring"

interface Params extends ParsedUrlQuery {
  category: string
}

const Page: NextPage<ArticleListPresentation> = props => {
  return (
    <>
      <Head>
        <title>{props.pageInfo.title}</title>
      </Head>
      <main>
        <ArticleListPage data={props} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  ArticleListPresentation,
  Params
> = props => {
  const controller = ArticleController.create()
  return {
    props: controller.getListsByCategoryName(props.params!.category).lists[0],
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const controller = ArticleController.create()
  return {
    paths: controller.getMetadataKindLists().categories.map(category => {
      return {
        params: {
          category: category,
        },
      }
    }),
    fallback: false,
  }
}

export default Page
