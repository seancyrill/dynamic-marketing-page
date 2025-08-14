import Image from "next/image"
import React from "react"

type Props = {
  img: string
  video: string
}

export default function About({ img, video }: Props) {
  return (
    <section className="relative z-20 flex h-screen overflow-clip">
      {/* main content */}
      <div
        id="aboutPage"
        className="text-dark relative z-10 mx-auto grid h-screen w-full max-w-[100rem] grid-cols-1 grid-rows-3 gap-4 p-4 font-mono backdrop-blur-lg sm:grid-cols-2 sm:grid-rows-2 sm:p-8 sm:backdrop-blur-xl"
      >
        {/* grid 1 */}
        <div className="flex flex-col items-start justify-center gap-4 sm:gap-8 sm:pl-[20%]">
          <p className="text-lg sm:text-4xl xl:text-6xl">Revolutionize Your Listing Marketing</p>
          <p className="text-xs sm:text-base">
            This is just one example of how Reelo can transform your property marketing. Our AI
            platform automatically creates professional videos for all your listing, saving you time
            and helping you win more business.
          </p>
          <a href="https://reelo.au/" target="_blank" className="ml-auto text-sm sm:ml-0">
            ▶ Reelo
          </a>
        </div>

        {/* grid 2 */}
        <div className="hidden sm:block" />

        {/* grid 3 */}
        <div className="flex flex-col sm:p-[10%] sm:pt-0">
          <p>original image:</p>
          <div className="aspect-video h-fit min-h-0 object-contain">
            <Image src={img} alt="imgShowCase" className="h-full object-contain" />
          </div>
        </div>

        {/* grid 4 */}
        <div className="flex flex-col sm:p-[5%] sm:pt-0">
          <p>converted video:</p>
          <div className="h-fit min-h-0 object-contain">
            <video
              src={video}
              className="h-full min-h-0 object-contain"
              loop
              autoPlay
              controls
              muted
            />
          </div>
        </div>
      </div>

      {/* backdrop */}
      <div className="bg-bright absolute top-0 left-0 mt-[-100vh] grid h-[250vh] w-full place-content-center">
        <div className="border-dark sticky top-0 left-0 mt-[-100vh] grid h-screen w-[200px] place-content-center border-x-[5px] sm:w-[250px]">
          <div className="bg-glow mt-12 size-16 rounded-full" />
        </div>
      </div>
    </section>
  )
}
