
import { getCloudflareContext } from "@opennextjs/cloudflare";
import CollectionGrid from "../collectionGrid";

export default async function FeaturedCollections() {
    //Get 3 Collections, will sort out how we get them another time
        const { env } = await getCloudflareContext({ async: true });
    const collections = (await env.vgx_feed.prepare(
        "SELECT * FROM Collections"
    ).run()).results;
    console.log("colllection be", collections);

    var itemList = await Promise.all(collections.map(async (el) => {
        if(el.media = null){
            return {... el}
        }
        var imgSource
        
        return {...el, source: imgSource}
    }))

    return (
    <>
    <h3>Collections</h3>
    <CollectionGrid items={itemList}></CollectionGrid>
    </>)
}