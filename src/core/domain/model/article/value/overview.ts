export class Overview {

  static readonly limitLength: number = 350

  private text: string

  constructor(text: string) {

    if (text.length == 0) {
      throw new Error("Empty overview text.")
    }

    this.text = text.substring(0, Overview.limitLength)
  }

  toString(): string {
    return this.text
  }
}
