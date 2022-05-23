import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import Head from "next/head"
import { ArticleController } from "../../../../core/adapter/controller/articleController"
import { ArticleListPresentation } from "../../../../core/adapter/output/article/articleListPresentation"
import { ParsedUrlQuery } from "querystring"
import ArticleListPage from "../../../../view/components/templates/articleListPage"

interface Params extends ParsedUrlQuery {
  index: string
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
    props: controller.getListsByCategoryName(props.params!.category).lists[
      parseInt(props.params!.index, 10) - 1
    ],
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const controller = ArticleController.create()
  return {
    paths: controller
      .getMetadataKindLists()
      .categories.map(category =>
        controller
          .getListsByCategoryName(category)
          .pages.slice(1)
          .map(index => {
            return {
              params: {
                index: index.toString(),
                category: category,
              },
            }
          })
      )
      .flat(),
    fallback: false,
  }
}

export default Page
