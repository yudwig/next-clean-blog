import { SiteInfoPresentation } from "../../../core/adapter/output/article/siteInfoPresentation"

const SiteFooter = (props: { siteInfo: SiteInfoPresentation }) => {
  const year = new Date().getFullYear()
  const yearRange =
    year === props.siteInfo.createdYear ? (
      <span>{props.siteInfo.createdYear}</span>
    ) : (
      <span>
        {props.siteInfo.createdYear}-{year}
      </span>
    )
  return (
    <footer className="h-16 flex gap-2 items-center px-10 text-sm text-gray-600">
      <div>
        <span>©</span>
        <span>{yearRange}</span>
      </div>
      <div>
        <span>{props.siteInfo.title}</span>
      </div>
      <div>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default SiteFooter
