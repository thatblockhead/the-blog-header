import Link from "next/link"
import { Post } from "../types/types";

export default function Post(post: Post) {
    
    return (
        <div key={post.slug} className="card">
            {/* <img src={post.frontmatter.cover_img} alt="" /> */}
            <h1>{post.frontmatter.title}</h1>
        </div>
    )
}