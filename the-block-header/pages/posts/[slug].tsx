import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { useMemo } from 'react'
import { Params } from '../../types/types'

// export default function PostPage({ code, metadata }: PostProps) {
//     const Component = useMemo(() => getMDXComponent(code), [code])
//     return <Component />
// }

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
    const { code, frontmatter: metadata } = markdown

    return { props: {
        code,
        metadata
        }
    }
}