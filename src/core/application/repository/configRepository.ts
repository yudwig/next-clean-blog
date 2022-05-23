import {ConfigRecord} from "../dto/record/configRecord";
import {Config} from "../../domain/model/config/entity/config";

export interface ConfigDatabaseInterface {

  fetch(): ConfigRecord
}

export const envNames = [
  "SITE_TITLE",
  "SITE_AUTHOR_ID",
  "SITE_CREATED_YEAR",
  "LIST_ARTICLES_PER_PAGE",
  "TIMELINE_LINKS_PER_PAGE",
  "RECOMMENDED_LINKS_PER_PAGE",
  "SIDEBAR_LINKS_PER_PAGE",
]

export class ConfigRepository {

  private db: ConfigDatabaseInterface

  constructor(db: ConfigDatabaseInterface) {
    this.db = db
  }

  fetch(): Config {
    return new Config(this.db.fetch())
  }
}
