// utils/scrollToBottom.ts
export function scrollToBottom(duration = 1000) {
  const start = window.scrollY
  const end = document.body.scrollHeight - window.innerHeight
  const distance = end - start
  const startTime = performance.now()

  function scroll(currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1) // clamp between 0 and 1

    // Ease-in-out function for smoothness
    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    window.scrollTo(0, start + distance * easeInOut(progress))

    if (progress < 1) {
      requestAnimationFrame(scroll)
    }
  }

  requestAnimationFrame(scroll)
}
