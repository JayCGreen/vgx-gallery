
import GalleryGrid from "./galleryGrid";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import style from "./galleryGrid.module.css"

import GalleryFilter from "./filterComponent";
export default async function Gallery({ searchParams }) {
    const filters = (await searchParams);
    const { env } = await getCloudflareContext({ async: true });
    var collection = (await env.vgx_feed.prepare(
        "Select * FROM Collections"
    ).run()).results;
    console.log("see me", collection)
    return (<main className={style.galleryContent}>
        <header className={style.galleryHeader} >
          <GalleryFilter collection={collection}/>
        </header>

        <GalleryGrid searchParams={filters}></GalleryGrid>
    </main>)
}