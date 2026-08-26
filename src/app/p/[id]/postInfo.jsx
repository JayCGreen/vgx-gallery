

import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function PostBlock({ postId }) {
    console.log("post is", postId)
    const { env } = await getCloudflareContext({ async: true });
    const post = (await env.vgx_feed.prepare(
        "SELECT * FROM Post WHERE postId = ?"
    ).bind(postId).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media WHERE post = ?"
    ).bind(postId).run()).results;

    var mediaUrl = await env.vgx_r2?.get(mediaList[0].r2Id);
    var contentType = mediaUrl.httpMetadata.contentType;
    var uri = await mediaUrl.arrayBuffer();
    console.log()
    return (<div className="postBlock">
        <div className="postContent">
            {uri ? <img src={`data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`}></img> : <div className="postContent">
                {post.desc}
            </div>}
        </div>
        <div className="postInfo">
            <div className="postHeader">
                <h2>{post[0].title}</h2>
                <p>{post[0].postDate.split(" ")[0]}</p>
            </div>
            <p>{post[0].desc}</p>
        </div>

    </div>)
}