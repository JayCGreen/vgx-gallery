import { getCloudflareContext } from "@opennextjs/cloudflare";
import style from "./post.module.css"

export default async function PostBlock({ postId }) {
    console.log("post is", postId)
    const { env } = await getCloudflareContext({ async: true });
    const post = (await env.vgx_feed.prepare(
        "SELECT * FROM Post WHERE postId = ?"
    ).bind(postId).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media WHERE post = ?"
    ).bind(postId).run()).results;
    const tagList = (await env.vgx_feed.prepare(
        "SELECT * FROM Tags JOIN PostTags ON Tags.tagId=PostTags.tag WHERE PostTags.post = ?"
    ).bind(postId).run()).results;
    var uri;
    console.log("hey to", mediaList==false)
    if (mediaList.length > 0) {
        var mediaUrl = await env.vgx_r2?.get(mediaList[0].r2Id);
        var contentType = mediaUrl?.httpMetadata.contentType;
        var uri = await mediaUrl.arrayBuffer();
    }
    return (<div className={style.postBlock}>
       {uri ? <div className={style.postContent}>
             <img src={`data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`}></img> 
        </div>: null}
        <div className={style.postInfo}>
            <div className={style.postHeader}>
                <h2>{post[0].title}</h2>
                <p>{post[0].postDate.split(" ")[0]}</p>
            </div>
            <p>{post[0].desc}</p>
            <div className={style.postTagsList}>
                {tagList.map((tag) => (
                    <button className={style.postTagLabel} key={`postTag${tag.tagId}`}>
                        {tag.tagDisplay}
                    </button>
                ))}
            </div>
        </div>

    </div>)
}