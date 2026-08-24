/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import GridComponent from "./gridComponent";

export default async function GalleryGrid() {
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        "SELECT * FROM Post ORDER BY julianday(postDate) DESC"
    ).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media ORDER BY julianday(uploadDate) DESC"
    ).run()).results;

    const galleryItems = await Promise.all(mediaList.map(async (el) => {
        var mediaUrl = await env.vgx_r2?.get(el.r2Id);
        var contentType = mediaUrl.httpMetadata.contentType;
        var uri = await mediaUrl.arrayBuffer();
        var source = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`
        return {...el, uri: source};
    }))
    return (
        <div className="galleryGrid">
            <GridComponent items={galleryItems}></GridComponent>
        </div>)
}

