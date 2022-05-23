export class AuthorId {

  private id: string

  constructor(id: string) {

    if (id.length == 0) {
      throw new Error("Empty AuthorId.")
    }

    this.id = id
  }

  toString(): string {
    return this.id
  }
}
