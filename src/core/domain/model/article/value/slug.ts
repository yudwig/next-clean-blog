export class Slug {

  private slug: string

  constructor(slug: string) {

    const invalid = slug.match(/[^a-zA-Z0-9\-_]+/)
    if (invalid != undefined) {
      throw new Error(`Invalid character: ${invalid}`)
    }
    if (slug.length < 1 || slug.length > 31) {
      throw new Error(`Invalid length: ${slug.length}, ${slug}`)
    }
    this.slug = slug
  }

  toString(): string {
    return this.slug
  }

  equals(slug: Slug): Boolean {
    return this.toString() === slug.toString()
  }
}
