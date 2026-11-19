import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const posts = (await getCloudflareContext().env.vgx_feed.prepare(
        filterPosts(searchParams.get("c"), searchParams.get("offset"), searchParams.get("limit"))
    ).run()).results;
    return Response.json({ posts: posts });

    function filterPosts(c, offset, limit) {
        var query = "SELECT * FROM Posts ";
        if (c) {
            query += `JOIN CollectionPosts ON CollectionPosts.post = Posts.postId WHERE CollectionPosts.collection=${c} `;
        }
        //something for the tags
        query += `ORDER BY julianday(Posts.createdDate) DESC`;
        if (limit && offset) {
            query += ` LIMIT ${limit} OFFSET ${offset}`
        }


        return query;
    }
}