import {MetadataList} from "../../../domain/model/article/collection/metadataList";
import {MetadataValues} from "../../../domain/model/article/collection/metadataValues";

export interface SearchMetadataListWithLinksResult {

  list: MetadataList

  link: {

    side: MetadataList

    values: MetadataValues
  }
}
