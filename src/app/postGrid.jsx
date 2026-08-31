'use client';
import styles from "./postGrid.module.css";
import { useState, useEffect } from 'react';

export default function PostGrid({ items, pageSize, total, showMore }) {
    const [itemList, setItemList] = useState(items)
    const [offset, setOffset] = useState(pageSize)
    console.log(offset, total, offset < total)
    useEffect(() => {
        if (showMore) {
            window.addEventListener('scroll', scrolls)
            return () => {
                window.removeEventListener('scroll', scrolls);
            }
        }
    }, [itemList, offset])
    return (
        <div className={styles.component}>
            <ul className={styles.postGrid}>
                {itemList.map((post) =>
                (
                    <li key={`post${post.postId}`} className={styles.gridPostContainer}>
                        <a className={styles.gridPost} href={`/p/${post.postId}`}>

                            {post.source ?
                                <div className={styles.postMediaContainer}>
                                    <img className={styles.postImage} src={post.source}></img>
                                </div> : null}
                            <div className={styles.gridPostContent}>
                                <div className={styles.gridPostHeader}>
                                    <h4>{post.title}</h4> <p>{post?.postDate?.split(" ")[0]}</p>
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
            <div className={styles.pageControl}>
                {(showMore) ? <span>{offset} of {total}</span> : null}
                {(showMore && ((offset) < total)) ? <button onClick={loadMore}>Load More</button> : null}
            </div>
        </div>

    )
    async function loadMore() {
        if (offset < total) {
            var newPosts = await fetch(`actions/posts?offset=${offset}&limit=${pageSize}`);
            var a = await newPosts.json()
            console.log("the adder is", a)
            setItemList(() => itemList.concat(a.posts));
            setOffset(() => offset + a.posts.length)
        }
    }

    async function scrolls(ev) {
        console.log("triggered at least")
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            await loadMore();
        }
    };

}