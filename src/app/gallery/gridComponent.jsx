'use client'
import Lightbox from "./lightbox";
import { useState } from "react"
import style from "./galleryGrid.module.css";

export default function GridComponent({ items }) {
    const [gallIndex, setIndex] = useState();
    var groupByYear = {};
    items.forEach((el) => {
        //get the year,
        var year = new Date(el.uploadDate).getFullYear();
        if (groupByYear[year]) {
            groupByYear[year].push(el)
        }
        else {
            groupByYear[year] = [el];
        }
    })
    //console.log(groupByYear)

    return (
        <>
            {Object.entries(groupByYear).sort((a, b) => parseInt(b[0])-parseInt(a[0])).map((itemList) =>
            (<section style={{width: "100%"}}>
                <h4>{itemList[0]}</h4>
                <div className={style.galleryGrid}>
                    {itemList[1].map((media, index) => {
                        if (!media) return;
                        return (
                            <button onClick={() => setIndex(index)} key={`media${media.postId}`} className={style.galleryItem}>
                                <img className={style.galleryItem} src={media.uri}></img>
                            </button>
                        )

                    })}
                </div>
            </section>))
            }
            <Lightbox items={items} index={gallIndex} setIndex={setIndex}></Lightbox>
        </>
    )
}