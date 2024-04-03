import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'y3yrwkpj',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-01-30', // use current date (YYYY-MM-DD) to target the latest API version
})

const contentBlocks = (`
  _type == "sectionHome_Hero" => {..., "imageURL": image.asset->url},
  _type == "sectionGlobal_VideoText" => {..., "videoURL": video.asset->url},
  _type == "sectionGlobal_Projects" => {..., projects[]->{..., "projectType": type->title }},
  _type == "sectionGlobal_ImagesLink" => {...},
  _type == "sectionGlobal_Blog" => {..., "featuredPost": featuredPost->{..., "otherPosts": *[_type == "blogPost" && ^._id != _id ]{..., "categoryName": category->title } | order(publishedAt desc)[0..2] } },
`)


const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getSiteSettings() {
  const settings = await client.fetch('*[_type == "siteSettings"]')
  return settings[0]
}

export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]')
  return posts
}

export async function getHomePageContent() {
  const content = await client.fetch(`*[_type == "homePage"]{..., content[]{${contentBlocks}} }`)
  return content[0]
}

export async function getProjects() {
  const content = await client.fetch('*[_type == "project"]{..., "projectType": type->title, "projectTypeSlug": type->slug, "technologies": technology[]->{title, slug} } | order(launchDate desc) ')
  return content
}

export async function getProjectTypes() {
  const projectTypes = await client.fetch('*[_type == "projectType"]')
  return projectTypes
}

export async function getWorkPageContent() {
  const pageContent = await client.fetch('*[_type == "workPage"]')
  return pageContent
}