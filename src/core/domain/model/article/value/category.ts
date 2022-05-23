export class Category {

  private name: string

  constructor(name: string) {
    if (name.length === 0) {
      throw new Error("Empty category name.")
    }
    this.name = name
  }

  toString(): string {
    return this.name
  }
}
