'use client'
import { useState, useEffect } from "react"
import style from "./lightbox.module.css"
import PillBox from "../pillbox";


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
        document.getElementsByClassName("lightScroller")[0]?.addEventListener("scroll", handSwipe)
        document.getElementsByClassName("activeImg")[0]?.scrollIntoView();

        /*
        const ctx = document.getElementById("canvasTest")?.getContext("2d");
        const img = new Image();
        img.src = items[index]?.uri
        
        img.addEventListener("load", () => {
            if (ctx) {
            ctx.drawImage(img, 0, 0)
            ctx.scale(.5, .5)
            console.log("in the drawer", img, ctx)
        }
        });
        */
        return () => document.getElementsByClassName("lightScroller")[0]?.removeEventListener("scroll", handSwipe)
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
                    <div key={`lb_${post.postId}`} className={`${style.lightboxContent} ${i == index ? "activeImg" : ""}`} style={{ "--i": i }}>
                        <div className={`${style.lightItem} ${showInfo ? style.lightItemFlip : ""}`}>
                            <div className={style.lightItemFront}>
                                <img className={style.lightboxImg} src={post.uri}></img>
                                {true ? <div className={style.postInfo}>
                                    <div className={style.postHeader}>
                                        <h2>{post.title}</h2>
                                        <p>{post.uploadDate?.split(" ")[0]}</p>
                                    </div>
                                </div> : null}

                                <div className={style.lightItemBack}>
                                    {true ? <div className={style.postInfo}>
                                        <div className={style.postHeader}>
                                            <h2>{post.title}</h2>
                                            <p>{post.uploadDate?.split(" ")[0]}</p>
                                        </div>
                                        <p>{post.description}</p>
                                        {post.collections?.length > 0 ? <div>
                                            <PillBox editable={false} group={post.collections}></PillBox>
                                        </div> : null}
                                        {post.tags?.length > 0 ? <div>
                                            <PillBox editable={false} group={post.tags}></PillBox>
                                        </div> : null}

                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>))}

            </div>
        </div> : null}
    </>)
}