import { getCloudflareContext } from "@opennextjs/cloudflare";
import PostGrid from "./postGrid";

export default async function Recents() {
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        "SELECT * FROM Posts ORDER BY julianday(uploadDate) DESC LIMIT 4"
    ).run()).results;

    //should probably extract this little method too, or have it hooked up to the sql statement
    var itemList = await Promise.all(postList.map(async (post) => {
        var imgSource;
        if (post.r2Id) {

            var mediaUrl = await env.vgx_r2?.get(post.r2Id);
            var contentType = mediaUrl.httpMetadata.contentType;
            var uri = await mediaUrl.arrayBuffer();
            imgSource = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`;
        }
        return {...post, source: imgSource}
    }))

    return (
        <div className="recentPosts">
            <h3>Recent Updates</h3>
            <PostGrid items={itemList}></PostGrid>
        </div>)
}
