
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
        var imgSource;
        const mediaList = (await env.vgx_feed.prepare(
            "SELECT * FROM CollectionPosts JOIN Posts ON CollectionPosts.post = Posts.postId WHERE CollectionPosts.collection = ? "
        ).bind(el.collectionId).run()).results;
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
    <h3>Albums</h3>
    <CollectionGrid items={itemList}></CollectionGrid>
    </>)
}