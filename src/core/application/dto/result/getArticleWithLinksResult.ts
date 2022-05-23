import {Article} from "../../../domain/model/article/entity/article";
import {TimelinePlaylist} from "../../../domain/model/article/collection/timelinePlaylist";
import {SeriesPlaylist} from "../../../domain/model/article/collection/seriesPlaylist";
import {MetadataList} from "../../../domain/model/article/collection/metadataList";

export interface GetArticleWithLinksResult {

  article: Article

  link: {

    timeline: TimelinePlaylist

    series?: SeriesPlaylist

    recommended: MetadataList

    side: MetadataList
  }
}
