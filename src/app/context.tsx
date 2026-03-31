"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import { scrollToBottom } from "./utils/scroll-to-bottom"

type VideoContextType = {
  videoReady: boolean
  setVideoReady: React.Dispatch<React.SetStateAction<boolean>>
  showVideo: boolean
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>
  shouldScroll: boolean
  setShouldScroll: React.Dispatch<React.SetStateAction<boolean>>
}

const VideoeContext = createContext({} as VideoContextType)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoReady, setVideoReady] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    if (shouldScroll) {
      // Small timeout ensures the DOM has rendered the new section
      setTimeout(() => {
        scrollToBottom(1000)
        setShouldScroll(false) // reset trigger
      }, 50)
    }
  }, [shouldScroll])

  return (
    <VideoeContext.Provider
      value={{
        videoReady,
        setVideoReady,
        showVideo,
        setShowVideo,
        shouldScroll,
        setShouldScroll,
      }}
    >
      <div>{children}</div>
    </VideoeContext.Provider>
  )
}

export const useVideoeContext = () => useContext(VideoeContext)
