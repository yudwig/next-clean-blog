export class AnchorLink {

  private title: string

  private id: string

  constructor(title: string, id: string) {

    if (title.length == 0) {
      throw new Error("Empty AnchorLink title.")
    }

    if (id.length == 0) {
      throw new Error("Empty AnchorLink id.")
    }

    this.title = title
    this.id = id
  }

  toString(): string {
    return this.title
  }
}
