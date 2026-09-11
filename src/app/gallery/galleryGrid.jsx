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
    var collectionList = (await env.vgx_feed.prepare(
        "Select * from CollectionPosts JOIN Collections ON Collections.collectionId = CollectionPosts.collection"
    ).run()).results;
    console.log("list is ", postList)
    //grab the appropriate Collection info
    
    const galleryItems = await Promise.all(postList.map(async (el) => {
        var mediaUrl = await env.vgx_r2?.get(el.r2Id);
        var contentType = mediaUrl.httpMetadata.contentType;
        var uri = await mediaUrl.arrayBuffer();
        var source = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`
        return { ...el, uri: source };
    }))

    transform();
    console.log("new items be ", galleryItems)
    return (
        <div className={style.galleryGrid}>
            <GridComponent items={galleryItems}></GridComponent>
        </div>)

    function filterPosts(filter) {
        var query = "SELECT * FROM Posts ";
        if (filter.c || filter.tag) {
            query += " LEFT JOIN CollectionPosts ON Posts.postId = CollectionPosts.post WHERE "
            if (filter?.c) {
                query += `CollectionPosts.collection=${filter.c} `;
            }
        }
        query
        //something for the tags
        query += ` ORDER BY julianday(Posts.uploadDate) DESC`
        return query;
    }

    function transform() {
        var collectionMap = new Map();
        var tagMap = new Map();
        collectionList.forEach((el) => {
                if (collectionMap.has(el.post)) {
                    collectionMap.set(el.post, collectionMap.get(el.postId).concat(el))
                } else {
                    collectionMap.set(el.post, [el])
                }
        })
        galleryItems.forEach((a) => {
            if(collectionMap.has(a.postId)){
                a.collections = collectionMap.get(a.postId)
            }
            else{
                a.collections = [];
            }
        })

    }
}

