import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'y3yrwkpj',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-01-30', // use current date (YYYY-MM-DD) to target the latest API version
})


const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getSiteSettings() {
  const settings = await client.fetch('*[_type == "siteSettings"]')
  return settings
}

export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]')
  return posts
}

export async function getHomePageContent() {
  const content = await client.fetch('*[_type == "homePage"]')
  return content
}

export async function getProjects() {
  const content = await client.fetch('*[_type == "project"]')
  return content
}