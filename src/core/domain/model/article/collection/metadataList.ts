import {Metadata} from "../entity/metadata";
import {TimelinePlaylist} from "./timelinePlaylist";
import {SeriesPlaylist} from "./seriesPlaylist";

export class MetadataList {

  protected readonly list: Array<Metadata>

  constructor(list: Array<Metadata>) {
    const set = new Set<string>(list.map(meta => meta.slug.toString()))
    if (set.size !== list.length) {
      throw new Error(`Duplicated slug found.`)
    }
    this.list = list
  }

  get length(): number {
    return this.list.length
  }

  indexOf(meta: Metadata): number {
    return this.list.findIndex( m => m.equals(meta) )
  }

  get(index: number): Metadata | undefined {
    return (index > this.length || index < 0) ? undefined : this.list[index]
  }

  getArray(): Array<Metadata> {
    return this.list
  }

  sliceFromFirst(count: number): MetadataList {
    return new MetadataList(this.list.slice(0, count))
  }

  remove(excluded: Array<Metadata>): MetadataList {
    const set = new Set<string>(excluded.map(meta => meta.slug.toString()))
    return new MetadataList(this.list.filter( meta => !set.has(meta.slug.toString())))
  }

  sortByNewest(): MetadataList {
    return new MetadataList(this.list.slice().sort( (a, b) => {
      return b.published.toNumber() - a.published.toNumber()
    }))
  }

  chunk(count: number): Array<MetadataList> {
    if (count === 0) {
      return [this]
    }
    const res = new Array<MetadataList>()
    let tmp = new Array<Metadata>()

    this.list.forEach((meta, index) => {
      tmp.push(meta)
      if ((index + 1) % count === 0) {
        res.push(new MetadataList(tmp))
        tmp = []
      }
    })
    if (tmp.length > 0) {
      res.push(new MetadataList(tmp))
    }
    return res
  }

  createTimelinePlaylist(current: Metadata, count: number): TimelinePlaylist {
    return new TimelinePlaylist(current, this, count)
  }

  createSeriesPlaylist(current: Metadata): SeriesPlaylist | undefined {
    if (current.series == undefined) {
      return undefined
    }
    return new SeriesPlaylist(current, new MetadataList(
      this.list.filter(meta => meta.series !== undefined && meta.series.name.equals(current.series!.name))
    ))
  }
}

