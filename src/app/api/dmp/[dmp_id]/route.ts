import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/db"

export type DmpDataType = {
  dmp_type: "just sold" | "listing" | "monthly highlights"
  dmp_magic_link: string | null
  videos: {
    video_url: string
    video_clip_joint: {
      listing_images: {
        listing_image_converted_video: string
        listing_image_url: string
      }
    }[]
  }
  listing: {
    listing_bathrooms: number | null
    listing_bedrooms: number | null
    listing_parking: number | null
    listing_price: string | null
    listing_sold_price: number | null
    listing_address: string | null
    listing_sold_method: string | null
    listing_sold_date: string | null
  } | null
  users: {
    user_business: string | null
    user_firstname: string | null
    user_surname: string | null
    user_city: string | null
  } | null
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ dmp_id: string }> }) {
  const { dmp_id } = await params

  if (!dmp_id) {
    return NextResponse.json({ error: "Missing dmp_id" }, { status: 400 })
  }

  try {
    const response = await prisma.dynamic_Marketing_Pages.findFirst({
      where: {
        dmp_id,
      },
      select: {
        dmp_type: true,
        dmp_magic_link: true,
        users: {
          select: {
            user_firstname: true,
            user_surname: true,
            user_business: true,
            user_city: true,
          },
        },
        listing: {
          select: {
            listing_address: true,
            listing_bedrooms: true,
            listing_bathrooms: true,
            listing_parking: true,
            listing_sold_price: true,
            listing_price: true,
            listing_sold_method: true,
            listing_sold_date: true,
          },
        },
        videos: {
          select: {
            video_url: true,
            video_clip_joint: {
              select: {
                listing_images: {
                  select: {
                    listing_image_converted_video: true,
                    listing_image_url: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!response) {
      return NextResponse.json({ error: "DMP not found" }, { status: 404 })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error(error)

    return NextResponse.json(error, { status: 500 })
  }
}
