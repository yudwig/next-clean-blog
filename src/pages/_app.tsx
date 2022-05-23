import "../../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      {/*// @ts-ignore*/}
      <Component {...pageProps} key={router.asPath} />
    </>
  )
}

export default App
