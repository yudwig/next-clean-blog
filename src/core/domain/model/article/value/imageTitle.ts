export class ImageTitle {

  private title: string

  constructor(title: string) {

    if (title.length == 0) {
      throw new Error("Empty Image title.")
    }
    this.title = title
  }

  toString(): string {
    return this.title
  }
}
