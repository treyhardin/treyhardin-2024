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
  _type == "sectionGlobal_Projects" => {..., projects[]->{..., "projectType": { "title": type->title, "slug": type->slug } }},
  _type == "sectionGlobal_ImagesLink" => {...},
  _type == "sectionGlobal_Blog" => {..., "featuredPost": featuredPost->{..., "otherPosts": *[_type == "blogPost" && ^._id != _id ]{..., "categoryName": category->title } | order(publishedAt desc)[0..2] } },
  _type == "sectionGlobal_TextVideoAutoplay" => {..., "videoURL": video.asset->url},
  _type == "sectionGlobal_TextMedia" => {...},
  _type == "sectionGlobal_ContentBlocks" => {...},
  _type == "sectionProject_Info" => {...},
  _type == "sectionGlobal_TickerLink" => {...},
`)


const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getSiteSettings() {
  const settings = await client.fetch('*[_type == "siteSettings"]')
  return settings[0]
}

export async function getBlogPosts() {
  const posts = await client.fetch('*[_type == "blogPost"]{..., category->{...} } | order(publishedAt desc)')
  return posts
}

export async function getHomePageContent() {
  const content = await client.fetch(`*[_type == "homePage"]{..., content[]{${contentBlocks}} }`)
  return content[0]
}

export async function getProjects() {
  const content = await client.fetch(`*[_type == "project"]{..., mainImage{..., asset->{_id, metadata, altText} }, "projectType": { "title": type->title, "slug": type->slug }, "technologies": technology[]->{title, slug}, content[]{${contentBlocks}} } | order(launchDate desc) `)
  return content
}

export async function getRelatedProjects(project) {
  const relatedProjects = await client.fetch(`*[_type == "project" && type->slug.current == '${project.projectType.slug.current}' && slug.current != '${project.slug.current}']{..., "projectType": { "title": type->title, "slug": type->slug }} `)
  const allProjects = await client.fetch(`*[_type == "project"]`)
  return { relatedProjects, allProjects }
}

export async function getProjectTypes() {
  const projectTypes = await client.fetch('*[_type == "projectType"]')
  return projectTypes
}

export async function getWorkPageContent() {
  const pageContent = await client.fetch('*[_type == "workPage"]')
  return pageContent
}