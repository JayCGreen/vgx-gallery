'use client'
import Lightbox from "./lightbox";
import { useState } from "react"
import style from "./galleryGrid.module.css";

export default function GridComponent({ items }) {
    const [gallIndex, setIndex] = useState();

    return (
        <>
            {items.map((media, index) => {
                if (!media) return;
                return (
                    <button onClick={() => setIndex(index)} key={`media${media.mediaId}`} className={style.galleryItem}>
                        <img src={media.uri}></img>
                    </button>
                )
            })}
            <Lightbox items={items} index={gallIndex}></Lightbox>
        </>
    )
}