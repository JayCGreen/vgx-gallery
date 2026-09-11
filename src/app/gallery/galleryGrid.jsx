/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import GridComponent from "./gridComponent";
import style from "./galleryGrid.module.css";

export default async function GalleryGrid({ searchParams }) {
    const filters = (await searchParams);
    const pageSize = 5;

    console.log("filters be ", filters)
    const { env } = await getCloudflareContext({ async: true });
    var postList = []
    if (filters.c) {
        postList = (await env.vgx_feed.prepare(
            "SELECT * FROM Posts INNER JOIN CollectionPosts ON Posts.postId = CollectionPosts.post WHERE CollectionPosts.collection = ?  ORDER BY julianday(uploadDate) DESC"
        ).bind(filters.c).run()).results;
    } else {
        postList= (await env.vgx_feed.prepare(
            "SELECT * FROM Posts ORDER BY julianday(uploadDate) DESC"
        ).run()).results;
    }

    const galleryItems = await Promise.all(postList.map(async (el) => {
        var mediaUrl = await env.vgx_r2?.get(el.r2Id);
        var contentType = mediaUrl.httpMetadata.contentType;
        var uri = await mediaUrl.arrayBuffer();
        var source = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`
        return { ...el, uri: source };
    }))
    return (
        <div className={style.galleryGrid}>
            <GridComponent items={galleryItems}></GridComponent>
        </div>)
}

