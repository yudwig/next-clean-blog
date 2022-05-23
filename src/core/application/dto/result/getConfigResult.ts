import {Config} from "../../../domain/model/config/entity/config";
import {Author} from "../../../domain/model/article/entity/author";

export interface GetConfigResult {

  config: Config

  siteAuthor: Author
}
