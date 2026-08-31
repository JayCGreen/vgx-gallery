
import { getCloudflareContext } from "@opennextjs/cloudflare";
import CollectionGrid from "./collectionGrid"

export default async function FeaturedCollections() {
    //Get 3 Collections, will sort out how we get them another time
    //Would Likely want to replace this with like a join down the line
    const { env } = await getCloudflareContext({ async: true });
    const collections = (await env.vgx_feed.prepare(
        "SELECT * FROM Collections LEFT JOIN Banners ON Collections.collectionId = Banners.collection LIMIT 3 "
    ).run()).results;
    console.log("colllection be", collections);

    var itemList = await Promise.all(collections.map(async (el) => {
        if(el.media = null){
            return {... el}
        }
        var imgSource
        const mediaList = (await env.vgx_feed.prepare(
            "SELECT * FROM Media WHERE mediaId = ?"
        ).bind(el.media).run()).results;
        if (mediaList.length > 0) {
            var mediaUrl = await env.vgx_r2?.get(mediaList[0].r2Id);
            var contentType = mediaUrl?.httpMetadata.contentType;
            var uri = await mediaUrl.arrayBuffer();
            imgSource = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`;
        }
        return {...el, source: imgSource}
    }))

    return (
        <>
            <h3>Collections</h3>
            <CollectionGrid items={itemList}></CollectionGrid>

        </>);
}