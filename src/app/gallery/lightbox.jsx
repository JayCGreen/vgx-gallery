'use client'
import { useState, useEffect } from "react"

export default function Lightbox({ items, index}) {
    const [lightboxIndex, setIndex] = useState(index);
    useEffect(()=>{
        setIndex(index)
    }, [index])
    const len = items?.length;

    return (<>
        {lightboxIndex != undefined ? <div className="lightbox">
            <button onClick={() => setIndex()}>Exit</button>
            <img className="lightboxImg" src={items[lightboxIndex].uri}></img>
            <div className="lightboxBody">
                <button className="lightboxControls" onClick={() => setIndex((((lightboxIndex - 1) % len) + len) % len)}> Left</button>
                <button className="lightboxControls" onClick={() => setIndex((((lightboxIndex + 1) % len) + len) % len)}> Right</button>
            </div>
        </div> : null}
    </>)
}