export type InviteLinkParams = {
  email?: string
  role?: string
  realtorFirstName?: string
  realtorLastName?: string
  realtorPhone?: string
  agencyName?: string
  agencyWebsite?: string
  agencyCity?: string
  pageTitleText?: string
  initialiseAccountCreditsCents?: number
  agencyLogoUrl?: string
  realtorHeadshotUrl?: string
}

export async function generateInviteLink(
  videoUrl: string,
  imageUrl: string,
  inviteParams: InviteLinkParams,
) {
  const { REELO_INVITE_URL, REELO_API_KEY } = process.env

  try {
    if (!REELO_INVITE_URL || !REELO_API_KEY) {
      throw new Error("Cannot read env")
    }

    const title = `invite-${crypto.randomUUID()}`

    const data = [
      {
        ...inviteParams,
        skipOnboard: false,
        automaticallyAddOrder: {
          title,
          mainImageUrl: imageUrl,
          items: [
            {
              videoUrl,
              imageUrl,
              title: `${title}-item-1`,
            },
          ],
        },
      },
    ]

    const res = await fetch(REELO_INVITE_URL, {
      method: "POST",
      headers: {
        "x-api-key": REELO_API_KEY,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Failed generating invite link")
    }

    const result = await res?.json()

    return result
  } catch (error) {
    console.error(error)
  }
}
