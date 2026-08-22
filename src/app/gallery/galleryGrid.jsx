/**
 * 
 * @returns A grid of the items listed in the gallery database
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function GalleryGrid() {
    const { env } = await getCloudflareContext({ async: true });
    const postList = (await env.vgx_feed.prepare(
        "SELECT * FROM Post"
    ).run()).results;
    const mediaList = (await env.vgx_feed.prepare(
        "SELECT * FROM Media"
    ).run()).results;

    return (<div className="galleryGrid">
        {postList.map(async (post) => {
            var media = mediaList.filter((el)=>{
                return el.post == post.postId
            })
            //Get the media Url
            if(media)
            {
                var mediaUrl = await env.vgx_r2?.get(media.r2Id);
                console.log(mediaUrl);
            }
            return (
                <div key={`post${post.postId}`} className="gridPost">
                    <div className="postHeader">
                        <h4>{post.title}</h4>
                    </div>
                    <div className="postContent">
                        {post.desc}
                    </div>
                    
                </div>
            )
        })}
    </div>)
}