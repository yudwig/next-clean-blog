import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { prism as theme } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Link from "next/link"
import Image from "next/image"

function ArticleBody(props: { markdownText: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[
        // @ts-ignore
        remarkGfm,
        // @ts-ignore
        remarkBreaks,
      ]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              // @ts-ignore
              style={theme}
              language={match[1]}
              wrapLongLines
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        a: ({ node, ...props }) => (
          <Link
            className="cursor-pointer hover:underline hover:underline-offset-1"
            href={props.href ? props.href : ""}
            {...props}
          >
            {props.children.length > 0 ? props.children[0] : ""}
          </Link>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="italic text-gray-600 my-5" {...props} />
        ),
        br: ({ node, ...props }) => (
          <br className="" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic" {...props} />
        ),
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold my-14" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold my-10" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold my-5 " {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg font-bold my-5" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="font-bold my-1" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="font-bold my-1" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="" {...props} />
        ),
        img: ({ node, ...props }) => {
          const path = `/images/${props.src!}`
          return (
            <div className="article-image-container my-5 ">
              <a
                target="_blank"
                href={path}
                rel="noreferrer noopener"
                className="cursor-pointer"
              >
                <Image
                  src={path}
                  alt={props.alt}
                  layout="fill"
                  objectFit="contain"
                  className=""
                />
              </a>
            </div>
          )
        },
        li: ({ node, ...props }) => (
          <li className="ml-4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal my-5" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc my-5" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="" {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre className="border my-5" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-bold" {...props} />
        ),
        table: ({ node, ...props }) => (
          <table className="my-5 border w-full" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="border border-gray-300" {...props} />
        ),
        td: ({ node, ...props }) => (
          // @ts-ignore
          <td className="py-1 px-2 border border-gray-300" {...props} />
        ),
        th: ({ node, ...props }) => (
          // @ts-ignore
          <th className="py-1 px-2 border border-gray-300" {...props} />
        ),
        thead: ({ node, ...props }) => (
          <thead className="py-1 px-2 border border-gray-300" {...props} />
        ),
      }}
    >
      {props.markdownText}
    </ReactMarkdown>
  )
}

export default ArticleBody
