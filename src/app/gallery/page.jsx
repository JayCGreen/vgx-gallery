
import GalleryGrid from "./galleryGrid";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import style from "./galleryGrid.module.css"
export default async function Gallery({ searchParams }) {
    const filters = (await searchParams);
    const { env } = await getCloudflareContext({ async: true });
    var collection = (await env.vgx_feed.prepare(
        "Select * FROM Collections WHERE collectionId = ?"
    ).bind(filters.c || "-1").run()).results;
    return (<div className={style.galleryContent}>
        <div className={style.galleryHeader} >
        <h2 style={{ color: "var(--offblack)" }}>{collection.length > 0 ? collection[0].collectionDisplay : "All"}</h2>
        <h4>Gallery</h4>
        </div>
        <hr style={{color: "var(--accent1)"}}/>
        <GalleryGrid searchParams={filters}></GalleryGrid>
    </div>)
}