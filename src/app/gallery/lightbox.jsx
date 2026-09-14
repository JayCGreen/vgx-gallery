'use client'
import { useState, useEffect } from "react"
import style from "./lightbox.module.css"
import PillBox from "../pillbox"

export default function Lightbox({ items, index, setIndex }) {
    //const [lightboxIndex, setIndex] = useState(index);
    const [showInfo, setShowInfo] = useState(false)
    //const post = items[index]
    /*
    useEffect(()=>{
        setIndex(index)
    }, [index])
    */

    const len = items?.length;
    console.log(items[index])
    console.log("collecion is", items[index]?.collections)
    useEffect(() => {
        function handSwipe(e) {
            console.log("hit with the swipe", e)
        }
        console.log("hey am I seen")
        window.addEventListener("scrollend", handSwipe)
        console.log("testing", document.getElementsByClassName("activeImg")[0])
        document.getElementsByClassName("activeImg")[0]?.scrollIntoView();
        return () => window.removeEventListener("scrollend", handSwipe)
    }, [index])

    return (<>
        {index != undefined ? <div className={style.lightbox}>
            <div className={style.topControls}>
                <button onClick={() => setShowInfo(!showInfo)}> Info</button>
                <div>
                    <button className={style.lightboxControls} onClick={() => setIndex((((index - 1) % len) + len) % len)}>&#8896;</button>
                    <button className={style.lightboxControls} onClick={() => setIndex((((index + 1) % len) + len) % len)}> &#8897;</button>
                </div>
                <button onClick={() => setIndex()}>Exit</button>

            </div>
            <div className={style.lightScroller}>
                {items.map((post, i) => (
                    <div key={`lb_${post.postId}`} className={`${style.lightboxContent} ${i == index ? "activeImg" : ""}`}>
                        <div className={style.lightItem}>
                            <img className={style.lightboxImg} src={post.uri}></img>
                            {showInfo ? <div className={style.postInfo}>
                                <div className={style.postHeader}>
                                    <h2>{post.title}</h2>
                                    <p>{post.uploadDate?.split(" ")[0]}</p>
                                </div>
                                <p>{post.description}</p>
                                {post.collections?.length > 0 ? <div>
                                    <h5>Collections</h5>
                                    <PillBox editable={false} group={post.collections}></PillBox>
                                </div> : null}
                                {post.tags?.length > 0 ? <div>
                                    <h5>Tags</h5>
                                    <PillBox editable={false} group={post.tags}></PillBox>
                                </div> : null}
                            </div> : null}
                        </div>
                    </div>))}
            </div>
        </div> : null}
    </>)
}