export class PublishDate {

  private date: Date

  constructor(date: string) {
    const matches = date.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2})$/)
    if (!matches) {
      throw new Error(`Invalid date format: ${date}`)
    }
    this.date = new Date(
      parseInt(matches[1], 10),
      parseInt(matches[2], 10) - 1,
      parseInt(matches[3], 10),
      parseInt(matches[4], 10),
      parseInt(matches[5], 10)
    )
  }

  toString(): string {
    const yyyy = this.date.getFullYear().toString();
    const mm = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const dd = this.date.getDate().toString().padStart(2, '0')
    const h = this.date.getHours().toString().padStart(2, '0');
    const i = this.date.getMinutes().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${h}:${i}`;
  }

  // 2022-03-23 11:05 -> 202203231105
  toNumber(): number {
    return this.date.getFullYear() * 100000000 +
      (this.date.getMonth() + 1) * 1000000 +
      this.date.getDate() * 10000 +
      this.date.getHours() * 100 +
      this.date.getMinutes()
  }
}
