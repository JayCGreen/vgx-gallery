'use client'
import Lightbox from "./lightbox";
import { useState, useEffect } from "react";
import {useSearchParams} from 'next/navigation';
import style from "./galleryGrid.module.css";

export default function GridComponent() {
    const searchParams = useSearchParams();
    const [gallIndex, setIndex] = useState();
    const [gallery, setGallery] = useState([]);
    const [groupedGallery, setGroupedGallery] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    var groupByYear = {};
    useEffect(() => {
        async function fetchData() {
            var items = await grabPieces();
            var currVis = gallery.concat(items)
            setGallery(currVis)

            currVis.forEach((el) => {
                if (!el) {
                    return
                }
                //get the year,
                var year = new Date(el.uploadDate).getFullYear();
                if (groupByYear[year]) {
                    groupByYear[year].push(el)
                }
                else {
                    groupByYear[year] = [el];
                }
            })
        }
        fetchData().then(() => {
            setGroupedGallery(groupByYear)
        })
    }, [])
    //Semi works for the laoding, still gotaa deal for the infinite load signals. Likely would be  a just dealing a state that acts as a switch... uea that should od


    async function grabPieces() {
        var f = await fetch(`actions/posts?offset=0${searchParams.get("c") ? "&c="+ searchParams.get("c"): ""}`);
        var dataList = await f.json();
        console.log("this here", dataList);
        return Promise.all(dataList.posts.map(async (el) => {
            if (el.r2Id) {
                var url = await fetch(`actions/media?id=${el.r2Id}`).then((res) => res.blob()).then((b) => URL.createObjectURL(b));

                return { ...el, source: url }
            }

        }))
    }

    return (
        <>
            {gallery.length > 0  ?
                Object.entries(groupedGallery).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map((itemList) =>
                (<section key={`year${itemList[0]}`} style={{ width: "100%" }}>
                    <h4>{itemList[0]}</h4>
                    <div className={style.galleryGrid}>
                        {itemList[1].map((media, index) => {
                            if (!media) return;
                            return (
                                <button onClick={() => setIndex(index)} key={`media${media.postId}`} className={style.galleryItem}>
                                    <img className={style.galleryItem} src={media.source}></img>
                                </button>
                            )

                        })}
                    </div>
                </section>)):
                <p>Loading...</p>
            }
            <Lightbox items={gallery} index={gallIndex} setIndex={setIndex}></Lightbox>
        </>
    )
}