import {AuthorId} from "../value/authorId";
import {AuthorName} from "../value/authorName";
import {AuthorDescription} from "../value/authorDescription";
import {AuthorRecord} from "../../../../application/dto/record/authorRecord";
import {Image} from "../value/image";
import {ImagePath} from "../value/imagePath";
import {ImageTitle} from "../value/imageTitle";

export interface AuthorProps {

  id: AuthorId

  name: AuthorName

  description: AuthorDescription

  image: Image
}

export class Author {

  readonly id: AuthorId

  readonly name: AuthorName

  readonly description: AuthorDescription

  readonly image: Image

  constructor(props: AuthorProps) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.image = props.image
  }

  static create(record: AuthorRecord): Author {
    return new Author({
      id: new AuthorId(record.id),
      name: new AuthorName(record.name),
      description: new AuthorDescription(record.description),
      image: new Image(
        new ImagePath(record.image),
        new ImageTitle(`profile image of ${record.name}`)
      )
    })
  }
}
