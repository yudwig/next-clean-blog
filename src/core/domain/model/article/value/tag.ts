export class Tag {

  private name: string

  constructor(name: string) {
    if (name.length === 0) {
      throw new Error("Empty tag name.")
    }
    this.name = name
  }

  toString(): string {
    return this.name
  }
}
