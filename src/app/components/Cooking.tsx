"use client"

import { useEffect, useRef, useState } from "react"
import { useVideoeContext } from "../context"

export default function Cooking() {
  const { videoReady, setShowVideo, setShouldScroll } = useVideoeContext()
  const [startLoading, setStartLoading] = useState(false)
  const [loadingPercent, setLoadingPercent] = useState(0)
  const targetRef = useRef<HTMLDivElement>(null)

  const loadingWord = "loading"
  const readyWord = "ready"

  // 1. Start when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartLoading(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    if (targetRef.current) observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [])

  // 2. Simulate progress up to 90% over 5 seconds
  useEffect(() => {
    if (!startLoading) return

    let percent = loadingPercent
    const fakeLoadDuration = 3000 // 3s
    const fakeLoadUntil = 80
    const interval = fakeLoadDuration / fakeLoadUntil

    const loadingInterval = setInterval(() => {
      if (percent < fakeLoadUntil) {
        percent++
        setLoadingPercent(percent)
      } else if (percent === fakeLoadUntil && videoReady) {
        setLoadingPercent(100)
        clearInterval(loadingInterval)
      }
    }, interval)

    return () => clearInterval(loadingInterval)
  }, [startLoading, videoReady])

  const onClick = () => {
    setShowVideo(true)
    setShouldScroll(true)
  }

  return (
    <section className="text-bright pointer-events-none relative z-10 -mt-[100vh] flex h-[200vh] flex-col justify-between bg-black text-center font-mono text-4xl font-bold">
      <div className="sticky top-0 grid h-screen grid-cols-1 place-content-center">
        <div className="mx-auto grid h-[370px] w-[150px] place-content-center items-center justify-center overflow-clip rounded-full bg-black uppercase sm:w-[200px]">
          {loadingWord.split("").map((letter, i) => {
            return <span key={`letter${i}`}>{letter}</span>
          })}
        </div>
      </div>

      {/* sliding page */}
      <div
        className="border-neutral relative flex h-screen flex-col items-center border-y-[15px]"
        id="cooking"
      >
        {/* pipe */}
        <div
          className="border-bright w-[200px] border-x-2 bg-black sm:w-[250px]"
          style={{ height: "calc(50vh - 200px)" }}
        />

        {/* outser capsule */}
        <div className="border-bright mx-auto grid h-[400px] w-[200px] cursor-pointer justify-center rounded-b-full border-2 border-t-0 sm:w-[250px]">
          {/* capsule button */}
          <button
            className={`border-bright pointer-events-auto mx-auto h-[370px] w-[150px] overflow-clip rounded-full border-2 transition-all sm:w-[200px] ${loadingPercent === 100 ? "shadow-glow cursor-pointer shadow-[0_0_50px_20px] duration-300 hover:shadow-[0_0_60px_30px]" : "cursor-progress"}`}
            disabled={loadingPercent !== 100}
            onClick={onClick}
          >
            {/* loading bar */}
            <div
              className={`grid h-full w-full place-content-center uppercase transition-all duration-100 ${loadingPercent === 100 ? "bg-glow hover:scale-105" : "backdrop-invert"}`}
              style={{ translate: `0 ${100 - loadingPercent}%` }}
            >
              {readyWord.split("").map((letter, i) => {
                return (
                  <span
                    className={`transition-all duration-300 ${loadingPercent === 100 ? "opacity-100" : "opacity-0"}`}
                    key={`letter${i}`}
                  >
                    {letter}
                  </span>
                )
              })}
            </div>
          </button>
        </div>

        {/* loading start intersection */}
        <div ref={targetRef} className="absolute bottom-0 mb-[20vh] size-[1px]" />
      </div>
    </section>
  )
}
