import {ArticleRepository} from "../../repository/articleRepository";
import {GetMetadataValuesResult} from "../../dto/result/getMetadataValuesResult";

export class GetMetadataValues {

  readonly repository: ArticleRepository

  constructor(props: {
    repository: ArticleRepository
  }) {
    this.repository = props.repository
  }

  handle(): GetMetadataValuesResult {
    return {
      values: this.repository.fetchMetadataValues()
    }
  }
}
