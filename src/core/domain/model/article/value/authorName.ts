export class AuthorName {

  private name: string

  constructor(name: string) {

    if (name.length == 0) {
      throw new Error("Empty AuthorName.")
    }

    this.name = name
  }

  toString(): string {
    return this.name
  }
}
