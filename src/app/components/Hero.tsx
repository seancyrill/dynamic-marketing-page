"use client"

import React, { useEffect, useRef, useState } from "react"
import { DmpDataType } from "../api/dmp/[dmp_id]/route"
import { scrollToBottom } from "../utils/scroll-to-bottom"
import { useVideoeContext } from "../context"

type Props = {
  video_clip_joint: DmpDataType["videos"]["video_clip_joint"]
  dmpType: DmpDataType["dmp_type"]
}

// [
//   "https://framerusercontent.com/assets/H5wjPdBuwE0PMbfcv26p5jJN1vw.mp4",
//   "https://reelo.fra1.cdn.digitaloceanspaces.com/asset/http-170-64-155-158-8080-videos-d22effb1-f7c2-4cf1-96a2-a982d72cdcd0-property-showcase-video-mp4",
// ]

export default function Hero({ video_clip_joint, dmpType }: Props) {
  const { setShouldScroll } = useVideoeContext()
  /**
   * for clip background
   */
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const clips = video_clip_joint.map(
    ({ listing_images }) => listing_images?.listing_image_converted_video,
  )

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex]

    if (!currentVideo) return

    currentVideo.play()

    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % clips.length
      const nextVideo = videoRefs.current[nextIndex]

      if (!nextVideo) return

      nextVideo.play()
      setCurrentIndex(nextIndex)
    }

    currentVideo.addEventListener("ended", handleEnded)
    return () => currentVideo.removeEventListener("ended", handleEnded)
  }, [currentIndex])

  /**
   * for video tag
   */
  let videoTag = "We made a video for your LISTING"
  switch (dmpType) {
    case "just sold":
      videoTag = "We made a video for a listing you JUST SOLD"
      break

    case "monthly highlights":
      videoTag = "We made a video for your MARKETING HIGHLIGHTS"
      break

    default:
      break
  }

  return (
    <section className="relative z-50 h-svh w-full overflow-hidden font-mono">
      {/* video background loop */}

      {clips.map((src, i) => (
        <video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el
          }}
          src={src}
          muted
          autoPlay
          playsInline
          preload="auto"
          className={`absolute top-0 left-0 h-full w-full object-cover ${
            i === currentIndex ? "" : "hidden"
          }`}
        />
      ))}

      {/* main elements */}
      <div className="relative z-10 flex h-full flex-col justify-between text-white">
        <aside>
          <a
            href="https://reelo.au/"
            target="_blank"
            className="max-h-[50svh] w-full text-center font-serif text-5xl text-[26.5svw] font-bold"
          >
            REELO
          </a>
          <div className="flex w-full justify-between gap-8 px-2">
            <h4>{videoTag}</h4>
            <h4 className="font-bold">FREE</h4>
          </div>
        </aside>

        <div className="mx-auto flex flex-col gap-4">
          <button
            onClick={() => setShouldScroll(true)}
            className="relative mx-auto grid h-32 w-32 cursor-pointer place-content-center rounded-full text-center"
          >
            <p>CHECK</p>
            <p>THIS</p>
            <p>OUT</p>
            <div className="animate-button-spin absolute top-0 left-0 grid h-full w-full place-content-center rounded-full border-2 border-dashed border-white" />
          </button>

          <div className="animate-bounce text-center">
            <p>s</p>
            <p>V</p>
          </div>
        </div>
      </div>
    </section>
  )
}
