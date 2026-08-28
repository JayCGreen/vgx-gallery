'use client'
import { useState, useEffect } from "react"
import style from "./lightbox.module.css"

export default function Lightbox({ items, index}) {
    const [lightboxIndex, setIndex] = useState(index);
    useEffect(()=>{
        setIndex(index)
    }, [index])
    const len = items?.length;

    return (<>
        {lightboxIndex != undefined ? <div className={style.lightbox}>
            <button onClick={() => setIndex()}>Exit</button>
            <img className={style.lightboxImg} src={items[lightboxIndex].uri}></img>
            <div className={style.lightboxBody}>
                <button className={style.lightboxControls} onClick={() => setIndex((((lightboxIndex - 1) % len) + len) % len)}> Left</button>
                <button className={style.lightboxControls} onClick={() => setIndex((((lightboxIndex + 1) % len) + len) % len)}> Right</button>
            </div>
        </div> : null}
    </>)
}