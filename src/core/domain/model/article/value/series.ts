import {SeriesName} from "./seriesName";

export class Series {

  readonly name: SeriesName

  readonly index: number

  constructor(name: string, index: number) {

    if (index < 1) {
      throw new Error(`Series index needs to be larger than 0. input: ${index}`)
    }

    this.name = new SeriesName(name)
    this.index = index
  }

  toString(): string {
    return `${this.name} (${this.index})`
  }
}
