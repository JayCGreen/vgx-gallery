/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";
import GridComponent from "./gridComponent";
import style from "./galleryGrid.module.css";

export default async function GalleryGrid({ searchParams }) {
    return (
        <section id="gallerySection" className={style.gallery}>
            <GridComponent></GridComponent>
        </section>)

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
                    collectionMap.set(el.post, collectionMap.get(el.post).concat([el]))
                } else {
                    collectionMap.set(el.post, [el])
                }
        })

        tagList.forEach((el)=>{
            if(tagMap.has(el.post)){
                tagMap.set(el.post, tagMap.get(el.post).concat(el))
            }
            else{
                tagMap.set(el.post, [el])
            }
        })

        galleryItems.forEach((a) => {
            if(collectionMap.has(a.postId)){
                a.collections = collectionMap.get(a.postId)
            }
            else{
                a.collections = [];
            }
            if(tagMap.has(a.postId)){
                a.tags = tagMap.get(a.postId)
            }
            else{
                a.tags = [];
            }
        })

    }
}

