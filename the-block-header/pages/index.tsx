import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import { Post, HomeProps } from '../types/types'
import Link from 'next/link'

export default function Home({posts}: HomeProps) {
  const postsMap = posts.map((post, idx) => {
    return (
      // turn this into separate Post component
      <Link href={`/posts/${post.slug}`} key={idx} passHref={true}>
        <div>
          <h3>{post.frontmatter.title}</h3>
          <p>{post.frontmatter.description}</p>
          <p>{post.frontmatter.date}</p>
        </div>
      </Link>
    )
  })

  return (
    <div>
      <Head>
        <title>The Block Header</title>
      </Head>
      
      <div className="posts">
        {postsMap}
      </div>

      
    </div>
  )
}

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