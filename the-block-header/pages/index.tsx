import fs from 'fs'
import matter from 'gray-matter'
import { Post, HomeProps } from '../types/types'
import PostCard from '../components/PostCard'
import React from 'react'

export default function Home({posts}: HomeProps) {
  // Iterate through each post and render a preview card
  const postsMap = posts.map((post, idx) => {
    return (  
      <React.Fragment key={idx}>
        <PostCard {...post} />
      </React.Fragment>
    )
  })

  // Render all preview cards in main content section
  return (    
    <>
      <h1>Recent Posts</h1>
      {postsMap}
    </>
  )
}

// Retrieve posts data from posts directory to use as Home component props
export async function getStaticProps() {
  const postFiles = fs.readdirSync(`${process.cwd()}/posts`)

  const posts: Array<Post> = postFiles.map((fileName) => {
      const file = fs.readFileSync(`posts/${fileName}`).toString()

      const { data, content } = matter(file)
      const frontmatter = { title: data.title, description: data.description }

      return {
          slug: fileName.replace('.mdx', ''),
          content: content,
          frontmatter
      }
  })

  return {
      props: {
          posts
      }
  }
}