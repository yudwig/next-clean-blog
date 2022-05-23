import {Metadata} from "../entity/metadata";
import {MetadataList} from "./metadataList";

export class PlaylistCursor {

  readonly prev?: Metadata

  readonly current: Metadata

  readonly next?: Metadata

  constructor(current: Metadata, list: MetadataList) {
    this.current = current
    const index = list.indexOf(current)
    this.prev = list.get(index - 1)
    this.next = list.get(index + 1)
  }
}
