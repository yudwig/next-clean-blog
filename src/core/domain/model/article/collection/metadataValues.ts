import {TagList} from "./tagList";
import {CategoryList} from "./categoryList";
import {SeriesNameList} from "./seriesNameList";
import {MetadataValuesRecord} from "../../../../application/dto/record/metadataValuesRecord";
import {SlugList} from "./slugList";

export class MetadataValues {

  readonly tags: TagList

  readonly categories: CategoryList

  readonly seriesNames: SeriesNameList

  readonly slugs: SlugList

  constructor(props: {tags: TagList, categories: CategoryList, seriesNames: SeriesNameList, slugs: SlugList}) {
    this.tags = props.tags
    this.categories = props.categories
    this.seriesNames = props.seriesNames
    this.slugs = props.slugs
  }

  static create(record: MetadataValuesRecord): MetadataValues {
    return new MetadataValues({
      tags: TagList.create(record.tags),
      categories: CategoryList.create(record.categories),
      seriesNames: SeriesNameList.create(record.seriesNames),
      slugs: SlugList.create(record.slugs)
    })
  }
}
