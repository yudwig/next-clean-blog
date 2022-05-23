export class AuthorDescription {

  private text: string

  constructor(text: string) {
    this.text = text
  }

  toString(): string {
    return this.text
  }
}
