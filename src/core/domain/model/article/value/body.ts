export class Body {

  private text: string

  constructor(text: string) {
    this.text = text
  }

  toString(): string {
    return this.text
  }
}
