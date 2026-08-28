import styles from "./postGrid.module.css"

export default function PostGrid({ items }) {
    return (
        <ul className={styles.postGrid}>
            {items.map((post) =>
            (
                <li key={`post${post.postId}`} className={styles.gridPostContainer}>
                    <a className={styles.gridPost} href={`/p/${post.postId}`}>
                        <div className={styles.gridPostHeader}>
                            <h4>{post.title}</h4> <p>{post.postDate.split(" ")[0]}</p>
                        </div>
                        <hr style={{width: "100%"}}></hr>
                        <div className={styles.gridPostContent}>
                            {post.source ? <img className={styles.postImage} src={post.source}></img> :
                                <span className={styles.gridPostDesc}>
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