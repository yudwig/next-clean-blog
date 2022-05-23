import {ImageTitle} from "./imageTitle";
import {ImagePath} from "./imagePath";

export class Image {

  readonly title: ImageTitle

  readonly path: ImagePath

  constructor(path: ImagePath, title: ImageTitle) {
    this.path = path
    this.title = title
  }

  static createFromPath(path: string): Image {
    const imagePath = new ImagePath(path)
    return new Image(
      imagePath,
      new ImageTitle(imagePath.proper())
    )
  }

  toString(): string {
    return this.title.toString()
  }
}
