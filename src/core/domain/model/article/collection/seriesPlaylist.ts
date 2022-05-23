import {Metadata} from "../entity/metadata";
import {PlaylistCursor} from "./playlistCursor";
import {MetadataList} from "./metadataList";

export class SeriesPlaylist {

  readonly cursor: PlaylistCursor

  readonly list: MetadataList

  constructor(current: Metadata, list: MetadataList) {
    this.validate(current, list)
    this.list = this.sortByIndex(list)
    this.cursor = new PlaylistCursor(current, list)
  }

  private sortByIndex(list: MetadataList): MetadataList {
    return new MetadataList(
      list
        .getArray()
        .slice()
        .sort((a, b) => {
          return a.series!.index - b.series!.index
        })
    )
  }

  private validate(current: Metadata, list: MetadataList) {
    list.getArray().forEach(meta => {
      if (meta.series === undefined) {
        throw new Error(`Not found series property. slug: ${meta.slug.toString()}`)
      }
    })
    if (new Set<string>(list.getArray().map(meta => meta.series!.name.toString())).size > 1) {
      throw new Error(`Multiple series were detected.`)
    }
    if (list.indexOf(current) < 0) {
      throw new Error(`Not found "${current.slug.toString()}" in MetadataList`)
    }
  }
}
