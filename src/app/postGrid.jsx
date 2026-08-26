

export default function PostGrid({ items }) {
    return (
        <ul className="postGrid">
            {items.map((post) =>
            (
                <a key={`post${post.postId}`} className="gridPost" href={`/p/${post.postId}`}>
                    {post.source ? <img src={post.source}></img> : <div className="postContent">
                        {post.desc}
                    </div>}
                    <div className="postHeader">
                        <h4>{post.title}</h4> <p>{post.postDate.split(" ")[0]}</p>
                    </div>
                </a>
            )
            )}
        </ul>

    )
}