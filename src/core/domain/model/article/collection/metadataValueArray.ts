import {Tag} from "../value/tag";
import {Category} from "../value/category";
import {SeriesName} from "../value/seriesName";
import {Slug} from "../value/slug";

export class MetadataValueArray<T extends Tag | Category | SeriesName | Slug> {

  private uniqueList: Array<T>

  constructor(list: Array<T>) {
    this.uniqueList = new Array<T>()
    const set = new Set<string>()
    list.forEach(value => {
      if (!set.has(value.toString())) {
        this.uniqueList.push(value)
        set.add(value.toString())
      }
    })
  }

  sortByLexicalAscOrder(): MetadataValueArray<T> {
    const memo = this.uniqueList.map((value, index) => {
      return {
        index: index,
        name: value.toString().toLowerCase()
      }
    })
    memo.sort( (a, b) => {
      if (a.name === b.name) {
        return 0
      } else {
        return (a.name > b.name) ? 1 : -1
      }
    })
    return new MetadataValueArray(memo.map(el => this.uniqueList[el.index]))
  }

  toStrings(): Array<string> {
    return this.uniqueList.map(value => value.toString())
  }

  getArray(): Array<T> {
    return this.uniqueList
  }
}
