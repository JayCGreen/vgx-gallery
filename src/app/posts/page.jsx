import { getCloudflareContext } from "@opennextjs/cloudflare";
import PostGrid from "../postGrid";
import HeroBanner from "../heroBanner";


export default async function PostCat({ searchParams }) {
    const filters = (await searchParams);
    const pageSize = 4;
    console.log("filters be ", filters)
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        filterPosts(filters)
    ).run()).results;
    console.log("items be", postList)
    const count = await getTotal(filters)

    const collectionDisplay = filters.c ? (await env.vgx_feed.prepare(
        "SELECT collectionDisplay FROM Collections WHERE collectionId=?"
    ).bind(filters.c).run()).results : [];
    //should probably extract this little method too, or have it hooked up to the sql statement
    var itemList = await Promise.all(postList.map(async (post) => {
        //will need to handle unique post at a later day
        var imgSource;
        if (post.r2Id) {
            var mediaUrl = await env.vgx_r2?.get(post.r2Id);
            var contentType = mediaUrl.httpMetadata.contentType;
            var uri = await mediaUrl.arrayBuffer();
            imgSource = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`;
        }
        return { ...post, source: imgSource }
    }))


    return (
        <div className="postPage">
            <HeroBanner type={filters.c ? "collection" : "posts"} id={filters.c ? filters.c : "posts"}>
            </HeroBanner>
            <h3>
                {collectionDisplay.length > 0 ? collectionDisplay[0].collectionDisplay : null} Posts
            </h3>
            <PostGrid items={itemList} pageSize={pageSize} showMore={true} total={count}></PostGrid>
        </div>
    )

    async function getTotal(filter) {
        var query = "SELECT count(*) as total FROM Post ";
        if (filter?.c) {
            query += `JOIN CollectionPosts ON CollectionPosts.post = Post.postId WHERE CollectionPosts.collection=${filter.c} `;
        }
        //something for the tags
        query += `ORDER BY julianday(Post.postDate) DESC`

        const count = (await env.vgx_feed.prepare(
            query
        ).run()).results;
        console.log("count be ",count)
        return count[0].total;
    }

    function filterPosts(filter) {
        var query = "SELECT * FROM Post LEFT JOIN Media on Post.postId = Media.post ";
        if (filter?.c) {
            query += `JOIN CollectionPosts ON CollectionPosts.post = Post.postId WHERE CollectionPosts.collection=${filter.c} `;
        }
        query
        //something for the tags
        query += `ORDER BY julianday(Post.postDate) DESC LIMIT ${pageSize}`
        return query;
    }
}