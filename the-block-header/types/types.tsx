export interface Post {
    slug: string
    content: string
    frontmatter: Frontmatter
}

export interface Frontmatter {
    title: string
    description: string
    date?: string
    author?: string
}

export type HomeProps = {
    posts: Array<Post>
}

export interface PostProps {
    code: string
    frontmatter: any
}

export interface Params {
    params: {
        slug: string
    }
}