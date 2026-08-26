'use client'
import Lightbox from "./lightbox";
import { useState } from "react"


export default function GridComponent({ items }) {
    const [gallIndex, setIndex] = useState();

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
            <Lightbox items={items} index={gallIndex}></Lightbox>
        </>
    )
}