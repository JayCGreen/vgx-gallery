

export default function PostGrid({ items }) {
    return (
        <ul className="postGrid">
            {items.map((post) =>
            (
                <li key={`post${post.postId}`} className="gridPostContainer">
                    <a className="gridPost" href={`/p/${post.postId}`}>
                        <div className="gridPostHeader">
                            <h4>{post.title}</h4> <p>{post.postDate.split(" ")[0]}</p>
                        </div>
                        <div className="gridPostContent">
                            {post.source ? <img className="postImage" src={post.source}></img> :
                                <span className="gridPostDesc">
                                    {post.desc}
                                </span>
                            }
                        </div>

                    </a>
                </li>
            )
            )}
        </ul>

    )
}