'use client'
import Lightbox from "./lightbox";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import style from "./galleryGrid.module.css";
import Image from 'next/image'

export default function GridComponent() {
    const searchParams = useSearchParams();
    const [gallIndex, setIndex] = useState();
    const [gallery, setGallery] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageCap, setPageCap] = useState(0);
    const [groupedGallery, setGroupedGallery] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const pageSize = 10;
    var groupByYear = {};
    useEffect(() => {
        async function fetchData() {
            var items = await grabPieces();
            console.log(items)
            //10 being the amount I pull at once
            if (items.length >= pageSize) {
                setPageCap(pageCap + 1)
            }
            var currVis = gallery.concat(items);

            setGallery(currVis)

            currVis.forEach((el) => {
                if (!el) {
                    return
                }
                //get the year,
                var year = new Date(el.createdDate).getFullYear();
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

        var gallerySection = document.getElementById("gallerySection")
        document.addEventListener("scrollend", handleScroll)

        //handleScroll()

        function handleScroll() {
            if ((pageIndex <= pageCap) && Math.abs(gallerySection.scrollHeight - gallerySection.clientHeight - gallerySection.scrollTop) <= (1)) {
                setPageIndex(pageIndex + 1);
                console.log("oi see me me at the end")
            }
            console.log("oi see me me")
        }
        return () => { document.removeEventListener("scrollend", handleScroll); }
    }, [pageIndex])
    console.log("pageinfo", pageIndex, pageCap)

    /*
    console.log("everything rerun?")
    var gallerySection = document.getElementById("gallerySection") || null
    if (gallerySection && Math.abs(gallerySection.scrollHeight - gallerySection.clientHeight - gallerySection.scrollTop) <= (0.5)) {
        setPageIndex(pageIndex + 1)
    }
        */
    //Semi works for the laoding, still gotaa deal for the infinite load signals. Likely would be  a just dealing a state that acts as a switch... uea that should od


    async function grabPieces() {
        var f = await fetch(`actions/posts?limit=10&offset=${pageIndex * 10}${searchParams.get("c") ? "&c=" + searchParams.get("c") : ""}`);
        var dataList = await f.json();
        return Promise.all(dataList.posts.map(async (el) => {
            if (el.r2Id) {
                var url = await fetch(`actions/media?id=${el.r2Id}`).then((res) => res.blob()).then((b) => URL.createObjectURL(b));

                return { ...el, source: url }
            }
        }))
    }

    return (
        <>

            {Object.entries(groupedGallery).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map((itemList) =>
            (<section key={`year${itemList[0]}`} style={{ width: "100%" }}>
                <h4>{itemList[0]}</h4>
                <div className={style.galleryGrid}>
                    {itemList[1].map((media, index) => {
                        if (!media) return;
                        return (
                            <button onClick={() => setIndex(gallery.findIndex((el) => el.postId == media.postId))} key={`media${media.postId}`} className={style.galleryItem}>
                                <Image className={style.galleryItem} src={media.source} width={300} height={300} alt={"image"}></Image>
                            </button>
                        )

                    })}
                </div>
            </section>))
            }
            <p style={{ textAlign: 'center', width: "100%" }}>{pageIndex <= pageCap ? "Loading..." : "-End of Gallery-"}</p>
            <Lightbox items={gallery} index={gallIndex} setIndex={setIndex}></Lightbox>
        </>
    )
}