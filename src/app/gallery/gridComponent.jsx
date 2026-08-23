'use client'
import Lightbox from "./lightbox";
import { useState } from "react"

export default function GridComponent({ items }) {
    const [gallIndex, setIndex] = useState();
    const len = items.length;

    return (
        <>
            {items.map((media, index) => {
                if (!media) return;
                return (

                    <button onClick={() => setIndex(index)} key={`media${media.mediaId}`} className="gridPost">
                        <img src={media.uri}></img>
                    </button>
                )
            })}
            {gallIndex != undefined ? <div className="lightbox">
                <button onClick={() => setIndex()}>Exit</button>
                
                <img className="lightboxImg" src={items[gallIndex].uri}></img>
                <div className="lightboxBody">
                    <button className="lightboxControls" onClick={() => setIndex((((gallIndex-1)%len)+len)%len)}> Left</button>
                    <button className="lightboxControls" onClick={() => setIndex((((gallIndex+1)%len)+len)%len)}> Right</button>
                </div>
            </div> : null}
        </>
    )
}