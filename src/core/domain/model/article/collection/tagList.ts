import {Tag} from "../value/tag";
import {MetadataValueArray} from "./metadataValueArray";

export class TagList {

  readonly list: MetadataValueArray<Tag>

  constructor(list: Array<Tag>) {
    this.list = new MetadataValueArray<Tag>(list)
  }

  static create(strings: Array<string>): TagList {
    return new TagList(
      strings.map(str => new Tag(str))
    )
  }

  toString(): string {
    return this.list.toStrings().toString();
  }
}
