import Image from "next/image"
import { AuthorPresentation } from "../../../core/adapter/output/article/authorPresentation"

const AuthorTag = (props: { author: AuthorPresentation }) => {
  return (
    <div className="flex flex-row items-center gap-x-5">
      <div className="flex justify-center mx-auto items-center">
        <Image
          src={props.author.image}
          alt={props.author.name}
          height={48}
          width={48}
          className="rounded-full"
        />
      </div>
      <h2 className="w-full font-medium">{props.author.name}</h2>
    </div>
  )
}

export default AuthorTag
