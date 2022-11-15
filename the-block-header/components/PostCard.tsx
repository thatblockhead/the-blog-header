import Link from "next/link";
import { Post } from "../types/types";


export default function PostCard(post: Post) {
    return (
        <div className="postCard">
            <h2>{post.frontmatter.title}</h2>
            <div className="seperator"></div>
            <p className="description">{post.frontmatter.description}</p>
            <Link href={`/posts/${post.slug}`} passHref={true}>Read More</Link>
        </div>
    )
}