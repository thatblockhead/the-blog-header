import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { Params, PostProps } from '../../types/types'

export default function PostPage({ code, frontmatter }: PostProps) {
    const Component = useMemo(() => getMDXComponent(code), [code])
    return (
        <>
        <h2>{frontmatter.title}</h2>
        <p>{frontmatter.description}</p>
        <p>{frontmatter.date}</p>
        <article>
            <Component />
        </article>
        </>
    
    )
}

export async function getStaticPaths() {
    const filenames: string[] = fs.readdirSync(`${process.cwd()}/posts`)

    const slugs = filenames.map((filename) => {
        return {
            params: {
                slug: filename.replace('.mdx', '')
            }
        }
    })

    return {
        paths: [...slugs],
        fallback: false
    }
}

export async function getStaticProps({ params }: Params) {
    const slug = params.slug

    const postPath = `${process.cwd()}/posts/${slug}.mdx`
    const markdown = await bundleMDX({ file: postPath })
    const { code, frontmatter } = markdown

    return { props: {
        code,
        frontmatter
        }
    }
}