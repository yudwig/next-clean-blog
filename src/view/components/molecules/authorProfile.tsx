import Image from "next/image"
import { AuthorPresentation } from "../../../core/adapter/output/article/authorPresentation"

const AuthorProfile = (props: { author: AuthorPresentation }) => {
  return (
    <div className="">
      <div className="w-full w-44 h-44 flex justify-center mx-auto items-center">
        <Image
          src={props.author.image}
          alt="Author Image"
          height={150}
          width={150}
          className="rounded-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="m-5 font-medium">{props.author.name}</h2>
        <p className="m-5 break-all">{props.author.description}</p>
      </div>
    </div>
  )
}

export default AuthorProfile
