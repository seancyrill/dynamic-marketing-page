import About from "../components/About"
import Cooking from "../components/Cooking"
import Video from "../components/Video"
import Hero from "../components/Hero"
import { Metadata } from "next"
import { getDmpData } from "../../lib/get-dmp-data"

type Props = { params: Promise<{ dmp_id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dmp_id } = await params

  const { dmp_type, listing } = await getDmpData(dmp_id)

  const title = listing?.listing_address
    ? `Reelo - ${listing.listing_address}`
    : `Reelo's take on your ${dmp_type}`

  return {
    title,
    description: `A showcase on how Reelo can transform ${listing?.listing_address ?? "your listing"} into a professional and engaging video to help you sell faster.`,
    icons: {
      icon: "/icon-320.png",
    },
  }
}

export default async function JustSoldPage({ params }: Props) {
  const { dmp_id } = await params

  const dmpData = await getDmpData(dmp_id)

  const { video_clip_joint } = dmpData.videos
  const { listing_image_converted_video, listing_image_url } = video_clip_joint?.[0]?.listing_images

  return (
    <>
      <Hero video_clip_joint={video_clip_joint} dmpType={dmpData.dmp_type} />
      {listing_image_converted_video && listing_image_url && (
        <About img={listing_image_url} video={listing_image_converted_video} />
      )}
      <Cooking />
      <Video dmpData={dmpData} />
    </>
  )
}
