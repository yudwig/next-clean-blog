import {PreviewPresentation} from "./previewPresentation";
import {LinkPresentation} from "./linkPresentation";
import {PaginationPresentation} from "./paginationPresentation";
import {PageInfoPresentation} from "./pageInfoPresentation";
import {AuthorPresentation} from "./authorPresentation";
import {SiteInfoPresentation} from "./siteInfoPresentation";
import {MetadataValuesPresentation} from "./metadataValuesPresentation";

export interface ArticleListPresentation {

  previews: Array<PreviewPresentation>

  link: {

    recommended: Array<LinkPresentation>

    values: MetadataValuesPresentation
  }

  pagination: PaginationPresentation

  pageInfo: PageInfoPresentation

  siteInfo: SiteInfoPresentation

  author: AuthorPresentation
}
