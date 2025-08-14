import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/db"
import { InviteLinkParams, generateInviteLink } from "../../../../lib/generate-invite-link"

type VideoRouteParams = {
  video_id: string
  listing_orig_id: string
  inviteParams: InviteLinkParams
}

export async function POST(request: NextRequest) {
  try {
    const { listing_orig_id, video_id, inviteParams }: VideoRouteParams = await request.json()

    if (!video_id || !listing_orig_id || !inviteParams) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 })
    }

    const dmp_magic_link: any = 1 //generateInviteLink()

    const created = await prisma.dynamic_Marketing_Pages.create({
      data: {
        video_id,
        listing_orig_id,
        dmp_magic_link,
      },
      select: {
        dmp_id: true,
      },
    })

    return NextResponse.json(created, { status: 200 })
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
