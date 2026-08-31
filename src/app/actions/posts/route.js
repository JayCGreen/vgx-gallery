import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const posts = (await getCloudflareContext().env.vgx_feed.prepare(
        filterPosts(searchParams.get("c"), searchParams.get("offset"), searchParams.get("limit"))
    ).run()).results;
    var itemList = await Promise.all(posts.map(async (post) => {
        //will need to handle unique post at a later day
        var imgSource;
        if (post.r2Id) {
            var mediaUrl = await getCloudflareContext().env.vgx_r2?.get(post.r2Id);
            var contentType = mediaUrl.httpMetadata.contentType;
            var uri = await mediaUrl.arrayBuffer();
            imgSource = `data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`;
        }
        return { ...post, source: imgSource }
    }))
    return Response.json({ posts: itemList });

    function filterPosts(c, offset, limit) {
        var query = "SELECT * FROM Post LEFT JOIN Media on Post.postId = Media.post ";
        if (c) {
            query += `JOIN CollectionPosts ON CollectionPosts.post = Post.postId WHERE CollectionPosts.collection=${c} `;
        }
        //something for the tags
        query += `ORDER BY julianday(Post.postDate) DESC`;
        if (limit && offset) {
            query += ` LIMIT ${limit} OFFSET ${offset}`
        }


        return query;
    }
}