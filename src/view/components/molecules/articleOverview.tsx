const ArticleOverview = (props: { markdownOverviewText: string }) => {
  return (
    <div className="mt-5 ">
      <p className="line-clamp-3 break-words">{props.markdownOverviewText}</p>
    </div>
  )
}

export default ArticleOverview
