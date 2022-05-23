import {ArticleRepository} from "../../repository/articleRepository";
import {GetArticleWithLinksResult} from "../../dto/result/getArticleWithLinksResult";
import {ArticleRecommendationService} from "../../service/articleRecommendationService";
import {Slug} from "../../../domain/model/article/value/slug";
import {GetArticleWithLinksInput} from "../../dto/input/getArticleWithLinksInput";

export class GetArticleWithLinks {

  readonly repository: ArticleRepository

  readonly recommendationService: ArticleRecommendationService

  constructor(props: {
    repository: ArticleRepository
  }) {
    this.repository = props.repository
    this.recommendationService = new ArticleRecommendationService()
  }

  handle(input: GetArticleWithLinksInput): GetArticleWithLinksResult {

    const article = this.repository.fetchArticle(new Slug(input.slug))
    if (article === undefined) {
      throw new Error(`Not found article. slug: ${input.slug}`)
    }
    const all = this.repository.fetchAllMetadataList()
    const timeline = all.createTimelinePlaylist(article.meta, input.counts.timeline)

    return {
      article: article,
      link: {
        timeline: timeline,
        series: article.meta.series === undefined ? undefined :
          this.repository.searchMetadataList({
            seriesName: article.meta.series.name
          })
          .createSeriesPlaylist(article.meta),
        side: all.sortByNewest().sliceFromFirst(input.counts.side),
        recommended: this.recommendationService
          .recommend(
            article.meta,
            all.remove(timeline.getSortedByNewestList().getArray()),
            input.counts.recommended
          )
      }
    }
  }
}
