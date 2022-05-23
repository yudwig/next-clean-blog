import {ArticleRepository} from "../../repository/articleRepository";
import {SearchMetadataListWithLinksResult} from "../../dto/result/searchMetadataListWithLinksResult";
import {ArticleRecommendationService} from "../../service/articleRecommendationService";
import {Tag} from "../../../domain/model/article/value/tag";
import {Category} from "../../../domain/model/article/value/category";
import {SeriesName} from "../../../domain/model/article/value/seriesName";
import {SearchMetadataListWithLinksInput} from "../../dto/input/searchMetadataListWithLinksInput";

export class SearchMetadataListWithLinks {

  readonly repository: ArticleRepository

  readonly recommendationService: ArticleRecommendationService

  constructor(props: {
    repository: ArticleRepository
  }) {
    this.repository = props.repository
    this.recommendationService = new ArticleRecommendationService()
  }

  handle(input: SearchMetadataListWithLinksInput): SearchMetadataListWithLinksResult {
    return {
      list: this.repository.searchMetadataList({
        tag: input.tag ? new Tag(input.tag) : undefined,
        category: input.category ? new Category(input.category) : undefined,
        seriesName: input.seriesName ? new SeriesName(input.seriesName) : undefined
      }),
      link: {
        side: this.repository
          .fetchAllMetadataList()
          .sortByNewest()
          .sliceFromFirst(input.counts.side),
        values: this.repository.fetchMetadataValues()
      }
    }
  }
}
