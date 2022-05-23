export class Status {

  private status: boolean

  constructor(status: number) {
    if (status === 1) {
      this.status = true
    } else if (status === 0) {
      this.status = false
    } else {
      throw new Error("Invalid status value found. Input 1 or 0")
    }
  }

  isPrivate(): boolean {
    return !this.status
  }

  toString(): string {
    return this.status ? "true" : "false"
  }
}
