# Dynamic Marketing Page

## Overview

This application serves the purpose of showcasing what reelo can do to a listing. It uses the videos and the clips processed in the site. While also provided endpoints to generate pages according to the listing and video provided.

## Table of Contents

- [Development](#development)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running locally](#running-locally)

- [Dynamic page](#dynamic-page)

- [API](#api)

  - [Endpoints](#endpoints)
    - [GET /api/dmp/[dmp_id]](#get-api-dmp-id)
    - [POST /api/dmp/video](#post-api-dmp-video)
    - [POST /api/dmp/listing](#post-api-dmp-listing)

- [Future Improvements](#future-improvements)

# Development

## Prerequisites

- Node.js and npm installed

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and specify the required settings:

   ```env
    DATABASE_URL
    GIT_SSH_KEY
   ```

## Running locally

Start the application locally:

```sh
npm run dev

```

# Dynamic page

1. The app takes a **dmp_id** and fetches the data in the joint table that contains data for video, clips, listing, user etc.

2. Data is stored in the Data Teams PostgreSQL database.

# API

#### Base URL

```
to be deployed
```

#### Authentication

- Edit environment variables and add your client url. It should be an array of strings, seperated by commans, format it like this:

```env
CLIENT_URLS=["http://localhost:3500","http://my.website.owned"]
```

- Or leave it blank if you want any site to access it.

```env
CLIENT_URLS=[]
```

## Endpoints

### GET /api/dmp/[dmp_id]

- Dynamic page endpoint

**Response:**

`status` `200`

```ts
{
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
```

`status` `400`

```ts
{
  error: "Missing dmp_id"
}
```

### POST /api/dmp/video

- Create a new dynamic page with an existing video and listing

**Request:**

```ts
{
  video_id: string
  listing_orig_id: string
  magicLink: string?
}
```

**Response:**

`status` `200`

```ts
{
  dmp_id: string
}
```

`status` `400`

```ts
{
  error: "Invalid or missing video_id"
}
```

or

```ts
{
  error: "Invalid or missing listing_orig_id"
}
```

### POST /api/dmp/listing

- Create a new dynamic page from scratch
- WIP (low priority)

**Request:**

```ts
{
  listing_orig_id: string
  magicLink: string?
}
```

**Response:**

`status` `200`

```ts
{
  dmp_id: string
}
```

or

```ts
{
  error: "Invalid or missing listing_orig_id"
}
```

## Future Improvements

- listing endpoint can accept a listing url and make dmp from there
- listing scraper integration
- support more dmp types
- webhook to check when user views the page / uses the magic link
