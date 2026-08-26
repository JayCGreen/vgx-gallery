import { getCloudflareContext } from "@opennextjs/cloudflare";
import PostGrid from "../postGrid";

export default async function PostCat() {
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        "SELECT * FROM Post ORDER BY julianday(postDate) DESC"
    ).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media"
    ).run()).results;

    //should probably extract this little method too, or have it hooked up to the sql statement
    var itemList = await Promise.all(postList.map(async (post) => {
        var media = mediaList.filter((el) => {
            return el.post == post.postId
        })
        //Get the media Url
        var imgSource;
        if (media.length > 0) {

            var mediaUrl = await env.vgx_r2?.get(media[0].r2Id);
            var contentType = mediaUrl.httpMetadata.contentType;
            var uri = await mediaUrl.arrayBuffer();
            imgSource = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`;
        }

        return { ...post, source: imgSource }
    }))

    return (
        <div className="postPage">
            <h3>Posts</h3>
            <PostGrid items={itemList}></PostGrid>
        </div>
    )
}