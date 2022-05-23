import libpath from "path";

export class ImagePath {

  private path: string

  constructor(path: string) {

    if (path.length == 0) {
      throw new Error("Empty Image path.")
    }
    this.path = path
  }

  getRelativePath(): string {
    return libpath.normalize(`public/images/${this.path}`)
  }

  getAbsolutePath(): string {
    return libpath.normalize(`/images/${this.path}`)
  }

  proper(): string {
    return libpath
      .basename(this.path)
      .split(".")[0]
      .split(/[\-_]/)
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
  }

  toString() {
    return this.path
  }
}
