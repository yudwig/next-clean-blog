import {Slug} from "../value/slug";
import {Title} from "../value/title";
import {PublishDate} from "../value/publishDate";
import {Image} from "../value/image";
import {TagList} from "../collection/tagList";
import {Category} from "../value/category";
import {Body} from "../value/body";
import {Metadata} from "./metadata";
import {Author} from "./author";

export interface ArticleProps {

  meta: Metadata

  body: Body
}

export class Article {

  readonly meta: Metadata

  readonly slug: Slug

  readonly title: Title

  readonly published: PublishDate

  readonly image: Image

  readonly tags: TagList

  readonly category: Category

  readonly body: Body

  readonly author?: Author

  constructor(props: ArticleProps) {
    this.meta = props.meta
    this.slug = props.meta.slug
    this.title = props.meta.title
    this.published = props.meta.published
    this.image = props.meta.image
    this.tags = props.meta.tags
    this.category = props.meta.category
    this.body = props.body
    this.author = props.meta.author
  }
}
