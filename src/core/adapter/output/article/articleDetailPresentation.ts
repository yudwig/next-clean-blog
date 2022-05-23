import {ArticlePresentation} from "./articlePresentation";
import {PlaylistPresentation} from "./playlistPresentation";
import {LinkPresentation} from "./linkPresentation";
import {PageInfoPresentation} from "./pageInfoPresentation";
import {AuthorPresentation} from "./authorPresentation";
import {SiteInfoPresentation} from "./siteInfoPresentation";

export interface ArticleDetailPresentation {

  article: ArticlePresentation

  link: {

    timeline: PlaylistPresentation

    series: PlaylistPresentation | null

    recommended: Array<LinkPresentation>
  }

  siteInfo: SiteInfoPresentation

  pageInfo: PageInfoPresentation

  author: AuthorPresentation
}
