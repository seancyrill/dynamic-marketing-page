"use client"

import React, { useEffect, useRef } from "react"
import { DmpDataType } from "../api/dmp/[dmp_id]/route"
import { useVideoeContext } from "../context"

type Props = {
  dmpData: DmpDataType
}

export default function Video({ dmpData }: Props) {
  const { setVideoReady, showVideo } = useVideoeContext()
  const videoRef = useRef<HTMLVideoElement>(null)

  const { listing, dmp_type, videos, dmp_magic_link } = dmpData
  const { video_url } = videos

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlayThrough = () => {
      setVideoReady(true)
    }

    video.addEventListener("canplaythrough", handleCanPlayThrough)

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough)
    }
  }, [])

  let videoTag = "YOUR LISTING VIDEO"
  switch (dmp_type) {
    case "just sold":
      videoTag = "YOUR JUST SOLD VIDEO"
      break

    case "monthly highlights":
      videoTag = "YOUR MONTHLY HIGHLIGHTS"
      break

    default:
      break
  }

  const price = listing?.listing_sold_method
    ? `SOLD - $${listing.listing_sold_price}`
    : listing?.listing_price

  return (
    <section
      className={`bg-bright relative z-0 mx-auto -mt-[100vh] h-[200vh] font-mono ${showVideo ? "block" : "hidden"}`}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-clip">
        {/* main components */}
        <div className="m-auto grid max-w-[100rem] place-content-center p-4">
          <h1 className="relative flex min-h-40 w-full flex-none items-center justify-between">
            <span className="text-dark w-full align-text-bottom text-2xl sm:text-4xl xl:text-7xl portrait:line-clamp-3 landscape:line-clamp-2">
              {listing?.listing_address || "Somewhere around earth"}
            </span>
            <span className="text-dark mr-[0.5rem] translate-x-1/2 rotate-90 text-xs whitespace-nowrap">
              {videoTag}
            </span>
          </h1>

          <div className="w-full">
            <video
              ref={videoRef}
              src={video_url}
              preload="auto"
              controls
              className="h-full object-contain lg:max-h-[50vh] 2xl:max-h-[60vh]"
            />
          </div>

          <div className="text-dark mt-4 grid flex-none grid-cols-2 text-sm sm:flex sm:justify-between">
            <p>{price ?? "Elevate your Brand"}</p>
            <p className="text-right sm:text-left">
              {listing?.listing_bedrooms
                ? `${listing?.listing_bedrooms} Bedrooms`
                : "Generate More Leads"}
            </p>
            <p>
              {listing?.listing_bathrooms
                ? `${listing?.listing_bathrooms} Bathrooms`
                : "Prioritize Speed"}
            </p>
            <p className="text-right sm:text-left">
              {listing?.listing_parking
                ? `${listing?.listing_parking} Parking`
                : "Consistent Quality"}
            </p>
          </div>
        </div>

        {/* bottom call to action */}
        <aside className="flex flex-none items-center justify-center gap-4 bg-(--neutral) px-4 py-8 sm:px-[20%]">
          <p className="text-bright w-fit text-right text-sm sm:text-xl">
            Did you like what we did with your listing? Please book again if you need a video for
            another listing. Thank you for your support!
          </p>

          <a
            className="relative cursor-pointer rounded-full"
            href={dmp_magic_link ?? "https://app.reelo.au/dash/orders/create"}
            target="_blank"
          >
            <p className="text-bright grid size-32 cursor-pointer place-content-center rounded-full text-center">
              BOOK NOW
            </p>
            <span className="animate-button-spin border-bright absolute top-0 left-0 grid h-full w-full place-content-center rounded-full border-2 border-dashed" />
          </a>
        </aside>
      </div>
    </section>
  )
}
