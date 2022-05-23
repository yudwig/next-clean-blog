import {MetadataValueArray} from "./metadataValueArray";
import {Slug} from "../value/slug";

export class SlugList {

  readonly list: MetadataValueArray<Slug>

  constructor(list: Array<Slug>) {
    this.list = new MetadataValueArray<Slug>(list)
  }

  static create(strings: Array<string>): SlugList {
    return new SlugList(
      strings.map(str => new Slug(str))
    )
  }

  toString(): string {
    return this.list.toString();
  }
}
