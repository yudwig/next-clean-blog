import {ArticleRecord} from "../../../../application/dto/record/articleRecord";
import {Article} from "../entity/article";
import {Body} from "../value/body";
import {Metadata} from "../entity/metadata";

export class ArticleFactory {

  create(record: ArticleRecord): Article | undefined {
    let meta = Metadata.create(record.meta)
    if (meta === undefined) {
      return undefined
    }
    return new Article({
      body: new Body(record.text),
      meta: meta
    })
  }
}
