// import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { DmpDataType } from "../app/api/dmp/[dmp_id]/route"
import testData from "../../test_data/test_data.json"

// hardcoding data, cant generate videos anymore
export async function getDmpData(dmp_id: string) {
  try {
    // const host = (await headers()).get("host")
    // const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

    // const res = await fetch(`${protocol}://${host}/api/dmp/${dmp_id}`)
    // const dmpData: DmpDataType = await res?.json()

    const dmpData = testData.find((test) => test.dmp_id === dmp_id) as DmpDataType

    if (
      /* !res.ok || */
      !dmpData?.videos?.video_url ||
      !dmpData?.videos?.video_clip_joint?.length
    ) {
      notFound()
    }

    return dmpData
  } catch (error) {
    throw error
  }
}
