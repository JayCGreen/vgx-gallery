'use client'
import { useState, useEffect } from "react"
import style from "./lightbox.module.css"
import PillBox from "../pillbox"

export default function Lightbox({ items, index, setIndex }) {
    //const [lightboxIndex, setIndex] = useState(index);
    const [showInfo, setShowInfo] = useState(false)
    const post = items[index]
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
        window.addEventListener("touchmove", handSwipe)
        return () => window.removeEventListener("touchmove", handSwipe)
    }, [])

    return (<>
        {index != undefined ? <div className={style.lightbox}>
            <div className={style.topControls}>
                <button onClick={() => setShowInfo(!showInfo)}> Info</button>
                <button onClick={() => setIndex()}>Exit</button>
                
            </div>
            <div className={style.lightboxContent}>
                <img className={style.lightboxImg} src={items[index].uri}></img>
                {showInfo ? <div className={style.postInfo}>
                    <div className={style.postHeader}>
                        <h2>{post.title}</h2>
                        <p>{post.uploadDate?.split(" ")[0]}</p>
                    </div>
                    <p>{post.description}</p>
                    {post.collections.length > 0 ? <div>
                        <h5>Collections</h5>
                        <PillBox editable={false} group={post.collections}></PillBox>
                    </div> : null}
                </div> : null}
            </div>
            <div className={style.lightboxBody}>
                <button className={style.lightboxControls} onClick={() => setIndex((((index - 1) % len) + len) % len)}> Left</button>
                <button className={style.lightboxControls} onClick={() => setIndex((((index + 1) % len) + len) % len)}> Right</button>
            </div>
        </div> : null}
    </>)
}