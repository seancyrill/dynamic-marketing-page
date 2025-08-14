import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/db"
import { ConvertResponseType } from "../../../../types/converter-type"

/**
 * low priority
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listing_orig_id } = body

    if (!listing_orig_id || typeof listing_orig_id !== "string") {
      return NextResponse.json({ error: "Invalid or missing listing_orig_id" }, { status: 400 })
    }

    const images = await prisma.listing_Images.findMany({
      where: {
        listing_orig_id,
        listing_image_url: {
          not: null,
        },
      },
      take: 8,
      select: {
        listing_image_url: true,
        listing_image_converted_video: true,
      },
    })

    if (!images?.length) {
      return NextResponse.json({ message: "Listing have no valid images" }, { status: 204 })
    }

    const unconvertedImages: string[] = []
    const clips: string[] = []

    // distribute
    images.map(({ listing_image_converted_video, listing_image_url }) =>
      listing_image_converted_video
        ? clips.push(listing_image_converted_video)
        : unconvertedImages.push(listing_image_url!),
    )

    // process images not yet converted to videos
    if (unconvertedImages.length) {
      const convertData = {
        convertParams: {
          listing_orig_id,
          imgArr: unconvertedImages.map((imageUrl) => {
            return {
              imageUrl,
            }
          }),
        },
      }

      const response = await fetch("http://170.64.155.158:8080/convert", {
        method: "POST",
        body: JSON.stringify(convertData),
      })

      if (!response.ok) {
        throw new Error(`Conversion failed`)
      }

      const result: ConvertResponseType = await response.json()
      result.data.map(({ results }) => {
        clips.push(results[0].url)
      })
    }

    if (!clips.length) {
      return NextResponse.json({ message: "Listing have no valid clips" }, { status: 400 })
    }

    // process clips into a tempalte video

    // const created = await prisma.dynamic_Marketing_Pages.create({
    //   data: {
    //     video_id,
    //     listing_orig_id,
    //     dmp_magic_link: magicLink,
    //   },
    // })

    // return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create DMP" }, { status: 500 })
  }
}

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "*"
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
