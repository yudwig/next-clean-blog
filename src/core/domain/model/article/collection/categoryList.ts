import {MetadataValueArray} from "./metadataValueArray";
import {Category} from "../value/category";

export class CategoryList {

  readonly list: MetadataValueArray<Category>

  constructor(list: Array<Category>) {
    this.list = new MetadataValueArray<Category>(list)
  }

  static create(strings: Array<string>): CategoryList {
    return new CategoryList(
      strings.map(str => new Category(str))
    )
  }
}
