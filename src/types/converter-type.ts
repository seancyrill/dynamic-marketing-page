export type IdType = string

export type ImgParamsType = {
  imageUrl: string
  upscale?: boolean
  extendVertical?: {
    apply: boolean
    upscaleExtended: boolean
  }
}

export type ConvertParamsType = {
  listing_orig_id: IdType
  imgArr: ImgParamsType[]
}

export type ConvertResponseType = {
  listing_orig_id: string
  data: {
    results: ConvertResultType[]
    imgSource: string
    imgAsset: string
  }[]
}

export type ConvertResultType = {
  type: "conversion" | "upscale" | "extend vertical" | "upscale vertical"
  url: string
  taskId: string
  assetid?: string
}
