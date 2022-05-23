import {LinkPresentation} from "./linkPresentation";

export interface PlaylistPresentation {

  links: Array<LinkPresentation>

  cursor: {

    prev: LinkPresentation | null

    current: LinkPresentation

    next: LinkPresentation | null
  }
}
