export class Title {

  private text: string

  constructor(text: string) {
    if (text.length < 1 || text.length > 63) {
      throw new Error(`Invalid title length: ${text.length}, ${text}`)
    }
    this.text = text
  }

  toString(): string {
    return this.text
  }
}
