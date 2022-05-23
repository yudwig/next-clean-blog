import { SiteInfoPresentation } from "../../../core/adapter/output/article/siteInfoPresentation"
import { GiFClef } from "react-icons/gi"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import {AiFillGithub} from "react-icons/ai";

const SiteHeader = (props: { siteInfo: SiteInfoPresentation }) => {
  const router = useRouter()

  const onclick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <header className="w-full shadow py-5 px-5 md:px-10 flex items-center justify-between">
      <div
        className="flex flex-row gap-x-2 items-center w-60 cursor-pointer"
        onClick={onclick}
      >
        <div>
          <GiFClef size={40} />
        </div>
        <div className="w-56">
          <Image
            src="/images/icons/logo.svg"
            alt="logo"
            width={100}
            height={10}
            layout="responsive"
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <a
          target="_blank"
          href="https://github.com/yudwig/next-clean-blog"
          rel="noopener noreferrer"
          className="hover:opacity-80 cursor-pointer"
        >
          <AiFillGithub size={30} color="gray"/>
        </a>
      </div>
    </header>
  )
}

export default SiteHeader
