
import { getCloudflareContext } from "@opennextjs/cloudflare";
import CollectionGrid from "../collectionGrid";

export default async function FeaturedCollections() {
    //Get 3 Collections, will sort out how we get them another time
    const { env } = await getCloudflareContext({ async: true });
    const collections = (await env.vgx_feed.prepare(
        "SELECT * FROM Collections"
    ).run()).results;
    console.log("colllection be",  collections)
    return (
    <>
    <h3>Collections</h3>
    <CollectionGrid items={collections}></CollectionGrid>
    </>)
}