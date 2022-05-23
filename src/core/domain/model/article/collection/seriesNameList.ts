import {MetadataValueArray} from "./metadataValueArray";
import {SeriesName} from "../value/seriesName";

export class SeriesNameList {

  readonly list: MetadataValueArray<SeriesName>

  constructor(list: Array<SeriesName>) {
    this.list = new MetadataValueArray<SeriesName>(list)
  }

  static create(strings: Array<string>): SeriesNameList {
    return new SeriesNameList(
      strings.map(str => new SeriesName(str))
    )
  }
}
