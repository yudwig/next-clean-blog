export class SeriesName {

  private name: string

  constructor(name: string) {
    if (name.length === 0) {
      throw new Error("Empty series name.")
    }
    this.name = name
  }

  equals(name: SeriesName): boolean {
    return this.name.toString() === name.toString()
  }

  toString(): string {
    return this.name
  }
}
