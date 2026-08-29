import { getCloudflareContext } from "@opennextjs/cloudflare";
import PostGrid from "../postGrid";


export default async function PostCat({ searchParams }) {
    const filters = (await searchParams);
    console.log("filters be ", filters)
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        filterPosts(filters)
    ).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media"
    ).run()).results;

    const collectionDisplay = filters.c ? (await env.vgx_feed.prepare(
        "SELECT collectionDisplay FROM Collections WHERE collectionId=?"
    ).bind(filters.c).run()).results : [];
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
            <h3>
                {collectionDisplay.length > 0 ? collectionDisplay[0].collectionDisplay : null} Posts</h3>
            <PostGrid items={itemList}></PostGrid>
        </div>
    )

    function filterPosts(filter) {
        var query = "SELECT * FROM Post ";
        if (filter?.c) {
            query += `JOIN CollectionPosts ON CollectionPosts.post = Post.postId WHERE CollectionPosts.collection=${filter.c} `;
        }
        //something for the tags
        query += `ORDER BY julianday(Post.postDate) DESC`
        return query;
    }
}