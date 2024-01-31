import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'y3yrwkpj',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-01-30', // use current date (YYYY-MM-DD) to target the latest API version
})

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