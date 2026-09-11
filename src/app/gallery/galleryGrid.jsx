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
    var postList = (await env.vgx_feed.prepare(
        filterPosts(filters)
    ).run()).results;
    console.log("list is ", postList)
    //grab the appropriate Collection info
    postList.forEach((el)=>{

    })

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

    function filterPosts(filter) {
        var query = "SELECT * FROM Posts LEFT JOIN CollectionPosts ON Posts.postId = CollectionPosts.post LEFT JOIN Collections ON Collections.collectionId = CollectionPosts.collection";
        if (filter.c || filter.tag) {
            query += " WHERE "
            if (filter?.c) {
                query += `CollectionPosts.collection=${filter.c} `;
            }
        }
        query
        //something for the tags
        query += ` ORDER BY julianday(Posts.uploadDate) DESC`
        return query;
    }
}

