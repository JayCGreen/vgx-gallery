import styles from "./postGrid.module.css"

export default function PostGrid({ items }) {
    return (
        <ul className={styles.postGrid}>
            {items.map((post) =>
            (
                <li key={`post${post.postId}`} className={styles.gridPostContainer}>
                    <a className={styles.gridPost} href={`/p/${post.postId}`}>

                        {post.source ?
                            <div className={styles.postMediaContainer}>
                                <img className={styles.postImage} src={post.source}></img>
                            </div> : null}
                        <div className={styles.gridPostContent}>
                            <div className={styles.gridPostHeader}>
                                <h4>{post.title}</h4> <p>{post.postDate.split(" ")[0]}</p>
                            </div>
                            <span className={styles.gridPostDesc}>
                                {post.desc}
                            </span>

                        </div>

                    </a>
                </li>
            )
            )}
        </ul>

    )
}