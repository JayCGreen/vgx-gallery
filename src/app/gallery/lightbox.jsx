'use client'
import { useState, useEffect } from "react"
import style from "./lightbox.module.css"

export default function Lightbox({ items, index, setIndex }) {
    //const [lightboxIndex, setIndex] = useState(index);
    /*
    useEffect(()=>{
        setIndex(index)
    }, [index])
    */
    const len = items?.length;
    console.log(items[index])
    useEffect(() => {
        function handSwipe(e){
            console.log("hit with the swipe", e)
        }
        console.log("hey am I seen")
        window.addEventListener("touchmove", handSwipe)
        return () => window.removeEventListener("touchmove", handSwipe)
    }, [])

    return (<>
        {index != undefined ? <div className={style.lightbox}>
            <button onClick={() => setIndex()}>Exit</button>
            <button> Info</button>
            <img className={style.lightboxImg} src={items[index].uri}></img>
            <div className={style.lightboxBody}>
                <button className={style.lightboxControls} onClick={() => setIndex((((index - 1) % len) + len) % len)}> Left</button>
                <button className={style.lightboxControls} onClick={() => setIndex((((index + 1) % len) + len) % len)}> Right</button>
            </div>
        </div> : null}
    </>)
}