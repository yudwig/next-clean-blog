import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/ico" href="images/icons/favicon.ico" />
      </Head>
      <body className="bg-gray-50 leading-8">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
