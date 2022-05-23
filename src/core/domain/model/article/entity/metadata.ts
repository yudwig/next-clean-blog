import {Slug} from "../value/slug";
import {Title} from "../value/title";
import {PublishDate} from "../value/publishDate";
import {TagList} from "../collection/tagList";
import {Category} from "../value/category";
import {Status} from "../value/status";
import {Series} from "../value/series";
import {Overview} from "../value/overview";
import {Image} from "../value/image";
import {ArticleMetaRecord} from "../../../../application/dto/record/articleRecord";
import {Tag} from "../value/tag";
import {Author} from "./author";

export interface MetadataProps {

  slug: Slug

  title: Title

  published: PublishDate

  tags: TagList

  category: Category

  status: Status

  series?: Series

  overview: Overview

  image: Image

  author?: Author
}

export class Metadata {

  readonly slug: Slug

  readonly title: Title

  readonly published: PublishDate

  readonly tags: TagList

  readonly category: Category

  readonly status: Status

  readonly series: Series | undefined

  readonly image: Image

  readonly overview: Overview

  readonly author: Author | undefined

  constructor(props: MetadataProps) {
    this.slug = props.slug
    this.title = props.title
    this.published = props.published
    this.tags = props.tags
    this.category = props.category
    this.status = props.status
    this.series = props.series
    this.image = props.image
    this.overview = props.overview
    this.author = props.author

    if (props.status.isPrivate()) {
      throw new Error("Private data found. Please filter status > 0 where fetch data.")
    }
  }

  static create(record: ArticleMetaRecord): Metadata {
    if (record.status === 0) {
      throw new Error("Private data found. Please filter status > 0 where fetch data.")
    }
    return new Metadata({
      series: record.series ? new Series(record.series.name, record.series.index) : undefined,
      status: new Status(record.status),
      slug: new Slug(record.slug),
      title: new Title(record.title),
      published: new PublishDate(record.published),
      overview: new Overview(record.overview),
      image: Image.createFromPath(record.image),
      tags: new TagList(
        record.tags.map( tag => new Tag(tag) )
      ),
      category: new Category(record.category),
      author: record.author ? Author.create(record.author) : undefined
    })
  }

  equals(meta: Metadata): Boolean {
    return this.slug.equals(meta.slug)
  }

  toString(): string {
    return [
      this.slug.toString(),
      this.published.toString(),
      this.tags.toString(),
      this.category.toString()
    ]
    .join(", ")
  }
}
