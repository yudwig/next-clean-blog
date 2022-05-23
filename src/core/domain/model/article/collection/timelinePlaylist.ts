import {Metadata} from "../entity/metadata";
import {PlaylistCursor} from "./playlistCursor";
import {MetadataList} from "./metadataList";

export class TimelinePlaylist {

  readonly cursor: PlaylistCursor

  private list: MetadataList

  constructor(current: Metadata, list: MetadataList, count: number) {
    this.cursor = new PlaylistCursor(current, list.sortByNewest())
    this.list = list.remove([current]).sortByNewest().sliceFromFirst(count)
  }

  getSortedByNewestList(): MetadataList {
    return this.list
  }
}
