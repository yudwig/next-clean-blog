import {MetadataList} from "../../domain/model/article/collection/metadataList";
import {Metadata} from "../../domain/model/article/entity/metadata";

export class ArticleRecommendationService {

  recommend(current: Metadata, list: MetadataList, count: number): MetadataList {
    return this.shuffle(list).sliceFromFirst(count)
  }

  private shuffle(list: MetadataList): MetadataList {
    const f = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    return new MetadataList(f(list.getArray()))
  }
}
