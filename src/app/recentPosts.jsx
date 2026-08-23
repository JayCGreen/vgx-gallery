import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function Recents() {
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        "SELECT * FROM Post ORDER BY julianday(postDate) DESC LIMIT 3"
    ).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media"
    ).run()).results;

    return (
        <div>
            <h3>Recent Posts</h3>
            <div className="recentGrid">
                {postList.map(async (post) => {
                    var media = mediaList.filter((el) => {
                        return el.post == post.postId
                    })
                    //Get the media Url
                    var uri;
                    if (media.length > 0) {

                        var mediaUrl = await env.vgx_r2?.get(media[0].r2Id);
                        var contentType = mediaUrl.httpMetadata.contentType;
                        uri = await mediaUrl.arrayBuffer();


                        //console.log("media url be", uri, post.postId, mediaUrl);
                    }
                    return (
                        <div key={`post${post.postId}`} className="gridPost">
                            
                            {uri ? <img src={`data:${contentType};base64, ${Buffer.from(uri).toString('base64')}`}></img> : <div className="postContent">
                                {post.desc}
                            </div>}
                            <div className="postHeader">
                                <h4>{post.title}</h4> <p>{post.postDate.split(" ")[0]}</p>
                            </div>
                            <hr  style={{width: "100%"}}/>
                            <div className="postDesc">
                                <h5>{post.desc}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>)
}
