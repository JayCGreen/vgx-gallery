
import GalleryGrid from "./galleryGrid";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import style from "./galleryGrid.module.css"
import { Folder } from "@deemlol/next-icons";
export default async function Gallery({ searchParams }) {
    const filters = (await searchParams);
    const { env } = await getCloudflareContext({ async: true });
    var collection = (await env.vgx_feed.prepare(
        "Select * FROM Collections WHERE collectionId = ?"
    ).bind(filters.c || "-1").run()).results;
    return (<main className={style.galleryContent}>
        <header className={style.galleryHeader} >
            <h4 style={{ color: "var(--accent2)" }}> Gallery</h4>
            <h2 style={{ color: "var(--background)" }}><Folder/> {collection.length > 0 ? collection[0].collectionDisplay : "All"}</h2>
            
        </header>

        <GalleryGrid searchParams={filters}></GalleryGrid>
    </main>)
}