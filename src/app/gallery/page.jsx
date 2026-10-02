
import GalleryGrid from "./galleryGrid";
import { getCloudflareContext } from "@opennextjs/cloudflare";
export default async function Gallery({ searchParams }) {
    const filters = (await searchParams);
    const { env } = await getCloudflareContext({ async: true });
    var collection = (await env.vgx_feed.prepare(
        "Select * FROM Collections WHERE collectionId = ?"
    ).bind(filters.c || "-1").run()).results;
    return (<div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ textAlign: "center", color: "var(--offblack)" }}>{`Gallery: ${collection.length > 0 ? collection[0].collectionDisplay : "All"}`}</h3>
        <hr style={{width: "77%", color: "var(--accent1)"}}/>
        <GalleryGrid searchParams={filters}></GalleryGrid>
    </div>)
}