import {ArticleListPresentation} from "./articleListPresentation";
import {SiteInfoPresentation} from "./siteInfoPresentation";

export interface ArticleListsPresentation {

  lists: Array<ArticleListPresentation>

  pages: Array<number>

  siteInfo: SiteInfoPresentation
}
