import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import { ArticleController } from "../core/adapter/controller/articleController"
import { ArticleDetailPresentation } from "../core/adapter/output/article/articleDetailPresentation"
import Head from "next/head"
import ArticleDetailPage from "../view/components/templates/articleDetailPage"

const Page: NextPage<ArticleDetailPresentation> = props => {
  return (
    <>
      <Head>
        <title>{props.pageInfo.title}</title>
      </Head>
      <main>
        <ArticleDetailPage data={props} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  ArticleDetailPresentation
> = params => {
  const controller = ArticleController.create()
  return {
    props: controller.getArticle(params.params!.slug!.toString()),
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const controller = ArticleController.create()
  return {
    paths: controller.getMetadataKindLists().slugs.map(slug => {
      return {
        params: {
          slug: slug,
        },
      }
    }),
    fallback: false,
  }
}

export default Page
